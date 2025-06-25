import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const result = await login(cleanEmail, ''); // password param if needed

      if (result.error) {
        toast({
          title: 'Login Failed',
          description: result.error,
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      toast({
        title: 'Login Successful',
        description: `Welcome back!`,
      });

      console.log('Navigating to home page...');
      navigate('/'); // this should navigate now
    } catch (err) {
      console.error('Login error:', err);
      toast({
        title: 'Error',
        description: 'Unexpected error occurred during login.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8E4BE] to-[#7ED6A7] p-4">
      <Card className="w-full max-w-md card-3d">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#5D916A]">Faculty Login</CardTitle>
          <p className="text-[#5D916A]/70">Sign in using your registered email</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#5D916A]">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your faculty email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            Use your registered email to access the dashboard.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
