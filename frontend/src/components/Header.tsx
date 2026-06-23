import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Boshqaruv paneli</h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-medium text-gray-800">{user?.fullName}</p>
          <p className="text-sm text-gray-500">{user?.role}</p>
        </div>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Chiqish
        </button>
      </div>
    </header>
  );
};

export default Header;
