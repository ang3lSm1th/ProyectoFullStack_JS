import { apiPost } from './httpClient';
import type { CreateLeadInput, CreateLeadResponse } from './types';

export function createLead(input: CreateLeadInput) {
  return apiPost<CreateLeadResponse>('/contact', input);
}
