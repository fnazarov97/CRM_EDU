import React, { useState, useEffect } from 'react';
import type { Group, Course, Teacher } from '../types';
import { groupsService } from '../services/groupsService';
import { coursesService } from '../services/coursesService';
import { teachersService } from '../services/teachersService';

const Groups: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', courseId: '', teacherId: '', schedule: '', maxStudents: 15 });

  const loadData = async () => {
    try {
      const [groupsData, coursesData, teachersData] = await Promise.all([
        groupsService.getGroups(),
        coursesService.getCourses(),
        teachersService.getTeachers(),
      ]);
      setGroups(groupsData);
      setCourses(coursesData);
      setTeachers(teachersData);
    } catch (error) {
      console.error('Failed to load groups:', error);
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
    } catch (error) {
      console.error('Failed to create group:', error);
    }
  };

  const openModal = () => {
    setNewGroup({
      name: '',
      courseId: courses[0]?.id ?? '',
      teacherId: teachers[0]?.id ?? '',
      schedule: '',
      maxStudents: 15,
    });
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Guruhlar</h1>
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Yangi guruh
        </button>
      </div>

      {isLoading ? (
        <p>Yuklanmoqda...</p>
      ) : groups.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-gray-600">Hozircha guruhlar yo'q.</div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nomi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kurs</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">O'qituvchi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jadval</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">O'quvchilar</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {groups.map((group) => (
                <tr key={group.id}>
                  <td className="px-6 py-4 font-medium">{group.name}</td>
                  <td className="px-6 py-4">{group.courseTitle}</td>
                  <td className="px-6 py-4">{group.teacherName}</td>
                  <td className="px-6 py-4">{group.schedule}</td>
                  <td className="px-6 py-4">{group.currentStudents}/{group.maxStudents}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {group.status}
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
            <h2 className="text-xl font-bold mb-4">Yangi guruh qo'shish</h2>
            <form onSubmit={handleCreateGroup} className="space-y-4">
              <input
                type="text"
                placeholder="Guruh nomi (masalan ENG-101)"
                value={newGroup.name}
                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <select
                value={newGroup.courseId}
                onChange={(e) => setNewGroup({ ...newGroup, courseId: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                <option value="" disabled>Kursni tanlang</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
              <select
                value={newGroup.teacherId}
                onChange={(e) => setNewGroup({ ...newGroup, teacherId: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                <option value="" disabled>O'qituvchini tanlang</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>{t.fullName}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Jadval (masalan Du/Chor/Jum 18:00)"
                value={newGroup.schedule}
                onChange={(e) => setNewGroup({ ...newGroup, schedule: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                placeholder="Maksimal o'quvchilar"
                value={newGroup.maxStudents}
                onChange={(e) => setNewGroup({ ...newGroup, maxStudents: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg"
                min={1}
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

export default Groups;
