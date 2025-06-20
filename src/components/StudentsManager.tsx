
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  status: "active" | "transferred";
  parentContact: string;
}

export function StudentsManager() {
  const [students, setStudents] = useState<Student[]>([
    { id: "1", name: "Alice Johnson", grade: "10", section: "A", status: "active", parentContact: "555-0101" },
    { id: "2", name: "Bob Smith", grade: "10", section: "B", status: "active", parentContact: "555-0102" },
    { id: "3", name: "Carol Davis", grade: "9", section: "A", status: "transferred", parentContact: "555-0103" },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    grade: "",
    section: "",
    parentContact: "",
  });

  const handleAddStudent = () => {
    const student: Student = {
      id: Date.now().toString(),
      ...newStudent,
      status: "active",
    };
    setStudents([...students, student]);
    setNewStudent({ name: "", grade: "", section: "", parentContact: "" });
    setIsDialogOpen(false);
  };

  const handleTransferStudent = (studentId: string) => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, status: "transferred" }
        : student
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="h-8 w-8 text-blue-600" />
          Students Management
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">Add New Student</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Student Name</Label>
                <Input
                  id="name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="Enter student name"
                />
              </div>
              <div>
                <Label htmlFor="grade">Grade</Label>
                <Select onValueChange={(value) => setNewStudent({ ...newStudent, grade: value })}>
                  <SelectTrigger>
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
                <Label htmlFor="section">Section</Label>
                <Select onValueChange={(value) => setNewStudent({ ...newStudent, section: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="contact">Parent Contact</Label>
                <Input
                  id="contact"
                  value={newStudent.parentContact}
                  onChange={(e) => setNewStudent({ ...newStudent, parentContact: e.target.value })}
                  placeholder="Enter parent contact"
                />
              </div>
              <Button onClick={handleAddStudent} className="w-full">Add Student</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Grade</th>
                  <th className="text-left p-3">Section</th>
                  <th className="text-left p-3">Parent Contact</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{student.name}</td>
                    <td className="p-3">Grade {student.grade}</td>
                    <td className="p-3">Section {student.section}</td>
                    <td className="p-3">{student.parentContact}</td>
                    <td className="p-3">
                      <Badge variant={student.status === "active" ? "default" : "secondary"}>
                        {student.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      {student.status === "active" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTransferStudent(student.id)}
                        >
                          Transfer
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
