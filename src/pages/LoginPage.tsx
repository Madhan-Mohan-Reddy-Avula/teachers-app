
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await login(email, password);
      
      if (error) {
        toast({
          title: "Login Failed",
          description: error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8E4BE] to-[#7ED6A7] p-4">
      <Card className="w-full max-w-md card-3d">
        <CardHeader className="text-center">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#7ED6A7] to-[#5D916A] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <img 
              src="/lovable-uploads/f335eb3b-5a51-4fb6-b14f-493524b71168.png" 
              alt="Schools App" 
              className="w-10 h-10 logo-3d"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-[#5D916A]">Faculty Login</CardTitle>
          <p className="text-[#5D916A]/70">Sign in to your teaching dashboard</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#5D916A]">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-[#7ED6A7] focus:border-[#5D916A]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#5D916A]">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-[#7ED6A7] focus:border-[#5D916A]"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#7ED6A7] hover:bg-[#5D916A] text-white"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-[#5D916A]/70">
            Demo credentials: Use any faculty email with password "password123"
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
