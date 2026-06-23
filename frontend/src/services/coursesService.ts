import api from './api';
import type { Course } from '../types';

export const coursesService = {
  async getCourses(): Promise<Course[]> {
    const response = await api.get<Course[]>('/courses');
    return response.data;
  },

  async createCourse(course: Omit<Course, 'id'>): Promise<string> {
    const response = await api.post<string>('/courses', course);
    return response.data;
  },
};
