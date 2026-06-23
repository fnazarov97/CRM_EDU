import React, { useState, useEffect } from 'react';
import type { Lead } from '../types';
import { leadsService } from '../services/leadsService';

const Leads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newLead, setNewLead] = useState({ fullName: '', phoneNumber: '', source: '', notes: '', status: 'Yangi' });

  const loadLeads = async () => {
    try {
      const data = await leadsService.getLeads();
      setLeads(data);
    } catch (error) {
      console.error('Failed to load leads:', error);
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
    } catch (error) {
      console.error('Failed to create lead:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leadlar</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Yangi lead
        </button>
      </div>

      {isLoading ? (
        <p>Yuklanmoqda...</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">F.I.O</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telefon</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Manba</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Holat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Izoh</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-6 py-4">{lead.fullName}</td>
                  <td className="px-6 py-4">{lead.phoneNumber}</td>
                  <td className="px-6 py-4">{lead.source}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{lead.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Yangi lead qo'shish</h2>
            <form onSubmit={handleCreateLead} className="space-y-4">
              <input
                type="text"
                placeholder="F.I.O"
                value={newLead.fullName}
                onChange={(e) => setNewLead({ ...newLead, fullName: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Telefon raqam"
                value={newLead.phoneNumber}
                onChange={(e) => setNewLead({ ...newLead, phoneNumber: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Manba"
                value={newLead.source}
                onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <textarea
                placeholder="Izoh"
                value={newLead.notes}
                onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={3}
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

export default Leads;
