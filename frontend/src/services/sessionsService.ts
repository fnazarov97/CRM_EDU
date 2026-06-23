import api from './api';
import type { Session } from '../types';

export interface CreateSessionRequest {
  groupId: string;
  date: string;
  topic: string;
  homework?: string;
}

export const sessionsService = {
  async getSessions(): Promise<Session[]> {
    const response = await api.get<Session[]>('/sessions');
    return response.data;
  },

  async createSession(session: CreateSessionRequest): Promise<string> {
    const response = await api.post<string>('/sessions', session);
    return response.data;
  },
};
