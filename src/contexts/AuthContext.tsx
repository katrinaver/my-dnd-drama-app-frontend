import React, { createContext, useContext, useState } from 'react';

export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

interface User {
  name?: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthContextType extends AuthState {
  login: (data: LoginFormValues) => void;
  register: (data: RegisterFormValues) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({ isAuthenticated: false, user: null });

  const login = (data: LoginFormValues) => {
    // Simulate login - in real app, make API call
    console.log('Logging in with:', data);
    setAuthState({ isAuthenticated: true, user: { email: data.email } });
  };

  const register = (data: RegisterFormValues) => {
    // Simulate register - in real app, make API call
    console.log('Registering with:', data);
    setAuthState({ isAuthenticated: true, user: { name: data.name, email: data.email } });
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      { children }
    </AuthContext.Provider>
  );
};
