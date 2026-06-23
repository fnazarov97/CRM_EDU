import { useState } from 'react';
import { useAuth } from '../context/auth-context';
import Icon from './Icon';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const initials = (user?.fullName || user?.username || 'A')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header className="flex justify-between items-center h-16 px-8 bg-surface shadow-sm sticky top-0 z-40">
      <div className="flex items-center gap-4 w-1/3">
        <div className="relative w-full max-w-sm">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />
          <input
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-body-md focus:ring-2 focus:ring-primary outline-none transition-all"
            placeholder="Qidiruv..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-primary text-title-md hover:bg-surface-container-low transition-colors">
          <Icon name="account_balance" />
          <span className="hidden md:inline">Filial tanlash</span>
        </button>

        <div className="flex items-center gap-4 border-l border-outline-variant pl-6">
          <button className="relative p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
            <Icon name="notifications" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
            <Icon name="apps" />
          </button>

          <div className="relative">
            <div
              className="flex items-center gap-3 ml-2 cursor-pointer group"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <div className="text-right hidden sm:block">
                <p className="text-title-md leading-none">{user?.fullName || user?.username}</p>
                <p className="text-label-md text-on-surface-variant">{user?.role || 'Administrator'}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-semibold border-2 border-primary-container group-hover:scale-105 transition-transform">
                {initials}
              </div>
            </div>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/40 py-2 z-50">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-error hover:bg-surface-container-low transition-colors"
                >
                  <Icon name="logout" className="text-[20px]" />
                  <span>Chiqish</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
