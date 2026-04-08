import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import type { RegisterFormValues } from "@/contexts/AuthContext";

export const loginApi = async (email: string, password: string): Promise<Session> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.session) {
    throw new Error(error?.message ?? "Login failed");
  }

  return data.session;
};

export const registerApi = async (payload: RegisterFormValues): Promise<void> => {
  const { error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        name: payload.name,
        role: payload.role,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }
};

export const logoutApi = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};

export const forgotPasswordApi = async (email: string): Promise<void> => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/login`,
  });

  if (error) {
    throw new Error(error.message);
  }
};
