
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Plus } from "lucide-react";
import { AddResult } from "./AddResult";

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
  const [showAddForm, setShowAddForm] = useState(false);
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

  if (showAddForm) {
    return <AddResult onBack={() => setShowAddForm(false)} />;
  }

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
        <h1 className="text-3xl font-bold text-[#5D916A] flex items-center gap-2">
          <Trophy className="h-8 w-8" />
          Results Management
        </h1>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-[#7ED6A7] hover:bg-[#5D916A] text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Result
        </Button>
      </div>

      <Card className="card-3d">
        <CardHeader>
          <CardTitle className="text-[#5D916A]">Student Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#7ED6A7]">
                  <th className="text-left p-3 text-[#5D916A]">Student</th>
                  <th className="text-left p-3 text-[#5D916A]">Subject</th>
                  <th className="text-left p-3 text-[#5D916A]">Grade</th>
                  <th className="text-left p-3 text-[#5D916A]">Exam Type</th>
                  <th className="text-left p-3 text-[#5D916A]">Score</th>
                  <th className="text-left p-3 text-[#5D916A]">Date</th>
                  <th className="text-left p-3 text-[#5D916A]">Performance</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.id} className="border-b border-[#F8E4BE] hover:bg-[#F8E4BE]/30">
                    <td className="p-3 font-medium text-[#5D916A]">{result.studentName}</td>
                    <td className="p-3 text-[#5D916A]">{result.subject}</td>
                    <td className="p-3 text-[#5D916A]">Grade {result.grade}</td>
                    <td className="p-3 text-[#5D916A]">{result.examType}</td>
                    <td className="p-3 text-[#5D916A]">{result.score}/{result.maxScore}</td>
                    <td className="p-3 text-[#5D916A]">{result.date}</td>
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
