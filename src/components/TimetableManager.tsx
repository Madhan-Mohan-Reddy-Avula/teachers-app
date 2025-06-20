
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock } from "lucide-react";

interface TimetableSlot {
  id: string;
  day: string;
  time: string;
  subject: string;
  grade: string;
  section: string;
  room: string;
}

export function TimetableManager() {
  const [timetable, setTimetable] = useState<TimetableSlot[]>([
    {
      id: "1",
      day: "Monday",
      time: "08:00-09:00",
      subject: "Mathematics",
      grade: "10",
      section: "A",
      room: "Room 101"
    },
    {
      id: "2",
      day: "Monday",
      time: "09:00-10:00",
      subject: "English",
      grade: "10",
      section: "A",
      room: "Room 102"
    },
    {
      id: "3",
      day: "Tuesday",
      time: "08:00-09:00",
      subject: "Science",
      grade: "10",
      section: "A",
      room: "Science Lab"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSlot, setNewSlot] = useState({
    day: "",
    time: "",
    subject: "",
    grade: "",
    section: "",
    room: "",
  });

  const handleAddSlot = () => {
    const slot: TimetableSlot = {
      id: Date.now().toString(),
      ...newSlot,
    };
    setTimetable([...timetable, slot]);
    setNewSlot({ day: "", time: "", subject: "", grade: "", section: "", room: "" });
    setIsDialogOpen(false);
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = ["08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-12:00", "13:00-14:00", "14:00-15:00"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Clock className="h-8 w-8 text-orange-600" />
          Timetable Management
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">Add Time Slot</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Time Slot</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="day">Day</Label>
                <Select onValueChange={(value) => setNewSlot({ ...newSlot, day: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Select onValueChange={(value) => setNewSlot({ ...newSlot, time: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={newSlot.subject}
                  onChange={(e) => setNewSlot({ ...newSlot, subject: e.target.value })}
                  placeholder="Enter subject"
                />
              </div>
              <div>
                <Label htmlFor="grade">Grade</Label>
                <Select onValueChange={(value) => setNewSlot({ ...newSlot, grade: value })}>
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
                <Select onValueChange={(value) => setNewSlot({ ...newSlot, section: value })}>
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
                <Label htmlFor="room">Room</Label>
                <Input
                  id="room"
                  value={newSlot.room}
                  onChange={(e) => setNewSlot({ ...newSlot, room: e.target.value })}
                  placeholder="Enter room number"
                />
              </div>
              <Button onClick={handleAddSlot} className="w-full">Add Time Slot</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Timetable</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-3 text-left">Time</th>
                  {days.map((day) => (
                    <th key={day} className="border border-gray-300 p-3 text-left">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time) => (
                  <tr key={time}>
                    <td className="border border-gray-300 p-3 font-medium bg-gray-50">{time}</td>
                    {days.map((day) => {
                      const slot = timetable.find(s => s.day === day && s.time === time);
                      return (
                        <td key={day} className="border border-gray-300 p-3">
                          {slot && (
                            <div className="text-sm">
                              <div className="font-medium">{slot.subject}</div>
                              <div className="text-gray-600">Grade {slot.grade}{slot.section}</div>
                              <div className="text-gray-500">{slot.room}</div>
                            </div>
                          )}
                        </td>
                      );
                    })}
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
