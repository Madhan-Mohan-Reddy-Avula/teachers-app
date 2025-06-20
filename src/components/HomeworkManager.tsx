
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Book } from "lucide-react";

interface Homework {
  id: string;
  title: string;
  subject: string;
  grade: string;
  dueDate: string;
  description: string;
  status: "active" | "completed";
}

export function HomeworkManager() {
  const [homework, setHomework] = useState<Homework[]>([
    {
      id: "1",
      title: "Math Assignment 5",
      subject: "Mathematics",
      grade: "10",
      dueDate: "2024-01-15",
      description: "Complete exercises 1-20 from chapter 5",
      status: "active"
    },
    {
      id: "2",
      title: "History Essay",
      subject: "History",
      grade: "10",
      dueDate: "2024-01-20",
      description: "Write a 500-word essay on World War II",
      status: "active"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newHomework, setNewHomework] = useState({
    title: "",
    subject: "",
    grade: "",
    dueDate: "",
    description: "",
  });

  const handleAddHomework = () => {
    const homework_item: Homework = {
      id: Date.now().toString(),
      ...newHomework,
      status: "active",
    };
    setHomework([...homework, homework_item]);
    setNewHomework({ title: "", subject: "", grade: "", dueDate: "", description: "" });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Book className="h-8 w-8 text-green-600" />
          Homework Management
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">Create Homework</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Homework</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newHomework.title}
                  onChange={(e) => setNewHomework({ ...newHomework, title: e.target.value })}
                  placeholder="Enter homework title"
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={newHomework.subject}
                  onChange={(e) => setNewHomework({ ...newHomework, subject: e.target.value })}
                  placeholder="Enter subject"
                />
              </div>
              <div>
                <Label htmlFor="grade">Grade</Label>
                <Select onValueChange={(value) => setNewHomework({ ...newHomework, grade: value })}>
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
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newHomework.dueDate}
                  onChange={(e) => setNewHomework({ ...newHomework, dueDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newHomework.description}
                  onChange={(e) => setNewHomework({ ...newHomework, description: e.target.value })}
                  placeholder="Enter homework description"
                />
              </div>
              <Button onClick={handleAddHomework} className="w-full">Create Homework</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {homework.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <Badge variant={item.status === "active" ? "default" : "secondary"}>
                  {item.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Subject:</strong> {item.subject}</p>
                <p><strong>Grade:</strong> {item.grade}</p>
                <p><strong>Due Date:</strong> {item.dueDate}</p>
                <p><strong>Description:</strong> {item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
