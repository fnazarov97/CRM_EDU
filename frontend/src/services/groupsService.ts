import api from './api';
import type { Group } from '../types';

export interface CreateGroupRequest {
  name: string;
  courseId: string;
  teacherId: string;
  schedule: string;
  maxStudents: number;
}

export const groupsService = {
  async getGroups(): Promise<Group[]> {
    const response = await api.get<Group[]>('/groups');
    return response.data;
  },

  async createGroup(group: CreateGroupRequest): Promise<string> {
    const response = await api.post<string>('/groups', group);
    return response.data;
  },
};
