
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Trophy } from "lucide-react";

interface AddResultProps {
  onBack: () => void;
}

export function AddResult({ onBack }: AddResultProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    subject: "",
    examType: "",
    score: "",
    maxScore: "100",
    examDate: "",
    grade: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get the first school_id for demo purposes (in real app, get from user's profile)
      const { data: schools } = await supabase
        .from('schools')
        .select('id')
        .limit(1);

      const schoolId = schools?.[0]?.id;

      const { error } = await supabase
        .from('results')
        .insert({
          student_id: crypto.randomUUID(), // In real app, select from actual students
          exam_id: crypto.randomUUID(), // In real app, select from actual exams
          score: parseFloat(formData.score),
          grade: formData.grade,
          school_id: schoolId,
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Result added successfully.",
      });

      // Reset form
      setFormData({
        studentName: "",
        subject: "",
        examType: "",
        score: "",
        maxScore: "100",
        examDate: "",
        grade: "",
      });
    } catch (error) {
      console.error("Error adding result:", error);
      toast({
        title: "Error",
        description: "Failed to add result. Please try again.",
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
          <Trophy className="h-8 w-8" />
          Add New Result
        </h1>
      </div>

      <Card className="card-3d">
        <CardHeader>
          <CardTitle className="text-[#5D916A]">Result Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentName" className="text-[#5D916A]">Student Name</Label>
                <Input
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="Enter student name"
                  required
                  className="border-[#7ED6A7] focus:border-[#5D916A]"
                />
              </div>
              <div>
                <Label htmlFor="subject" className="text-[#5D916A]">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Enter subject"
                  required
                  className="border-[#7ED6A7] focus:border-[#5D916A]"
                />
              </div>
              <div>
                <Label htmlFor="examType" className="text-[#5D916A]">Exam Type</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, examType: value })}>
                  <SelectTrigger className="border-[#7ED6A7] focus:border-[#5D916A]">
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="midterm">Mid-term</SelectItem>
                    <SelectItem value="final">Final</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="examDate" className="text-[#5D916A]">Exam Date</Label>
                <Input
                  id="examDate"
                  type="date"
                  value={formData.examDate}
                  onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                  required
                  className="border-[#7ED6A7] focus:border-[#5D916A]"
                />
              </div>
              <div>
                <Label htmlFor="score" className="text-[#5D916A]">Score</Label>
                <Input
                  id="score"
                  type="number"
                  value={formData.score}
                  onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                  placeholder="Enter score"
                  required
                  className="border-[#7ED6A7] focus:border-[#5D916A]"
                />
              </div>
              <div>
                <Label htmlFor="maxScore" className="text-[#5D916A]">Max Score</Label>
                <Input
                  id="maxScore"
                  type="number"
                  value={formData.maxScore}
                  onChange={(e) => setFormData({ ...formData, maxScore: e.target.value })}
                  placeholder="Enter max score"
                  required
                  className="border-[#7ED6A7] focus:border-[#5D916A]"
                />
              </div>
              <div>
                <Label htmlFor="grade" className="text-[#5D916A]">Grade</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, grade: value })}>
                  <SelectTrigger className="border-[#7ED6A7] focus:border-[#5D916A]">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C+">C+</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="D">D</SelectItem>
                    <SelectItem value="F">F</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7ED6A7] hover:bg-[#5D916A] text-white font-semibold"
            >
              {loading ? "Adding Result..." : "Add Result"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
