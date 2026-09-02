---
name: backend-secrets-and-pii
description: Protect secrets, credentials, and PII in NestJS/PostgreSQL APIs. Use when building auth, hashing passwords, encrypting sensitive fields, writing DTOs/responses, logging, env config, or reviewing backend code so secrets and private data are never exposed.
---

# Backend — secretos, cifrado y PII

Aplica siempre que toques `apps/api`, auth, leads/contacto, users, env o logs.

## Reglas no negociables

1. **Nunca** devolver en JSON: `password`, `passwordHash`, tokens crudos, refresh secrets, API keys, connection strings.
2. **Nunca** loguear cuerpos con contraseñas, JWT, cookies, ni PII completa sin necesidad.
3. Secretos solo en variables de entorno (`.env` no se commitea). Usar `.env.example` con placeholders.
4. Contraseñas: hash con **bcrypt** o **argon2** (nunca AES/MD5/SHA para passwords).
5. Datos sensibles en DB (si aplica): cifrar en reposo con clave desde env; no hardcodear keys.
6. Responses: DTO/serializer explícito (whitelist). Nada de `return user` crudo desde Prisma.
7. Errores al cliente: mensajes genéricos; detalle solo en logs servidor.
8. Validar y sanitizar inputs (DTO + ValidationPipe). Rate limit en contacto/login.

## Checklist rápido

- [ ] ¿El endpoint filtra campos sensibles?
- [ ] ¿Hay secretos en código, commits o responses?
- [ ] ¿Passwords hasheadas (no cifradas reversibles)?
- [ ] ¿Logs sin tokens/PII?
- [ ] ¿CORS, helmet/headers y rate limit en rutas públicas?

## Ejemplo Nest

```typescript
// ❌ BAD
return this.prisma.user.findUnique({ where: { id } });

// ✅ GOOD
const user = await this.prisma.user.findUnique({ where: { id } });
return { id: user.id, email: user.email, name: user.name };
```
