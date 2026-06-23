import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import type { LoginRequest } from '../types';
import Icon from '../components/Icon';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginRequest>({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(credentials);
      navigate('/');
    } catch {
      setError("Login yoki parol noto'g'ri");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-primary-container/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-secondary-container/10 blur-[120px]" />
      </div>

      <main className="w-full max-w-[440px] relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary-container rounded-xl flex items-center justify-center mb-4 shadow-sm">
            <Icon name="school" className="text-on-primary text-[40px]" fill />
          </div>
          <h1 className="text-headline-md text-on-background tracking-tight">EduCRM Pro</h1>
          <p className="text-body-md text-on-surface-variant mt-1">O'quv markazi boshqaruv tizimi</p>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.02)] border border-outline-variant/30">
          <div className="mb-6">
            <h2 className="text-title-lg text-on-surface">Tizimga kirish</h2>
            <p className="text-label-md text-on-surface-variant mt-1">Davom etish uchun ma'lumotlaringizni kiriting</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-label-md text-on-surface-variant block ml-1" htmlFor="login">
                Username yoki Telefon
              </label>
              <div className="relative group">
                <Icon
                  name="person"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] group-focus-within:text-primary transition-colors"
                />
                <input
                  id="login"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-body-md text-on-surface placeholder:text-outline/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="admin"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-label-md text-on-surface-variant block ml-1" htmlFor="password">
                Parol
              </label>
              <div className="relative group">
                <Icon
                  name="lock"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] group-focus-within:text-primary transition-colors"
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-body-md text-on-surface placeholder:text-outline/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                >
                  <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-[20px]" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-1">
              <label className="flex items-center cursor-pointer gap-2 text-label-md text-on-surface-variant">
                <input type="checkbox" className="w-4 h-4 accent-primary rounded" />
                Eslab qolish
              </label>
              <a className="text-label-md text-primary hover:underline font-semibold" href="#">
                Parolni unutdingizmi?
              </a>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-error text-body-md bg-error-container/40 px-3 py-2 rounded-lg">
                <Icon name="error" className="text-[18px]" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-primary text-on-primary rounded-lg text-title-md shadow-sm hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <span>{isLoading ? 'Kirilmoqda...' : 'Kirish'}</span>
              {!isLoading && <Icon name="login" className="text-[20px]" />}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-outline-variant/30 flex items-center justify-center gap-2">
            <Icon name="verified_user" className="text-secondary text-[18px]" />
            <span className="text-label-md text-on-surface-variant">Xavfsiz ulanish faollashtirilgan</span>
          </div>
        </div>

        <footer className="mt-8 text-center space-y-4">
          <p className="text-label-md text-outline">© 2024 EduCRM Pro. Barcha huquqlar himoyalangan.</p>
        </footer>
      </main>
    </div>
  );
};

export default Login;
