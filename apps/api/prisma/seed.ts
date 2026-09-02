import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.service.deleteMany();
  await prisma.project.deleteMany();

  await prisma.service.createMany({
    data: [
      {
        title: 'Desarrollo web',
        description:
          'Landing pages y sitios modernos con React, Next.js y buen SEO.',
        icon: 'web',
        sortOrder: 1,
      },
      {
        title: 'Aplicaciones fullstack',
        description:
          'APIs con NestJS, PostgreSQL y frontends listos para producción.',
        icon: 'fullstack',
        sortOrder: 2,
      },
      {
        title: 'Análisis de datos',
        description:
          'Exploración de datos, reportes y apoyo a decisiones de negocio.',
        icon: 'data',
        sortOrder: 3,
      },
      {
        title: 'Desarrollo de software a medida',
        description:
          'Construcción de aplicaciones web y fullstack: frontends con Next.js, APIs REST con NestJS y persistencia en PostgreSQL. Código limpio, mantenible y con pruebas, aplicando capas claras y buenas prácticas de arquitectura.',
        icon: 'custom',
        sortOrder: 4,
      },
      {
        title: 'Metodología de trabajo',
        description:
          'Un enfoque estructurado y transparente para garantizar resultados predecibles y de alta calidad.',
        icon: 'methodology',
        sortOrder: 5,
      },
    ],
  });

  await prisma.project.createMany({
    data: [
      {
        title: 'Portfolio Platform',
        summary:
          'Marca personal fullstack que evoluciona a consultoría de software.',
        description:
          'Monorepo con Next.js (MVVM), NestJS (MVC modular) y PostgreSQL.',
        techStack: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript'],
        featured: true,
        sortOrder: 1,
        liveUrl: 'http://localhost:3000',
      },
      {
        title: 'API de leads',
        summary: 'Captura de contacto con validación y rate limiting.',
        techStack: ['NestJS', 'Prisma', 'PostgreSQL'],
        featured: false,
        sortOrder: 2,
      },
    ],
  });

  console.log('Seed OK: services + projects');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
