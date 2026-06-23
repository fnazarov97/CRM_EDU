import api from './api';
import type { Lead } from '../types';

export const leadsService = {
  async getLeads(): Promise<Lead[]> {
    const response = await api.get<Lead[]>('/leads');
    return response.data;
  },

  async createLead(lead: Omit<Lead, 'id' | 'createdAt'>): Promise<string> {
    const response = await api.post<string>('/leads', lead);
    return response.data;
  },
};
