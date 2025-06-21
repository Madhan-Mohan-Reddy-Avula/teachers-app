
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book, Plus } from "lucide-react";
import { AddHomework } from "./AddHomework";

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
  const [showAddForm, setShowAddForm] = useState(false);
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

  if (showAddForm) {
    return <AddHomework onBack={() => setShowAddForm(false)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#5D916A] flex items-center gap-2">
          <Book className="h-8 w-8" />
          Homework Management
        </h1>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-[#7ED6A7] hover:bg-[#5D916A] text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Homework
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {homework.map((item) => (
          <Card key={item.id} className="card-3d hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg text-[#5D916A]">{item.title}</CardTitle>
                <Badge variant={item.status === "active" ? "default" : "secondary"} className="bg-[#7ED6A7] text-white">
                  {item.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-[#5D916A]"><strong>Subject:</strong> {item.subject}</p>
                <p className="text-[#5D916A]"><strong>Grade:</strong> {item.grade}</p>
                <p className="text-[#5D916A]"><strong>Due Date:</strong> {item.dueDate}</p>
                <p className="text-[#5D916A]"><strong>Description:</strong> {item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
