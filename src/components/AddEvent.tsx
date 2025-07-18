import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface AddEventProps {
  onBack: () => void;
}

export function AddEvent({ onBack }: AddEventProps) {
  const { toast } = useToast();
  const { faculty } = useAuth(); // ✅ get current faculty (to retrieve school_id)
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    eventType: "general",
    category: "",
    eventDate: "",
    startTime: "",
    endDate: "",
    location: "",
    description: "",
    isMandatory: false,
    isFeatured: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Check if school_id exists
      const schoolId = faculty?.school_id;
      if (!schoolId) {
        toast({
          title: "Missing School ID",
          description: "Cannot associate event without a school.",
          variant: "destructive",
        });
        return;
      }

      // ✅ Sanitize time inputs
      const payload = {
        title: formData.title,
        event_type: formData.eventType,
        category: formData.category || null,
        event_date: formData.eventDate,
        start_time: formData.startTime || null,
        end_date: formData.endDate || null,
        location: formData.location || null,
        description: formData.description || null,
        is_mandatory: formData.isMandatory,
        is_featured: formData.isFeatured,
        school_id: schoolId,
      };

      const { error } = await supabase.from("school_events").insert([payload]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Event created successfully.",
      });

      // Reset form
      setFormData({
        title: "",
        eventType: "general",
        category: "",
        eventDate: "",
        startTime: "",
        endDate: "",
        location: "",
        description: "",
        isMandatory: false,
        isFeatured: false,
      });

      onBack(); // ⬅️ Go back to event manager
    } catch (error: any) {
      console.error("Error adding event:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create event.",
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
          <Calendar className="h-8 w-8" />
          Add New Event
        </h1>
      </div>

      <Card className="card-3d">
        <CardHeader>
          <CardTitle className="text-[#5D916A]">Event Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-[#5D916A]">
                Event Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter event title"
                required
                className="border-[#7ED6A7] focus:border-[#5D916A]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventType" className="text-[#5D916A]">
                  Event Type
                </Label>
                <Select
                  value={formData.eventType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, eventType: value })
                  }
                >
                  <SelectTrigger className="border-[#7ED6A7] focus:border-[#5D916A]">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="exam">Exam</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category" className="text-[#5D916A]">
                  Category
                </Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="Optional event category"
                  className="border-[#7ED6A7] focus:border-[#5D916A]"
                />
              </div>

              <div>
                <Label htmlFor="eventDate" className="text-[#5D916A]">
                  Event Date & Time
                </Label>
                <Input
                  id="eventDate"
                  type="datetime-local"
                  value={formData.eventDate}
                  onChange={(e) =>
                    setFormData({ ...formData, eventDate: e.target.value })
                  }
                  required
                  className="border-[#7ED6A7] focus:border-[#5D916A]"
                />
              </div>

              <div>
                <Label htmlFor="startTime" className="text-[#5D916A]">
                  Start Time (Optional)
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  className="border-[#7ED6A7] focus:border-[#5D916A]"
                />
              </div>

              <div>
                <Label htmlFor="endDate" className="text-[#5D916A]">
                  End Date & Time (Optional)
                </Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className="border-[#7ED6A7] focus:border-[#5D916A]"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="location" className="text-[#5D916A]">
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Enter event location"
                  className="border-[#7ED6A7] focus:border-[#5D916A]"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-[#5D916A]">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe the event"
                rows={4}
                className="border-[#7ED6A7] focus:border-[#5D916A]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isMandatory"
                  checked={formData.isMandatory}
                  onChange={(e) =>
                    setFormData({ ...formData, isMandatory: e.target.checked })
                  }
                />
                <Label htmlFor="isMandatory" className="text-[#5D916A]">
                  Mandatory Event
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    setFormData({ ...formData, isFeatured: e.target.checked })
                  }
                />
                <Label htmlFor="isFeatured" className="text-[#5D916A]">
                  Featured Event
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7ED6A7] hover:bg-[#5D916A] text-white font-semibold"
            >
              {loading ? "Creating Event..." : "Create Event"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
