import React from 'react'
import {createContext, useContext, useState} from 'react'
import {useNavigate} from "react-router-dom";

export type Role = 'player' | 'master'

export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

interface User {
  name?: string;
  email: string;
  role?: Role;
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

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({ isAuthenticated: false, user: null });
  const navigate  = useNavigate()

  const login = (data: LoginFormValues) => {
    // Simulate login - in real app, make API call
    console.log('Logging in with:', data);
    setAuthState({ isAuthenticated: true, user: {email: data.email} });
    navigate("/")

  };

  const register = (data: RegisterFormValues) => {
    // Simulate register - in real app, make API call
    console.log('Registering with:', data);
    setAuthState({ isAuthenticated: true, user: { name: data.name, email: data.email, role: data.role}});
    navigate("/")
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null });
    navigate("/login")
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
