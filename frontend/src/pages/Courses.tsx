import { useState, useEffect } from 'react';
import type { Course } from '../types';
import { coursesService } from '../services/coursesService';
import Icon from '../components/Icon';
import { PageHeader, Modal, Field, inputClass } from '../components/ui';

const gradients = [
  'from-primary to-primary-container',
  'from-secondary to-secondary-fixed-dim',
  'from-tertiary to-tertiary-container',
  'from-primary-container to-secondary',
];

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', price: 0, durationMonths: 1, description: '' });

  const loadCourses = async () => {
    try {
      setCourses(await coursesService.getCourses());
    } catch (e) {
      console.error('Failed to load courses:', e);
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
    } catch (err) {
      console.error('Failed to create course:', err);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kurslar ro'yxati"
        subtitle="Markazingiz taklif qiladigan o'quv kurslari."
        actions={
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-lg text-title-md shadow-sm hover:bg-primary/90 active:scale-95 transition-all"
          >
            <Icon name="add" />
            <span>Yangi kurs</span>
          </button>
        }
      />

      {isLoading ? (
        <p className="text-on-surface-variant">Yuklanmoqda...</p>
      ) : courses.length === 0 ? (
        <div className="bg-surface rounded-xl border border-surface-container-high p-10 text-center text-on-surface-variant">
          Hozircha kurslar yo'q.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <div
              key={course.id}
              className="bg-surface rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-surface-container-high overflow-hidden hover:border-primary-container hover:shadow-md transition-all flex flex-col"
            >
              <div className={`h-32 bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center relative`}>
                <Icon name="menu_book" className="text-on-primary text-[48px]" fill />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-title-lg text-on-surface">{course.title}</h3>
                <p className="text-body-md text-on-surface-variant mt-1 line-clamp-2 flex-1">
                  {course.description || 'Tavsif kiritilmagan.'}
                </p>
                <div className="flex items-center gap-4 text-label-md text-on-surface-variant mt-4">
                  <span className="flex items-center gap-1">
                    <Icon name="schedule" className="text-[16px]" />
                    {course.durationMonths} oy
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-container">
                  <span className="text-title-md text-primary">{course.price.toLocaleString()} so'm</span>
                  <button className="flex items-center gap-1 text-label-md text-primary hover:underline">
                    Batafsil
                    <Icon name="arrow_forward" className="text-[16px]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={showModal} title="Yangi kurs qo'shish" onClose={() => setShowModal(false)}>
        <form onSubmit={handleCreateCourse} className="space-y-4">
          <Field label="Kurs nomi">
            <input className={inputClass} value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} required />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Narxi (so'm)">
              <input type="number" className={inputClass} value={newCourse.price} onChange={(e) => setNewCourse({ ...newCourse, price: Number(e.target.value) })} />
            </Field>
            <Field label="Davomiyligi (oy)">
              <input type="number" min={1} className={inputClass} value={newCourse.durationMonths} onChange={(e) => setNewCourse({ ...newCourse, durationMonths: Number(e.target.value) })} />
            </Field>
          </div>
          <Field label="Tavsif">
            <textarea className={inputClass} rows={3} value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} />
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

export default Courses;
