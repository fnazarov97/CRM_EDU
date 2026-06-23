import { useState, useEffect } from 'react';
import type { Lead } from '../types';
import { leadsService } from '../services/leadsService';
import Icon from '../components/Icon';
import { PageHeader, StatCard, Modal, Field, inputClass, Avatar } from '../components/ui';

const statusTone = (status: string): string => {
  switch (status) {
    case 'Yangi':
      return 'bg-primary-container/10 text-primary';
    case 'Aloqada':
      return 'bg-tertiary-container/20 text-tertiary';
    case 'Sinov darsida':
      return 'bg-secondary-container/30 text-on-secondary-container';
    case "Ro'yxatdan o'tgan":
      return 'bg-secondary text-on-secondary';
    case 'Rad etilgan':
      return 'bg-error-container text-on-error-container';
    default:
      return 'bg-surface-container-high text-on-surface-variant';
  }
};

const STATUSES = ['Yangi', 'Aloqada', 'Sinov darsida', "Ro'yxatdan o'tgan", 'Rad etilgan'];

const Leads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('Hammasi');
  const [search, setSearch] = useState('');
  const [newLead, setNewLead] = useState({ fullName: '', phoneNumber: '', source: '', notes: '', status: 'Yangi' });

  const loadLeads = async () => {
    try {
      setLeads(await leadsService.getLeads());
    } catch (e) {
      console.error('Failed to load leads:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional data fetch on mount
    loadLeads();
  }, []);

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await leadsService.createLead(newLead);
      setShowModal(false);
      setNewLead({ fullName: '', phoneNumber: '', source: '', notes: '', status: 'Yangi' });
      loadLeads();
    } catch (err) {
      console.error('Failed to create lead:', err);
    }
  };

  const filtered = leads.filter(
    (l) =>
      (filter === 'Hammasi' || l.status === filter) &&
      (l.fullName.toLowerCase().includes(search.toLowerCase()) || l.phoneNumber.includes(search)),
  );

  const converted = leads.filter((l) => l.status === "Ro'yxatdan o'tgan").length;
  const convRate = leads.length ? ((converted / leads.length) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lidlar boshqaruvi"
        subtitle="Potensial mijozlarni kuzating va savdo voronkasini boshqaring."
        actions={
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-lg text-title-md shadow-sm hover:bg-primary/90 active:scale-95 transition-all"
          >
            <Icon name="add" />
            <span>Yangi lid</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon="groups" label="Jami lidlar" value={leads.length.toLocaleString()} tone="primary" />
        <StatCard icon="trending_up" label="Konversiya" value={`${convRate}%`} tone="secondary" />
        <StatCard icon="how_to_reg" label="Ro'yxatga olingan" value={converted.toLocaleString()} tone="tertiary" />
      </div>

      <div className="bg-surface rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-surface-container-high p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]" />
          <input
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-body-md focus:ring-2 focus:ring-primary outline-none"
            placeholder="Ism yoki telefon bo'yicha qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
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
      </div>

      {isLoading ? (
        <p className="text-on-surface-variant">Yuklanmoqda...</p>
      ) : filtered.length === 0 ? (
        <div className="bg-surface rounded-xl border border-surface-container-high p-10 text-center text-on-surface-variant">
          Lidlar topilmadi.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((lead) => (
            <div
              key={lead.id}
              className="bg-surface rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-surface-container-high p-5 hover:border-primary-container transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar name={lead.fullName} className="w-12 h-12 text-title-md" />
                  <div>
                    <p className="text-title-md text-on-surface">{lead.fullName}</p>
                    <p className="text-label-md text-on-surface-variant flex items-center gap-1">
                      <Icon name="call" className="text-[14px]" />
                      {lead.phoneNumber}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-label-md font-semibold ${statusTone(lead.status)}`}>
                  {lead.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-label-md text-on-surface-variant border-t border-surface-container pt-3">
                <span className="flex items-center gap-1">
                  <Icon name="campaign" className="text-[16px]" />
                  {lead.source || '—'}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="schedule" className="text-[16px]" />
                  {new Date(lead.createdAt).toLocaleDateString()}
                </span>
              </div>
              {lead.notes && <p className="text-body-md text-on-surface-variant mt-3 line-clamp-2">{lead.notes}</p>}
            </div>
          ))}
        </div>
      )}

      <Modal open={showModal} title="Yangi lid qo'shish" onClose={() => setShowModal(false)}>
        <form onSubmit={handleCreateLead} className="space-y-4">
          <Field label="F.I.O">
            <input className={inputClass} value={newLead.fullName} onChange={(e) => setNewLead({ ...newLead, fullName: e.target.value })} required />
          </Field>
          <Field label="Telefon raqam">
            <input className={inputClass} value={newLead.phoneNumber} onChange={(e) => setNewLead({ ...newLead, phoneNumber: e.target.value })} required />
          </Field>
          <Field label="Manba">
            <input className={inputClass} placeholder="Instagram, Telegram, Tavsiya..." value={newLead.source} onChange={(e) => setNewLead({ ...newLead, source: e.target.value })} required />
          </Field>
          <Field label="Status">
            <select className={inputClass} value={newLead.status} onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label="Izoh">
            <textarea className={inputClass} rows={3} value={newLead.notes} onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })} />
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

export default Leads;
