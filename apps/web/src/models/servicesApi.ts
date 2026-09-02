import { apiGet } from './httpClient';
import type { ServiceDto } from './types';

export function fetchServices() {
  return apiGet<ServiceDto[]>('/services');
}
