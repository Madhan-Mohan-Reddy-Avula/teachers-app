import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client'; // adjust path

interface User {
  id: string;
  email: string;
  name?: string;
  school_id?: string; // ✅ important for school-based data
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => Promise<{ error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email: string) => {
    try {
      const cleanEmail = email.trim().toLowerCase();

      // ✅ Query faculty from Supabase
      const { data, error } = await supabase
        .from('faculty')
        .select('id, name, email, school_id')
        .eq('email', cleanEmail)
        .single();

      if (error || !data) {
        return { error: 'User not found or unauthorized' };
      }

      const newUser: User = {
        id: data.id,
        email: data.email,
        name: data.name,
        school_id: data.school_id,
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return {};
    } catch (err) {
      console.error('Login error:', err);
      return { error: 'Login failed. Try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
