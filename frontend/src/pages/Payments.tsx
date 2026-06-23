import React, { useState, useEffect } from 'react';
import type { Invoice, Student } from '../types';
import { paymentsService } from '../services/paymentsService';
import { studentsService } from '../services/studentsService';

const Payments: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ studentId: '', amount: 0, dueDate: '', description: '' });

  const loadData = async () => {
    try {
      const [invoicesData, studentsData] = await Promise.all([
        paymentsService.getInvoices(),
        studentsService.getStudents(),
      ]);
      setInvoices(invoicesData);
      setStudents(studentsData);
    } catch (error) {
      console.error('Failed to load invoices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional data fetch on mount
    loadData();
  }, []);

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await paymentsService.createInvoice({
        ...newInvoice,
        dueDate: new Date(newInvoice.dueDate).toISOString(),
      });
      setShowModal(false);
      setNewInvoice({ studentId: '', amount: 0, dueDate: '', description: '' });
      loadData();
    } catch (error) {
      console.error('Failed to create invoice:', error);
    }
  };

  const openModal = () => {
    setNewInvoice({ studentId: students[0]?.id ?? '', amount: 0, dueDate: '', description: '' });
    setShowModal(true);
  };

  const statusColor = (status: string) =>
    status === "To'langan"
      ? 'bg-green-100 text-green-800'
      : status === "Qisman to'langan"
        ? 'bg-yellow-100 text-yellow-800'
        : 'bg-red-100 text-red-800';

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">To'lovlar</h1>
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Yangi to'lov
        </button>
      </div>

      {isLoading ? (
        <p>Yuklanmoqda...</p>
      ) : invoices.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-gray-600">Hozircha to'lovlar yo'q.</div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">O'quvchi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Summa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qoldiq</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Muddat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 font-medium">{invoice.studentName}</td>
                  <td className="px-6 py-4">{invoice.amount.toLocaleString()} UZS</td>
                  <td className="px-6 py-4">{invoice.remainingAmount.toLocaleString()} UZS</td>
                  <td className="px-6 py-4">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${statusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Yangi to'lov qo'shish</h2>
            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <select
                value={newInvoice.studentId}
                onChange={(e) => setNewInvoice({ ...newInvoice, studentId: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                <option value="" disabled>O'quvchini tanlang</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>{s.fullName}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Summa (UZS)"
                value={newInvoice.amount}
                onChange={(e) => setNewInvoice({ ...newInvoice, amount: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg"
                min={1}
                required
              />
              <input
                type="date"
                value={newInvoice.dueDate}
                onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Izoh (ixtiyoriy)"
                value={newInvoice.description}
                onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Bekor qilish
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
