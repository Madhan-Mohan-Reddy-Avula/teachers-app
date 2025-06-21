
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Class {
  id: string;
  name: string;
  section: string;
  year: number;
}

interface Student {
  id: string;
  name: string;
  email: string;
  roll_number: string;
  phone: string;
  department: string;
  year: number;
}

interface StudentsByClassProps {
  onBack: () => void;
}

export function StudentsByClass({ onBack }: StudentsByClassProps) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .order('year', { ascending: true });

      if (error) throw error;
      setClasses(data || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch classes",
        variant: "destructive",
      });
    }
  };

  const fetchStudentsByClass = async (classId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('class_id', classId)
        .order('name', { ascending: true });

      if (error) throw error;
      setStudents(data || []);
      
      toast({
        title: "Success",
        description: `Found ${data?.length || 0} students in the selected class`,
      });
    } catch (error) {
      console.error('Error fetching students:', error);
      toast({
        title: "Error",
        description: "Failed to fetch students",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClassSelect = (classId: string) => {
    setSelectedClassId(classId);
    fetchStudentsByClass(classId);
  };

  const selectedClass = classes.find(c => c.id === selectedClassId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#5D916A] flex items-center gap-2">
          <Users className="h-8 w-8" />
          Students by Class
        </h1>
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      {/* Class Selection */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle className="text-[#5D916A]">Select a Class</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={handleClassSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a class to view students" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              {classes.map((classItem) => (
                <SelectItem key={classItem.id} value={classItem.id}>
                  {classItem.name} - Section {classItem.section} (Year {classItem.year})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Students List */}
      {selectedClassId && (
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="text-[#5D916A] flex items-center justify-between">
              <span>
                Students in {selectedClass?.name} - Section {selectedClass?.section}
              </span>
              <Badge variant="secondary" className="bg-[#7ED6A7] text-white">
                {students.length} Students
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="text-[#5D916A]">Loading students...</div>
              </div>
            ) : students.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-[#5D916A]">No students found in this class</div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-[#7ED6A7]">
                      <th className="text-left p-3 text-[#5D916A] font-semibold">Roll Number</th>
                      <th className="text-left p-3 text-[#5D916A] font-semibold">Name</th>
                      <th className="text-left p-3 text-[#5D916A] font-semibold">Email</th>
                      <th className="text-left p-3 text-[#5D916A] font-semibold">Department</th>
                      <th className="text-left p-3 text-[#5D916A] font-semibold">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-[#F8E4BE] transition-colors">
                        <td className="p-3 font-medium text-[#5D916A]">{student.roll_number}</td>
                        <td className="p-3 text-[#5D916A]">{student.name}</td>
                        <td className="p-3 text-[#5D916A]">{student.email}</td>
                        <td className="p-3 text-[#5D916A]">{student.department}</td>
                        <td className="p-3 text-[#5D916A]">{student.phone || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
