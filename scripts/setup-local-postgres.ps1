# Ejecutar como Administrador
# Restaura pg_hba.conf, crea usuario/DB portfolio y deja auth segura.

$ErrorActionPreference = "Stop"
$pgBin = "C:\Program Files\PostgreSQL\17\bin"
$pgData = "C:\Program Files\PostgreSQL\17\data"
$hba = Join-Path $pgData "pg_hba.conf"
$backup = Join-Path $pgData "pg_hba.conf.bak-portfolio"
$log = Join-Path $env:TEMP "portfolio-postgres-setup.log"
$sqlFile = Join-Path $env:TEMP "portfolio-setup.sql"

function Write-Log($msg) {
  $line = "$(Get-Date -Format o) $msg"
  Add-Content -Path $log -Value $line
  Write-Host $msg
}

function Set-HbaMethod([string]$method) {
  $lines = Get-Content $hba
  $updated = foreach ($line in $lines) {
    if ($line -match '^\s*host\s+all\s+all\s+127\.0\.0\.1/32') {
      "host    all             all             127.0.0.1/32            $method"
    }
    elseif ($line -match '^\s*host\s+all\s+all\s+::1/128') {
      "host    all             all             ::1/128                 $method"
    }
    else {
      $line
    }
  }
  [System.IO.File]::WriteAllLines($hba, $updated)
}

try {
  Write-Log "Starting PostgreSQL local setup..."

  if (-not (Test-Path $backup)) {
    throw "Backup not found: $backup"
  }

  Copy-Item $backup $hba -Force
  Write-Log "Restored pg_hba.conf from backup"

  Set-HbaMethod "trust"
  Restart-Service postgresql-x64-17 -Force
  Start-Sleep -Seconds 4
  Write-Log "Service restarted with temporary trust"

  $env:Path = "$pgBin;" + $env:Path

  # SQL en archivo (here-string simple) para que PowerShell no interprete $
  @'
ALTER USER postgres WITH PASSWORD 'postgres';

DO $portfolio$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'portfolio') THEN
    CREATE ROLE portfolio LOGIN PASSWORD 'portfolio';
  END IF;
END
$portfolio$;
'@ | Set-Content -Path $sqlFile -Encoding Ascii

  & psql -U postgres -h 127.0.0.1 -d postgres -v ON_ERROR_STOP=1 -f $sqlFile
  if ($LASTEXITCODE -ne 0) { throw "Failed creating role" }

  # Evitar .Trim() sobre null cuando la DB aún no existe
  $prevEap = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  $dbExistsRaw = & psql -U postgres -h 127.0.0.1 -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname = 'portfolio'" 2>&1
  $ErrorActionPreference = $prevEap
  $dbExists = ("$dbExistsRaw").Trim()
  Write-Log "DB check result: [$dbExists]"

  if ($dbExists -ne "1") {
    $ErrorActionPreference = "Continue"
    & psql -U postgres -h 127.0.0.1 -d postgres -v ON_ERROR_STOP=1 -c "CREATE DATABASE portfolio OWNER portfolio;"
    $createCode = $LASTEXITCODE
    $ErrorActionPreference = $prevEap
    if ($createCode -ne 0) { throw "Failed creating database" }
    Write-Log "Database portfolio created"
  }
  else {
    Write-Log "Database portfolio already exists"
  }

  $ErrorActionPreference = "Continue"
  & psql -U postgres -h 127.0.0.1 -d postgres -v ON_ERROR_STOP=1 -c "GRANT ALL PRIVILEGES ON DATABASE portfolio TO portfolio;"
  $grantCode = $LASTEXITCODE
  $ErrorActionPreference = $prevEap
  if ($grantCode -ne 0) { throw "Failed granting privileges" }
  Write-Log "User/database portfolio ready"

  Set-HbaMethod "scram-sha-256"
  Restart-Service postgresql-x64-17 -Force
  Start-Sleep -Seconds 4
  Write-Log "Restored scram-sha-256 auth"

  $env:PGPASSWORD = "portfolio"
  & psql -U portfolio -h 127.0.0.1 -d portfolio -c "SELECT current_user, current_database();"
  if ($LASTEXITCODE -ne 0) { throw "Final connection test failed" }

  Write-Log "SETUP_OK"
  Write-Host ""
  Write-Host "Listo. Credenciales del proyecto:"
  Write-Host "  Host: localhost"
  Write-Host "  Port: 5432"
  Write-Host "  DB:   portfolio"
  Write-Host "  User: portfolio"
  Write-Host "  Pass: portfolio"
  Write-Host "  Superuser local: postgres / postgres"
  Write-Host "Log: $log"
}
catch {
  Write-Log "ERROR: $($_.Exception.Message)"
  throw
}
finally {
  Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue
}
