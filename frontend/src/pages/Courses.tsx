import React, { useState, useEffect } from 'react';
import type { Course } from '../types';
import { coursesService } from '../services/coursesService';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', price: 0, durationMonths: 1, description: '' });

  const loadCourses = async () => {
    try {
      const data = await coursesService.getCourses();
      setCourses(data);
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional data fetch on mount
    loadCourses();
  }, []);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await coursesService.createCourse(newCourse);
      setShowModal(false);
      setNewCourse({ title: '', price: 0, durationMonths: 1, description: '' });
      loadCourses();
    } catch (error) {
      console.error('Failed to create course:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kurslar</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Yangi kurs
        </button>
      </div>

      {isLoading ? (
        <p>Yuklanmoqda...</p>
      ) : courses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-gray-600">Hozircha kurslar yo'q.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{course.durationMonths} oy</span>
                <span className="font-semibold text-blue-600">{course.price.toLocaleString()} UZS</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Yangi kurs qo'shish</h2>
            <form onSubmit={handleCreateCourse} className="space-y-4">
              <input
                type="text"
                placeholder="Kurs nomi"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="number"
                placeholder="Narxi (UZS)"
                value={newCourse.price}
                onChange={(e) => setNewCourse({ ...newCourse, price: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                placeholder="Davomiyligi (oy)"
                value={newCourse.durationMonths}
                onChange={(e) => setNewCourse({ ...newCourse, durationMonths: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg"
                min={1}
              />
              <textarea
                placeholder="Tavsif"
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
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

export default Courses;
