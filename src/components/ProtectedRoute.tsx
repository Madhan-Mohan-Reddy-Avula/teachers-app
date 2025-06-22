
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginPage } from '@/pages/LoginPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { faculty, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8E4BE] to-[#7ED6A7]">
        <div className="text-[#5D916A] text-xl">Loading...</div>
      </div>
    );
  }

  if (!faculty) {
    return <LoginPage />;
  }

  return <>{children}</>;
}
