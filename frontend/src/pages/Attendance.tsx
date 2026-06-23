import { useState, useEffect } from 'react';
import type { Session, Group } from '../types';
import { sessionsService } from '../services/sessionsService';
import { groupsService } from '../services/groupsService';
import Icon from '../components/Icon';
import { PageHeader, StatCard, Modal, Field, inputClass } from '../components/ui';

const Attendance: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [groupFilter, setGroupFilter] = useState('Hammasi');
  const [newSession, setNewSession] = useState({ groupId: '', date: '', topic: '', homework: '' });

  const loadData = async () => {
    try {
      const [s, g] = await Promise.all([sessionsService.getSessions(), groupsService.getGroups()]);
      setSessions(s);
      setGroups(g);
    } catch (e) {
      console.error('Failed to load sessions:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional data fetch on mount
    loadData();
  }, []);

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sessionsService.createSession({ ...newSession, date: new Date(newSession.date).toISOString() });
      setShowModal(false);
      setNewSession({ groupId: '', date: '', topic: '', homework: '' });
      loadData();
    } catch (err) {
      console.error('Failed to create session:', err);
    }
  };

  const openModal = () => {
    setNewSession({ groupId: groups[0]?.id ?? '', date: '', topic: '', homework: '' });
    setShowModal(true);
  };

  const filtered = sessions.filter((s) => groupFilter === 'Hammasi' || s.groupName === groupFilter);
  const today = new Date().toDateString();
  const todayCount = sessions.filter((s) => new Date(s.date).toDateString() === today).length;
  const groupNames = Array.from(new Set(sessions.map((s) => s.groupName)));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Davomat va darslar"
        subtitle="O'tkazilgan darslar va davomat jurnali."
        actions={
          <button
            onClick={openModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-lg text-title-md shadow-sm hover:bg-primary/90 active:scale-95 transition-all"
          >
            <Icon name="add" />
            <span>Yangi dars</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon="event" label="Jami darslar" value={sessions.length.toLocaleString()} tone="primary" />
        <StatCard icon="today" label="Bugungi darslar" value={todayCount.toLocaleString()} tone="secondary" />
        <StatCard icon="group" label="Faol guruhlar" value={groupNames.length.toLocaleString()} tone="tertiary" />
      </div>

      <div className="bg-surface rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-surface-container-high overflow-hidden">
        <div className="p-4 border-b border-surface-container flex items-center gap-3 flex-wrap">
          <Icon name="filter_list" className="text-on-surface-variant" />
          <button
            onClick={() => setGroupFilter('Hammasi')}
            className={`px-4 py-2 rounded-full text-label-md transition-colors ${
              groupFilter === 'Hammasi' ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Hammasi
          </button>
          {groupNames.map((g) => (
            <button
              key={g}
              onClick={() => setGroupFilter(g)}
              className={`px-4 py-2 rounded-full text-label-md transition-colors ${
                groupFilter === g ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className="p-6 text-on-surface-variant">Yuklanmoqda...</p>
        ) : filtered.length === 0 ? (
          <p className="p-10 text-center text-on-surface-variant">Hozircha darslar yo'q.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-label-md text-on-surface-variant uppercase tracking-wider bg-surface-container-low">
                  <th className="px-6 py-3 font-medium">Sana</th>
                  <th className="px-6 py-3 font-medium">Guruh</th>
                  <th className="px-6 py-3 font-medium">Mavzu</th>
                  <th className="px-6 py-3 font-medium">Uyga vazifa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-body-md text-on-surface">
                        <Icon name="calendar_today" className="text-[18px] text-on-surface-variant" />
                        {new Date(s.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-title-md text-on-surface">{s.groupName}</td>
                    <td className="px-6 py-4 text-body-md text-on-surface-variant">{s.topic}</td>
                    <td className="px-6 py-4 text-body-md text-on-surface-variant">{s.homework || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={showModal} title="Yangi dars qo'shish" onClose={() => setShowModal(false)}>
        <form onSubmit={handleCreateSession} className="space-y-4">
          <Field label="Guruh">
            <select className={inputClass} value={newSession.groupId} onChange={(e) => setNewSession({ ...newSession, groupId: e.target.value })} required>
              <option value="" disabled>Guruhni tanlang</option>
              {groups.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Sana">
            <input type="date" className={inputClass} value={newSession.date} onChange={(e) => setNewSession({ ...newSession, date: e.target.value })} required />
          </Field>
          <Field label="Mavzu">
            <input className={inputClass} value={newSession.topic} onChange={(e) => setNewSession({ ...newSession, topic: e.target.value })} required />
          </Field>
          <Field label="Uyga vazifa (ixtiyoriy)">
            <input className={inputClass} value={newSession.homework} onChange={(e) => setNewSession({ ...newSession, homework: e.target.value })} />
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

export default Attendance;
