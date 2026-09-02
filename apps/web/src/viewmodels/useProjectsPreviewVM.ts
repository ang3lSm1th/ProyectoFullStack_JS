'use client';

import { useCallback, useState } from 'react';
import type { ProjectDto } from '@/models/types';
import { PROJECTS_PREVIEW_COUNT } from '@/shared/constants';

export function useProjectsPreviewVM(projects: ProjectDto[]) {
  const [expanded, setExpanded] = useState(false);
  const canExpand = projects.length > PROJECTS_PREVIEW_COUNT;
  const visibleProjects = expanded
    ? projects
    : projects.slice(0, PROJECTS_PREVIEW_COUNT);
  const hiddenCount = Math.max(0, projects.length - PROJECTS_PREVIEW_COUNT);

  const showMore = useCallback(() => setExpanded(true), []);
  const showLess = useCallback(() => setExpanded(false), []);

  return {
    visibleProjects,
    canExpand,
    expanded,
    hiddenCount,
    showMore,
    showLess,
  };
}
