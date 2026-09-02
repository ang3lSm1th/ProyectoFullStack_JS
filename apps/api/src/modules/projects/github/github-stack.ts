import type { GitHubRepoJson } from './github-repo.types';

const SKIP_LANGUAGES = new Set([
  'Procfile',
  'Makefile',
  'Mako',
  'Batchfile',
  'Nushell',
  'Shell',
  'PowerShell',
]);

/** Frameworks that GitHub language bytes do not report. */
const FRAMEWORKS_BY_FULL_NAME: Record<string, string[]> = {
  'ang3lSm1th/ProyectoFullStack_JS': [
    'Next.js',
    'NestJS',
    'Prisma',
    'PostgreSQL',
  ],
  'ang3lSm1th/CRM': [
    'Flask',
    'MySQL',
    'Gunicorn',
    'Celery',
    'Redis',
    'Flask-SocketIO',
  ],
  'ang3lSm1th/Proyecto-react': [
    'React',
    'Vite',
    'Tailwind CSS',
    'FastAPI',
    'PostgreSQL',
    'SQLAlchemy',
    'Flutter',
  ],
  'ang3lSm1th/drfsimpletest': ['Django', 'Django REST Framework'],
};

function languagesByBytes(repo: GitHubRepoJson): string[] {
  const bytesByName = repo.languages;
  if (!bytesByName) {
    return repo.language ? [repo.language] : [];
  }

  return Object.entries(bytesByName)
    .filter(([name, bytes]) => bytes > 0 && !SKIP_LANGUAGES.has(name))
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name);
}

export function buildTechStack(repo: GitHubRepoJson): string[] {
  const frameworks = FRAMEWORKS_BY_FULL_NAME[repo.full_name] ?? [];
  const languages = languagesByBytes(repo);
  const topics = repo.topics ?? [];

  return [...new Set([...frameworks, ...languages, ...topics])];
}
