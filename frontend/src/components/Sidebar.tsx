import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/leads', label: 'Leadlar', icon: '👥' },
    { path: '/students', label: 'O\'quvchilar', icon: '🎓' },
    { path: '/courses', label: 'Kurslar', icon: '📚' },
    { path: '/groups', label: 'Guruhlar', icon: '🏫' },
    { path: '/attendance', label: 'Davomat', icon: '📅' },
    { path: '/payments', label: 'To\'lovlar', icon: '💰' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-400">EduCRM</h1>
        <p className="text-gray-400 text-sm">Ta'lim boshqaruvi tizimi</p>
      </div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
