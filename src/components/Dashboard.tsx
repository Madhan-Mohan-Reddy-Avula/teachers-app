
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, BookOpen, Award, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();

  const quickActions = [
    { 
      title: "Add Event", 
      icon: Calendar, 
      description: "Create new school events",
      onClick: () => navigate("/add-event")
    },
    { 
      title: "Add Homework", 
      icon: BookOpen, 
      description: "Assign new homework",
      onClick: () => navigate("/add-homework")
    },
    { 
      title: "Add Result", 
      icon: Award, 
      description: "Record student results",
      onClick: () => navigate("/add-result")
    },
    { 
      title: "Add Student", 
      icon: Users, 
      description: "Register new students",
      onClick: () => navigate("/add-student")
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#5D916A]">Dashboard</h1>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Card key={index} className="card-3d hover:shadow-lg transition-shadow cursor-pointer" onClick={action.onClick}>
              <CardHeader className="text-center">
                <Icon className="h-12 w-12 text-[#7ED6A7] mx-auto mb-2" />
                <CardTitle className="text-lg text-[#5D916A]">{action.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-[#5D916A] text-sm mb-4">{action.description}</p>
                <Button className="w-full bg-[#7ED6A7] hover:bg-[#5D916A] text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Now
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="text-[#5D916A] flex items-center gap-2">
              <Users className="h-5 w-5" />
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#7ED6A7]">1,234</p>
            <p className="text-[#5D916A] text-sm">Active students</p>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="text-[#5D916A] flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Pending Homework
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#F0B7B7]">23</p>
            <p className="text-[#5D916A] text-sm">Assignments due</p>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="text-[#5D916A] flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#84D6A7]">8</p>
            <p className="text-[#5D916A] text-sm">This month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
