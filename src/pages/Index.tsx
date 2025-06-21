
import { useState } from "react";
import { TeacherSidebar } from "@/components/TeacherSidebar";
import { Dashboard } from "@/components/Dashboard";
import { StudentsManager } from "@/components/StudentsManager";
import { HomeworkManager } from "@/components/HomeworkManager";
import { EventsManager } from "@/components/EventsManager";
import { TimetableManager } from "@/components/TimetableManager";
import { ResultsManager } from "@/components/ResultsManager";
import { StudentsByClass } from "@/components/StudentsByClass";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showStudentsByClass, setShowStudentsByClass] = useState(false);

  const renderActiveSection = () => {
    if (showStudentsByClass) {
      return <StudentsByClass onBack={() => setShowStudentsByClass(false)} />;
    }

    switch (activeSection) {
      case "dashboard":
        return <Dashboard onShowStudentsByClass={() => setShowStudentsByClass(true)} />;
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
        return <Dashboard onShowStudentsByClass={() => setShowStudentsByClass(true)} />;
    }
  };

  const getSectionTitle = () => {
    if (showStudentsByClass) {
      return "Students by Class";
    }

    const titles = {
      dashboard: "Dashboard Overview",
      students: "Student Management",
      homework: "Homework & Assignments",
      events: "School Events",
      timetable: "Class Timetable",
      results: "Academic Results"
    };
    return titles[activeSection as keyof typeof titles] || "Dashboard";
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <TeacherSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <div className="card-3d rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7ED6A7] to-[#5D916A] flex items-center justify-center shadow-lg">
                    <img 
                      src="/lovable-uploads/f335eb3b-5a51-4fb6-b14f-493524b71168.png" 
                      alt="Schools App" 
                      className="w-8 h-8 logo-3d"
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-[#5D916A] text-shadow-soft">
                      {getSectionTitle()}
                    </h1>
                    <p className="text-[#5D916A]/70 font-medium">Welcome to your teaching dashboard</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="card-3d rounded-2xl p-6 min-h-[600px]">
              {renderActiveSection()}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
