
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

interface Result {
  id: string;
  studentName: string;
  subject: string;
  grade: string;
  examType: string;
  score: number;
  maxScore: number;
  date: string;
}

export function ResultsManager() {
  const [results, setResults] = useState<Result[]>([
    {
      id: "1",
      studentName: "Alice Johnson",
      subject: "Mathematics",
      grade: "10",
      examType: "Mid-term",
      score: 85,
      maxScore: 100,
      date: "2024-01-10"
    },
    {
      id: "2",
      studentName: "Bob Smith",
      subject: "English",
      grade: "10",
      examType: "Quiz",
      score: 92,
      maxScore: 100,
      date: "2024-01-12"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newResult, setNewResult] = useState({
    studentName: "",
    subject: "",
    grade: "",
    examType: "",
    score: "",
    maxScore: "",
    date: "",
  });

  const handleAddResult = () => {
    const result: Result = {
      id: Date.now().toString(),
      ...newResult,
      score: Number(newResult.score),
      maxScore: Number(newResult.maxScore),
    };
    setResults([...results, result]);
    setNewResult({ studentName: "", subject: "", grade: "", examType: "", score: "", maxScore: "", date: "" });
    setIsDialogOpen(false);
  };

  const getGradeColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return "bg-green-100 text-green-800";
    if (percentage >= 80) return "bg-blue-100 text-blue-800";
    if (percentage >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Trophy className="h-8 w-8 text-yellow-600" />
          Results Management
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-600 hover:bg-yellow-700">Add Result</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Result</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  id="studentName"
                  value={newResult.studentName}
                  onChange={(e) => setNewResult({ ...newResult, studentName: e.target.value })}
                  placeholder="Enter student name"
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={newResult.subject}
                  onChange={(e) => setNewResult({ ...newResult, subject: e.target.value })}
                  placeholder="Enter subject"
                />
              </div>
              <div>
                <Label htmlFor="grade">Grade</Label>
                <Select onValueChange={(value) => setNewResult({ ...newResult, grade: value })}>
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
                <Label htmlFor="examType">Exam Type</Label>
                <Select onValueChange={(value) => setNewResult({ ...newResult, examType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Quiz">Quiz</SelectItem>
                    <SelectItem value="Mid-term">Mid-term</SelectItem>
                    <SelectItem value="Final">Final</SelectItem>
                    <SelectItem value="Assignment">Assignment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="score">Score</Label>
                  <Input
                    id="score"
                    type="number"
                    value={newResult.score}
                    onChange={(e) => setNewResult({ ...newResult, score: e.target.value })}
                    placeholder="Score"
                  />
                </div>
                <div>
                  <Label htmlFor="maxScore">Max Score</Label>
                  <Input
                    id="maxScore"
                    type="number"
                    value={newResult.maxScore}
                    onChange={(e) => setNewResult({ ...newResult, maxScore: e.target.value })}
                    placeholder="Max Score"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newResult.date}
                  onChange={(e) => setNewResult({ ...newResult, date: e.target.value })}
                />
              </div>
              <Button onClick={handleAddResult} className="w-full">Add Result</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Student</th>
                  <th className="text-left p-3">Subject</th>
                  <th className="text-left p-3">Grade</th>
                  <th className="text-left p-3">Exam Type</th>
                  <th className="text-left p-3">Score</th>
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Performance</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{result.studentName}</td>
                    <td className="p-3">{result.subject}</td>
                    <td className="p-3">Grade {result.grade}</td>
                    <td className="p-3">{result.examType}</td>
                    <td className="p-3">{result.score}/{result.maxScore}</td>
                    <td className="p-3">{result.date}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(result.score, result.maxScore)}`}>
                        {Math.round((result.score / result.maxScore) * 100)}%
                      </span>
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
