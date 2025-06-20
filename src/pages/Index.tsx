
import { useState } from "react";
import { TeacherSidebar } from "@/components/TeacherSidebar";
import { Dashboard } from "@/components/Dashboard";
import { StudentsManager } from "@/components/StudentsManager";
import { HomeworkManager } from "@/components/HomeworkManager";
import { EventsManager } from "@/components/EventsManager";
import { TimetableManager } from "@/components/TimetableManager";
import { ResultsManager } from "@/components/ResultsManager";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "students":
        return <StudentsManager />;
      case "homework":
        return <HomeworkManager />;
      case "events":
        return <EventsManager />;
      case "timetable":
        return <TimetableManager />;
      case "results":
        return <ResultsManager />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <TeacherSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
