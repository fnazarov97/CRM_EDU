import api from './api';
import type { Student } from '../types';

export const studentsService = {
  async getStudents(): Promise<Student[]> {
    const response = await api.get<Student[]>('/students');
    return response.data;
  },

  async createStudent(student: Omit<Student, 'id' | 'createdAt'>): Promise<string> {
    const response = await api.post<string>('/students', student);
    return response.data;
  },
};
