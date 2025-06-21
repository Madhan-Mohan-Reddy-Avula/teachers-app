
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import { AddEvent } from "./AddEvent";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: "academic" | "extracurricular" | "meeting";
}

export function EventsManager() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Parent-Teacher Meeting",
      date: "2024-01-25",
      time: "14:00",
      location: "School Auditorium",
      description: "Monthly parent-teacher conference",
      type: "meeting"
    },
    {
      id: "2",
      title: "Science Fair",
      date: "2024-02-01",
      time: "09:00",
      location: "Science Lab",
      description: "Annual science exhibition",
      type: "academic"
    }
  ]);

  if (showAddForm) {
    return <AddEvent onBack={() => setShowAddForm(false)} />;
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "academic": return "bg-blue-100 text-blue-800";
      case "extracurricular": return "bg-green-100 text-green-800";
      case "meeting": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#5D916A] flex items-center gap-2">
          <Calendar className="h-8 w-8" />
          Events Management
        </h1>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-[#7ED6A7] hover:bg-[#5D916A] text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="card-3d hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg text-[#5D916A]">{event.title}</CardTitle>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                  {event.type}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-[#5D916A]"><strong>Date:</strong> {event.date}</p>
                <p className="text-[#5D916A]"><strong>Time:</strong> {event.time}</p>
                <p className="text-[#5D916A]"><strong>Location:</strong> {event.location}</p>
                <p className="text-[#5D916A]"><strong>Description:</strong> {event.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
