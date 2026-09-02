import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { GitHubReposClient } from './github/github-repos.client';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, GitHubReposClient],
})
export class ProjectsModule {}
