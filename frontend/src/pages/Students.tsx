import { useState, useEffect } from 'react';
import type { Student } from '../types';
import { studentsService } from '../services/studentsService';
import Icon from '../components/Icon';
import { PageHeader, StatCard, Modal, Field, inputClass, Avatar } from '../components/ui';

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [newStudent, setNewStudent] = useState({ fullName: '', phoneNumber: '', balance: 0, status: 'Faol' });

  const loadStudents = async () => {
    try {
      setStudents(await studentsService.getStudents());
    } catch (e) {
      console.error('Failed to load students:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional data fetch on mount
    loadStudents();
  }, []);

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await studentsService.createStudent(newStudent);
      setShowModal(false);
      setNewStudent({ fullName: '', phoneNumber: '', balance: 0, status: 'Faol' });
      loadStudents();
    } catch (err) {
      console.error('Failed to create student:', err);
    }
  };

  const filtered = students.filter(
    (s) => s.fullName.toLowerCase().includes(search.toLowerCase()) || s.phoneNumber.includes(search),
  );
  const active = students.filter((s) => s.status === 'Faol').length;
  const debtors = students.filter((s) => s.balance < 0).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="O'quvchilar ro'yxati"
        subtitle="Markazingizdagi barcha o'quvchilarni boshqaring."
        actions={
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-lg text-title-md shadow-sm hover:bg-primary/90 active:scale-95 transition-all"
          >
            <Icon name="person_add" />
            <span>Yangi o'quvchi</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon="groups" label="Jami o'quvchilar" value={students.length.toLocaleString()} tone="primary" />
        <StatCard icon="check_circle" label="Faol" value={active.toLocaleString()} tone="secondary" />
        <StatCard icon="account_balance_wallet" label="Qarzdorlar" value={debtors.toLocaleString()} tone="error" />
      </div>

      <div className="bg-surface rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-surface-container-high overflow-hidden">
        <div className="p-4 border-b border-surface-container">
          <div className="relative max-w-sm">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]" />
            <input
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-body-md focus:ring-2 focus:ring-primary outline-none"
              placeholder="O'quvchini qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <p className="p-6 text-on-surface-variant">Yuklanmoqda...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-label-md text-on-surface-variant uppercase tracking-wider bg-surface-container-low">
                  <th className="px-6 py-3 font-medium">O'quvchi</th>
                  <th className="px-6 py-3 font-medium">Telefon</th>
                  <th className="px-6 py-3 font-medium">Balans</th>
                  <th className="px-6 py-3 font-medium">Holat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={s.fullName} />
                        <div>
                          <p className="text-title-md text-on-surface">{s.fullName}</p>
                          <p className="text-label-md text-on-surface-variant">
                            Ro'yxat: {new Date(s.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-body-md text-on-surface-variant">{s.phoneNumber}</td>
                    <td className={`px-6 py-4 text-title-md ${s.balance < 0 ? 'text-error' : 'text-secondary'}`}>
                      {s.balance.toLocaleString()} so'm
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-label-md font-semibold ${
                          s.status === 'Faol'
                            ? 'bg-secondary-container/30 text-on-secondary-container'
                            : 'bg-surface-container-high text-on-surface-variant'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-on-surface-variant">
                      O'quvchilar topilmadi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={showModal} title="Yangi o'quvchi qo'shish" onClose={() => setShowModal(false)}>
        <form onSubmit={handleCreateStudent} className="space-y-4">
          <Field label="F.I.O">
            <input className={inputClass} value={newStudent.fullName} onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })} required />
          </Field>
          <Field label="Telefon raqam">
            <input className={inputClass} value={newStudent.phoneNumber} onChange={(e) => setNewStudent({ ...newStudent, phoneNumber: e.target.value })} required />
          </Field>
          <Field label="Boshlang'ich balans (so'm)">
            <input type="number" className={inputClass} value={newStudent.balance} onChange={(e) => setNewStudent({ ...newStudent, balance: Number(e.target.value) })} />
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

export default Students;
