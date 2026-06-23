import { useState, useEffect } from 'react';
import type { Group, Course, Teacher } from '../types';
import { groupsService } from '../services/groupsService';
import { coursesService } from '../services/coursesService';
import { teachersService } from '../services/teachersService';
import Icon from '../components/Icon';
import { PageHeader, StatCard, Modal, Field, inputClass } from '../components/ui';

const Groups: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', courseId: '', teacherId: '', schedule: '', maxStudents: 15 });

  const loadData = async () => {
    try {
      const [g, c, t] = await Promise.all([
        groupsService.getGroups(),
        coursesService.getCourses(),
        teachersService.getTeachers(),
      ]);
      setGroups(g);
      setCourses(c);
      setTeachers(t);
    } catch (e) {
      console.error('Failed to load groups:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional data fetch on mount
    loadData();
  }, []);

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await groupsService.createGroup(newGroup);
      setShowModal(false);
      setNewGroup({ name: '', courseId: '', teacherId: '', schedule: '', maxStudents: 15 });
      loadData();
    } catch (err) {
      console.error('Failed to create group:', err);
    }
  };

  const openModal = () => {
    setNewGroup({ name: '', courseId: courses[0]?.id ?? '', teacherId: teachers[0]?.id ?? '', schedule: '', maxStudents: 15 });
    setShowModal(true);
  };

  const active = groups.filter((g) => g.status === 'Faol').length;
  const totalStudents = groups.reduce((s, g) => s + g.currentStudents, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Guruhlar boshqaruvi"
        subtitle="O'quv guruhlari, jadvallar va o'qituvchilar."
        actions={
          <button
            onClick={openModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-lg text-title-md shadow-sm hover:bg-primary/90 active:scale-95 transition-all"
          >
            <Icon name="add" />
            <span>Yangi guruh</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon="group" label="Jami guruhlar" value={groups.length.toLocaleString()} tone="primary" />
        <StatCard icon="check_circle" label="Faol guruhlar" value={active.toLocaleString()} tone="secondary" />
        <StatCard icon="groups" label="O'quvchilar" value={totalStudents.toLocaleString()} tone="tertiary" />
      </div>

      <div className="bg-surface rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-surface-container-high overflow-hidden">
        {isLoading ? (
          <p className="p-6 text-on-surface-variant">Yuklanmoqda...</p>
        ) : groups.length === 0 ? (
          <p className="p-10 text-center text-on-surface-variant">Hozircha guruhlar yo'q.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-label-md text-on-surface-variant uppercase tracking-wider bg-surface-container-low">
                  <th className="px-6 py-3 font-medium">Guruh</th>
                  <th className="px-6 py-3 font-medium">Kurs</th>
                  <th className="px-6 py-3 font-medium">O'qituvchi</th>
                  <th className="px-6 py-3 font-medium">Jadval</th>
                  <th className="px-6 py-3 font-medium">O'quvchilar</th>
                  <th className="px-6 py-3 font-medium">Holat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {groups.map((g) => (
                  <tr key={g.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary-container/10 text-primary flex items-center justify-center">
                          <Icon name="group" fill />
                        </div>
                        <span className="text-title-md text-on-surface">{g.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-body-md text-on-surface-variant">{g.courseTitle}</td>
                    <td className="px-6 py-4 text-body-md text-on-surface-variant">{g.teacherName}</td>
                    <td className="px-6 py-4 text-body-md text-on-surface-variant">{g.schedule || '—'}</td>
                    <td className="px-6 py-4">
                      <span className="text-title-md">{g.currentStudents}</span>
                      <span className="text-on-surface-variant">/{g.maxStudents}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-label-md font-semibold ${
                          g.status === 'Faol'
                            ? 'bg-secondary-container/30 text-on-secondary-container'
                            : 'bg-surface-container-high text-on-surface-variant'
                        }`}
                      >
                        {g.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={showModal} title="Yangi guruh qo'shish" onClose={() => setShowModal(false)}>
        <form onSubmit={handleCreateGroup} className="space-y-4">
          <Field label="Guruh nomi">
            <input className={inputClass} placeholder="masalan ENG-101" value={newGroup.name} onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })} required />
          </Field>
          <Field label="Kurs">
            <select className={inputClass} value={newGroup.courseId} onChange={(e) => setNewGroup({ ...newGroup, courseId: e.target.value })} required>
              <option value="" disabled>Kursni tanlang</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </Field>
          <Field label="O'qituvchi">
            <select className={inputClass} value={newGroup.teacherId} onChange={(e) => setNewGroup({ ...newGroup, teacherId: e.target.value })} required>
              <option value="" disabled>O'qituvchini tanlang</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>{t.fullName}</option>
              ))}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Jadval">
              <input className={inputClass} placeholder="Du/Chor/Jum 18:00" value={newGroup.schedule} onChange={(e) => setNewGroup({ ...newGroup, schedule: e.target.value })} />
            </Field>
            <Field label="Maksimal o'quvchilar">
              <input type="number" min={1} className={inputClass} value={newGroup.maxStudents} onChange={(e) => setNewGroup({ ...newGroup, maxStudents: Number(e.target.value) })} />
            </Field>
          </div>
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

export default Groups;
