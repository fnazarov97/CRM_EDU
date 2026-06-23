import api from './api';
import type { Teacher } from '../types';

export const teachersService = {
  async getTeachers(): Promise<Teacher[]> {
    const response = await api.get<Teacher[]>('/teachers');
    return response.data;
  },

  async createTeacher(teacher: Omit<Teacher, 'id' | 'status'>): Promise<string> {
    const response = await api.post<string>('/teachers', teacher);
    return response.data;
  },
};
