import React, { useState } from 'react';
import type { LoginRequest, User } from '../types';
import { authService } from '../services/authService';
import { AuthContext } from './auth-context';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const token = authService.getToken();
    return token ? { id: '1', username: 'admin', fullName: 'Admin User', role: 'Admin' } : null;
  });

  const login = async (credentials: LoginRequest) => {
    const response = await authService.login(credentials);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    setUser({
      id: '1',
      username: response.username,
      fullName: response.username,
      role: response.role,
    });
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading: false }}>
      {children}
    </AuthContext.Provider>
  );
};
