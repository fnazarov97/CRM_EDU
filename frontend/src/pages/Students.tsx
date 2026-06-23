import React, { useState, useEffect } from 'react';
import type { Student } from '../types';
import { studentsService } from '../services/studentsService';

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ fullName: '', phoneNumber: '', balance: 0, status: 'Faol' });

  const loadStudents = async () => {
    try {
      const data = await studentsService.getStudents();
      setStudents(data);
    } catch (error) {
      console.error('Failed to load students:', error);
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
    } catch (error) {
      console.error('Failed to create student:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">O'quvchilar</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Yangi o'quvchi
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balans</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4">{student.fullName}</td>
                  <td className="px-6 py-4">{student.phoneNumber}</td>
                  <td className="px-6 py-4">{student.balance.toLocaleString()} UZS</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Yangi o'quvchi qo'shish</h2>
            <form onSubmit={handleCreateStudent} className="space-y-4">
              <input
                type="text"
                placeholder="F.I.O"
                value={newStudent.fullName}
                onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Telefon raqam"
                value={newStudent.phoneNumber}
                onChange={(e) => setNewStudent({ ...newStudent, phoneNumber: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="number"
                placeholder="Boshlang'ich balans"
                value={newStudent.balance}
                onChange={(e) => setNewStudent({ ...newStudent, balance: Number(e.target.value) })}
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

export default Students;
