import React, { useState, useEffect } from 'react';
import type { Session, Group } from '../types';
import { sessionsService } from '../services/sessionsService';
import { groupsService } from '../services/groupsService';

const Attendance: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newSession, setNewSession] = useState({ groupId: '', date: '', topic: '', homework: '' });

  const loadData = async () => {
    try {
      const [sessionsData, groupsData] = await Promise.all([
        sessionsService.getSessions(),
        groupsService.getGroups(),
      ]);
      setSessions(sessionsData);
      setGroups(groupsData);
    } catch (error) {
      console.error('Failed to load sessions:', error);
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
      await sessionsService.createSession({
        ...newSession,
        date: new Date(newSession.date).toISOString(),
      });
      setShowModal(false);
      setNewSession({ groupId: '', date: '', topic: '', homework: '' });
      loadData();
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  const openModal = () => {
    setNewSession({ groupId: groups[0]?.id ?? '', date: '', topic: '', homework: '' });
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Davomat (Darslar)</h1>
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Yangi dars
        </button>
      </div>

      {isLoading ? (
        <p>Yuklanmoqda...</p>
      ) : sessions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-gray-600">Hozircha darslar yo'q.</div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sana</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guruh</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mavzu</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uyga vazifa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sessions.map((session) => (
                <tr key={session.id}>
                  <td className="px-6 py-4">{new Date(session.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium">{session.groupName}</td>
                  <td className="px-6 py-4">{session.topic}</td>
                  <td className="px-6 py-4 text-gray-600">{session.homework || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Yangi dars qo'shish</h2>
            <form onSubmit={handleCreateSession} className="space-y-4">
              <select
                value={newSession.groupId}
                onChange={(e) => setNewSession({ ...newSession, groupId: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                <option value="" disabled>Guruhni tanlang</option>
                {groups.map((g) => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
              <input
                type="date"
                value={newSession.date}
                onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Mavzu"
                value={newSession.topic}
                onChange={(e) => setNewSession({ ...newSession, topic: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Uyga vazifa (ixtiyoriy)"
                value={newSession.homework}
                onChange={(e) => setNewSession({ ...newSession, homework: e.target.value })}
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

export default Attendance;
