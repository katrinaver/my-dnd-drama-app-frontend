import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { forgotPasswordApi, loginApi, logoutApi, registerApi } from "@/services/authService";

export type Role = "player" | "master";

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
  login: (data: LoginFormValues) => Promise<void>;
  register: (data: RegisterFormValues) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

const parseUser = (rawUser: { email?: string | null; user_metadata?: Record<string, unknown> }): User | null => {
  if (!rawUser.email) return null;

  const metadata = rawUser.user_metadata ?? {};
  const role = metadata.role;
  const safeRole: Role | undefined = role === "master" || role === "player" ? role : undefined;

  return {
    email: rawUser.email,
    name: typeof metadata.name === "string" ? metadata.name : undefined,
    role: safeRole,
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({ isAuthenticated: false, user: null });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const syncSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;

      setAuthState({
        isAuthenticated: Boolean(data.session?.user),
        user: data.session?.user ? parseUser(data.session.user) : null,
      });
      setLoading(false);
    };

    void syncSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthState({
        isAuthenticated: Boolean(session?.user),
        user: session?.user ? parseUser(session.user) : null,
      });
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (data: LoginFormValues) => {
    const session = await loginApi(data.email, data.password);
    setAuthState({
      isAuthenticated: true,
      user: parseUser(session.user),
    });
    navigate("/");
  };

  const register = async (data: RegisterFormValues) => {
    await registerApi(data);
  };

  const logout = async () => {
    await logoutApi();
    setAuthState({ isAuthenticated: false, user: null });
    navigate("/login");
  };

  const forgotPassword = async (email: string) => {
    await forgotPasswordApi(email);
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout, forgotPassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
