
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, BookOpen, Calendar, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface SchoolStats {
  totalStudents: number;
  totalEvents: number;
  totalHomework: number;
  totalResults: number;
}

export function ProfilePage() {
  const { faculty, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<SchoolStats>({
    totalStudents: 0,
    totalEvents: 0,
    totalHomework: 0,
    totalResults: 0,
  });

  useEffect(() => {
    if (faculty?.school_id) {
      fetchSchoolStats();
    }
  }, [faculty]);

  const fetchSchoolStats = async () => {
    if (!faculty?.school_id) return;

    try {
      // Fetch students count
      const { count: studentsCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('school_id', faculty.school_id);

      // Fetch events count
      const { count: eventsCount } = await supabase
        .from('school_events')
        .select('*', { count: 'exact', head: true })
        .eq('school_id', faculty.school_id);

      // Fetch homework count
      const { count: homeworkCount } = await supabase
        .from('homework_assignments')
        .select('*', { count: 'exact', head: true })
        .eq('school_id', faculty.school_id);

      // Fetch results count
      const { count: resultsCount } = await supabase
        .from('student_results')
        .select('*', { count: 'exact', head: true })
        .eq('school_id', faculty.school_id);

      setStats({
        totalStudents: studentsCount || 0,
        totalEvents: eventsCount || 0,
        totalHomework: homeworkCount || 0,
        totalResults: resultsCount || 0,
      });
    } catch (error) {
      console.error('Error fetching school stats:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!faculty) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8E4BE] to-[#7ED6A7] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <Button 
            onClick={handleLogout}
            variant="destructive"
          >
            Logout
          </Button>
        </div>

        {/* Profile Header */}
        <Card className="card-3d mb-8">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7ED6A7] to-[#5D916A] flex items-center justify-center text-white text-xl font-bold">
                {faculty.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <CardTitle className="text-2xl text-[#5D916A]">{faculty.name}</CardTitle>
                <p className="text-[#5D916A]/70">{faculty.email}</p>
                <div className="flex gap-2 mt-2">
                  <Badge className="bg-[#7ED6A7] text-white">{faculty.department}</Badge>
                  <Badge variant="outline" className="border-[#7ED6A7] text-[#5D916A]">{faculty.subject}</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[#5D916A]/70">Department</p>
                <p className="font-semibold text-[#5D916A]">{faculty.department}</p>
              </div>
              <div>
                <p className="text-sm text-[#5D916A]/70">Subject</p>
                <p className="font-semibold text-[#5D916A]">{faculty.subject}</p>
              </div>
              {faculty.phone && (
                <div>
                  <p className="text-sm text-[#5D916A]/70">Phone</p>
                  <p className="font-semibold text-[#5D916A]">{faculty.phone}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* School Statistics */}
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="text-xl text-[#5D916A]">School Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#7ED6A7] flex items-center justify-center mx-auto mb-2">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-[#5D916A]">{stats.totalStudents}</p>
                <p className="text-sm text-[#5D916A]/70">Students</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#84D6A7] flex items-center justify-center mx-auto mb-2">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-[#5D916A]">{stats.totalEvents}</p>
                <p className="text-sm text-[#5D916A]/70">Events</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#F0B7B7] flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-[#5D916A]">{stats.totalHomework}</p>
                <p className="text-sm text-[#5D916A]/70">Homework</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#7ED6A7] flex items-center justify-center mx-auto mb-2">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-[#5D916A]">{stats.totalResults}</p>
                <p className="text-sm text-[#5D916A]/70">Results</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
