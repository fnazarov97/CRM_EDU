export interface User {
  id: string;
  username: string;
  fullName: string;
  role: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
  role: string;
}

export interface Lead {
  id: string;
  fullName: string;
  phoneNumber: string;
  source: string;
  status: string;
  notes: string;
  createdAt: string;
}

export interface Student {
  id: string;
  fullName: string;
  phoneNumber: string;
  balance: number;
  status: string;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  price: number;
  durationMonths: number;
  description: string;
}

export interface Group {
  id: string;
  name: string;
  courseId: string;
  teacherId: string;
  schedule: string;
  maxStudents: number;
  currentStudents: number;
  status: string;
}

export interface Invoice {
  id: string;
  studentId: string;
  amount: number;
  paidAmount: number;
  remainingAmount: number;
  dueDate: string;
  status: string;
  description?: string;
}
