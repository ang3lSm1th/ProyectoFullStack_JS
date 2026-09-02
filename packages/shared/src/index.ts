/** Shared contracts between web and api (expand in later phases). */
export type HealthStatus = {
  status: 'ok' | 'degraded' | 'down';
  service: string;
  timestamp: string;
};
