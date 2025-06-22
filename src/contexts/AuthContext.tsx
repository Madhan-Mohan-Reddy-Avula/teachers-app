
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Faculty {
  id: string;
  email: string;
  name: string;
  department: string;
  subject: string;
  school_id: string;
  phone?: string;
}

interface AuthContextType {
  faculty: Faculty | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const email = localStorage.getItem('faculty_email');
      if (email) {
        await loadFacultyProfile(email);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFacultyProfile = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('faculty')
        .select('*')
        .eq('email', email)
        .single();

      if (error) throw error;
      setFaculty(data);
    } catch (error) {
      console.error('Error loading faculty profile:', error);
      localStorage.removeItem('faculty_email');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Hash the password using the same method as stored
      const { data: hashResult, error: hashError } = await supabase
        .rpc('hash_password', { password });

      if (hashError) throw hashError;

      // Check faculty credentials in faculty_profiles table
      const { data: facultyProfile, error: profileError } = await supabase
        .from('faculty_profiles')
        .select('*')
        .eq('email', email)
        .eq('password_hash', hashResult)
        .single();

      if (profileError || !facultyProfile) {
        return { error: 'Invalid email or password' };
      }

      // Get the full faculty data using the faculty_id
      const { data: facultyData, error: facultyError } = await supabase
        .from('faculty')
        .select('*')
        .eq('id', facultyProfile.faculty_id)
        .single();

      if (facultyError || !facultyData) {
        return { error: 'Faculty profile not found' };
      }

      // Store email in localStorage and set faculty data
      localStorage.setItem('faculty_email', email);
      setFaculty(facultyData);
      
      return {};
    } catch (error) {
      console.error('Login error:', error);
      return { error: 'Login failed' };
    }
  };

  const logout = async () => {
    localStorage.removeItem('faculty_email');
    setFaculty(null);
  };

  return (
    <AuthContext.Provider value={{ faculty, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
