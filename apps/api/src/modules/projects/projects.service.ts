import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  findPublic() {
    return this.prisma.project.findMany({
      orderBy: [{ featured: 'desc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        title: true,
        summary: true,
        techStack: true,
        imageUrl: true,
        repoUrl: true,
        liveUrl: true,
        featured: true,
      },
    });
  }
}
