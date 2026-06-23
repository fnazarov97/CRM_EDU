import { NavLink, useNavigate } from 'react-router-dom';
import Icon from './Icon';

const menuItems = [
  { path: '/', label: 'Boshqaruv paneli', icon: 'dashboard' },
  { path: '/leads', label: 'Lidlar', icon: 'person_search' },
  { path: '/students', label: "O'quvchilar", icon: 'school' },
  { path: '/courses', label: 'Kurslar', icon: 'menu_book' },
  { path: '/groups', label: 'Guruhlar', icon: 'group' },
  { path: '/attendance', label: 'Davomat', icon: 'calendar_today' },
  { path: '/payments', label: "To'lovlar", icon: 'payments' },
  { path: '/reports', label: 'Hisobotlar', icon: 'analytics' },
  { path: '/settings', label: 'Sozlamalar', icon: 'settings' },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] flex flex-col p-6 shadow-sm bg-surface z-50">
      <div className="mb-10 px-2 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary">
          <Icon name="school" fill />
        </div>
        <div>
          <h1 className="text-title-lg font-bold text-primary">EduCRM Pro</h1>
          <p className="text-label-md text-on-surface-variant">Boshqaruv tizimi</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'text-primary bg-surface-container-high text-title-md font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-low text-body-md'
              }`
            }
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-outline-variant">
        <button
          onClick={() => navigate('/courses')}
          className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary py-3 rounded-xl text-title-md shadow-md active:scale-95 transition-transform"
        >
          <Icon name="add" />
          <span>Yangi qo'shish</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
