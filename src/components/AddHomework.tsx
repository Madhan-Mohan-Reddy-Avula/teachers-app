
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Book } from "lucide-react";

interface AddHomeworkProps {
  onBack: () => void;
}

export function AddHomework({ onBack }: AddHomeworkProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    grade: "",
    dueDate: "",
    description: "",
    priority: "medium",
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
        .from('homework_assignments')
        .insert({
          title: formData.title,
          subject: formData.subject,
          description: formData.description,
          due_date: formData.dueDate,
          priority: formData.priority,
          status: 'pending',
          school_id: schoolId,
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Homework assignment created successfully.",
      });

      // Reset form
      setFormData({
        title: "",
        subject: "",
        grade: "",
        dueDate: "",
        description: "",
        priority: "medium",
      });
    } catch (error) {
      console.error("Error adding homework:", error);
      toast({
        title: "Error",
        description: "Failed to create homework assignment. Please try again.",
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
          <Book className="h-8 w-8" />
          Add New Homework
        </h1>
      </div>

      <Card className="card-3d">
        <CardHeader>
          <CardTitle className="text-[#5D916A]">Homework Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-[#5D916A]">Assignment Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter assignment title"
                required
                className="border-[#7ED6A7] focus:border-[#5D916A]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="grade" className="text-[#5D916A]">Grade</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, grade: value })}>
                  <SelectTrigger className="border-[#7ED6A7] focus:border-[#5D916A]">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9">Grade 9</SelectItem>
                    <SelectItem value="10">Grade 10</SelectItem>
                    <SelectItem value="11">Grade 11</SelectItem>
                    <SelectItem value="12">Grade 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dueDate" className="text-[#5D916A]">Due Date</Label>
                <Input
                  id="dueDate"
                  type="datetime-local"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  required
                  className="border-[#7ED6A7] focus:border-[#5D916A]"
                />
              </div>
              <div>
                <Label htmlFor="priority" className="text-[#5D916A]">Priority</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                  <SelectTrigger className="border-[#7ED6A7] focus:border-[#5D916A]">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description" className="text-[#5D916A]">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter homework description and instructions"
                rows={4}
                className="border-[#7ED6A7] focus:border-[#5D916A]"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7ED6A7] hover:bg-[#5D916A] text-white font-semibold"
            >
              {loading ? "Creating Assignment..." : "Create Assignment"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
