import { useState, useEffect } from 'react';
import type { Invoice, Student } from '../types';
import { paymentsService } from '../services/paymentsService';
import { studentsService } from '../services/studentsService';
import Icon from '../components/Icon';
import { PageHeader, StatCard, Modal, Field, inputClass, Avatar } from '../components/ui';

const statusStyle = (status: string): string => {
  switch (status) {
    case "To'langan":
      return 'bg-secondary-container/30 text-on-secondary-container';
    case "Qisman to'langan":
      return 'bg-tertiary-container/20 text-tertiary';
    default:
      return 'bg-error-container text-on-error-container';
  }
};

const Payments: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('Hammasi');
  const [newInvoice, setNewInvoice] = useState({ studentId: '', amount: 0, dueDate: '', description: '' });

  const loadData = async () => {
    try {
      const [inv, s] = await Promise.all([paymentsService.getInvoices(), studentsService.getStudents()]);
      setInvoices(inv);
      setStudents(s);
    } catch (e) {
      console.error('Failed to load invoices:', e);
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
      await paymentsService.createInvoice({ ...newInvoice, dueDate: new Date(newInvoice.dueDate).toISOString() });
      setShowModal(false);
      setNewInvoice({ studentId: '', amount: 0, dueDate: '', description: '' });
      loadData();
    } catch (err) {
      console.error('Failed to create invoice:', err);
    }
  };

  const openModal = () => {
    setNewInvoice({ studentId: students[0]?.id ?? '', amount: 0, dueDate: '', description: '' });
    setShowModal(true);
  };

  const STATUSES = ["To'langan", "Qisman to'langan", "To'lanmagan"];
  const filtered = invoices.filter((i) => filter === 'Hammasi' || i.status === filter);
  const billed = invoices.reduce((s, i) => s + i.amount, 0);
  const collected = invoices.reduce((s, i) => s + i.paidAmount, 0);
  const overdue = invoices.filter((i) => i.remainingAmount > 0).length;
  const fmt = (n: number) => `${n.toLocaleString()} so'm`;

  return (
    <div className="space-y-6">
      <PageHeader
        title="To'lovlar va moliya"
        subtitle="Hisob-fakturalar, to'lovlar va qarzdorliklar."
        actions={
          <button
            onClick={openModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-lg text-title-md shadow-sm hover:bg-primary/90 active:scale-95 transition-all"
          >
            <Icon name="add_card" />
            <span>Yangi to'lov</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon="request_quote" label="Jami hisoblangan" value={fmt(billed)} tone="primary" />
        <StatCard icon="payments" label="Yig'ilgan" value={fmt(collected)} tone="secondary" />
        <StatCard icon="warning" label="Qarzdorliklar" value={overdue.toLocaleString()} tone="error" />
      </div>

      <div className="bg-surface rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-surface-container-high overflow-hidden">
        <div className="p-4 border-b border-surface-container flex items-center gap-3 flex-wrap">
          <Icon name="filter_list" className="text-on-surface-variant" />
          {['Hammasi', ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-label-md transition-colors ${
                filter === s ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className="p-6 text-on-surface-variant">Yuklanmoqda...</p>
        ) : filtered.length === 0 ? (
          <p className="p-10 text-center text-on-surface-variant">Hozircha to'lovlar yo'q.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-label-md text-on-surface-variant uppercase tracking-wider bg-surface-container-low">
                  <th className="px-6 py-3 font-medium">O'quvchi</th>
                  <th className="px-6 py-3 font-medium">Summa</th>
                  <th className="px-6 py-3 font-medium">To'langan</th>
                  <th className="px-6 py-3 font-medium">Qoldiq</th>
                  <th className="px-6 py-3 font-medium">Muddat</th>
                  <th className="px-6 py-3 font-medium">Holat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {filtered.map((inv) => (
                  <tr key={inv.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={inv.studentName} className="w-9 h-9 text-label-md" />
                        <span className="text-title-md text-on-surface">{inv.studentName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-body-md text-on-surface">{fmt(inv.amount)}</td>
                    <td className="px-6 py-4 text-body-md text-secondary">{fmt(inv.paidAmount)}</td>
                    <td className={`px-6 py-4 text-body-md ${inv.remainingAmount > 0 ? 'text-error' : 'text-on-surface-variant'}`}>
                      {fmt(inv.remainingAmount)}
                    </td>
                    <td className="px-6 py-4 text-body-md text-on-surface-variant">{new Date(inv.dueDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-label-md font-semibold ${statusStyle(inv.status)}`}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={showModal} title="Yangi to'lov qo'shish" onClose={() => setShowModal(false)}>
        <form onSubmit={handleCreateInvoice} className="space-y-4">
          <Field label="O'quvchi">
            <select className={inputClass} value={newInvoice.studentId} onChange={(e) => setNewInvoice({ ...newInvoice, studentId: e.target.value })} required>
              <option value="" disabled>O'quvchini tanlang</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>{s.fullName}</option>
              ))}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Summa (so'm)">
              <input type="number" min={1} className={inputClass} value={newInvoice.amount} onChange={(e) => setNewInvoice({ ...newInvoice, amount: Number(e.target.value) })} required />
            </Field>
            <Field label="To'lov muddati">
              <input type="date" className={inputClass} value={newInvoice.dueDate} onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })} required />
            </Field>
          </div>
          <Field label="Izoh (ixtiyoriy)">
            <input className={inputClass} value={newInvoice.description} onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })} />
          </Field>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors">
              Bekor qilish
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition-colors">
              Saqlash
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Payments;
