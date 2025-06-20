
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Book, Calendar, Trophy } from "lucide-react";

export function Dashboard() {
  const stats = [
    { title: "Total Students", value: "248", icon: Users, color: "text-blue-600" },
    { title: "Active Homework", value: "12", icon: Book, color: "text-green-600" },
    { title: "Upcoming Events", value: "5", icon: Calendar, color: "text-purple-600" },
    { title: "Results Added", value: "156", icon: Trophy, color: "text-orange-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm">New student "Sarah Johnson" added to Grade 10A</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm">Homework "Math Assignment 5" submitted by 23 students</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <p className="text-sm">Parent-Teacher meeting scheduled for next Friday</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                <div className="font-medium">Add New Student</div>
                <div className="text-sm text-gray-600">Register a new student to the system</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                <div className="font-medium">Create Homework</div>
                <div className="text-sm text-gray-600">Assign new homework to students</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                <div className="font-medium">Schedule Event</div>
                <div className="text-sm text-gray-600">Add a new event to the calendar</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
