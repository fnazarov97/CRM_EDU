import api from './api';
import type { Invoice } from '../types';

export interface CreateInvoiceRequest {
  studentId: string;
  amount: number;
  dueDate: string;
  description?: string;
}

export const paymentsService = {
  async getInvoices(): Promise<Invoice[]> {
    const response = await api.get<Invoice[]>('/invoices');
    return response.data;
  },

  async createInvoice(invoice: CreateInvoiceRequest): Promise<string> {
    const response = await api.post<string>('/invoices', invoice);
    return response.data;
  },
};
