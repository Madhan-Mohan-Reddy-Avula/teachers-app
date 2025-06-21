
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, UserPlus } from "lucide-react";

interface AddStudentProps {
  onBack: () => void;
}

export function AddStudent({ onBack }: AddStudentProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    department: "",
    year: "1",
    phone: "",
    class: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get the first school_id for demo purposes
      const { data: schools } = await supabase
        .from('schools')
        .select('id')
        .limit(1);

      const schoolId = schools?.[0]?.id;

      const { error } = await supabase
        .from('profiles')
        .insert({
          name: formData.name,
          email: formData.email,
          roll_number: formData.rollNumber,
          department: formData.department,
          year: parseInt(formData.year),
          phone: formData.phone,
          school_id: schoolId,
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Student added successfully.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        rollNumber: "",
        department: "",
        year: "1",
        phone: "",
        class: "",
      });
    } catch (error) {
      console.error("Error adding student:", error);
      toast({
        title: "Error",
        description: "Failed to add student. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-[#5D916A] flex items-center gap-2">
          <UserPlus className="h-8 w-8" />
          Add New Student
        </h1>
      </div>

      <Card className="card-3d">
        <CardHeader>
          <CardTitle className="text-[#5D916A]">Student Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-[#5D916A]">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter student name"
                  required
                  className="border-[#7ED6A7] focus:border-[#5D916A]"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-[#5D916A]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter student email"
                  required
                  className="border-[#7ED6A7] focus:border-[#5D916A]"
                />
              </div>
              <div>
                <Label htmlFor="rollNumber" className="text-[#5D916A]">Roll Number</Label>
                <Input
                  id="rollNumber"
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  placeholder="Enter roll number"
                  required
                  className="border-[#7ED6A7] focus:border-[#5D916A]"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-[#5D916A]">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="border-[#7ED6A7] focus:border-[#5D916A]"
                />
              </div>
              <div>
                <Label htmlFor="department" className="text-[#5D916A]">Department</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, department: value })}>
                  <SelectTrigger className="border-[#7ED6A7] focus:border-[#5D916A]">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Geography">Geography</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="year" className="text-[#5D916A]">Year</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, year: value })}>
                  <SelectTrigger className="border-[#7ED6A7] focus:border-[#5D916A]">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Year 1</SelectItem>
                    <SelectItem value="2">Year 2</SelectItem>
                    <SelectItem value="3">Year 3</SelectItem>
                    <SelectItem value="4">Year 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7ED6A7] hover:bg-[#5D916A] text-white font-semibold"
            >
              {loading ? "Adding Student..." : "Add Student"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
