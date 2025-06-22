
import { Calendar, Users, BookOpen, Trophy, Clock, BarChart, User, LogOut } from "lucide-react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface TeacherSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function TeacherSidebar({ activeSection, setActiveSection }: TeacherSidebarProps) {
  const { faculty, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart },
    { id: "students", label: "Students", icon: Users },
    { id: "homework", label: "Homework", icon: BookOpen },
    { id: "events", label: "Events", icon: Calendar },
    { id: "timetable", label: "Timetable", icon: Clock },
    { id: "results", label: "Results", icon: Trophy },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Sidebar className="border-r border-[#7ED6A7]/20">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7ED6A7] to-[#5D916A] flex items-center justify-center">
            <img 
              src="/lovable-uploads/f335eb3b-5a51-4fb6-b14f-493524b71168.png" 
              alt="Schools App" 
              className="w-6 h-6 logo-3d"
            />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#5D916A]">Schools App</h2>
            <p className="text-sm text-[#5D916A]/70">Teacher Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => setActiveSection(item.id)}
                  isActive={activeSection === item.id}
                  className="w-full justify-start gap-3 py-3 px-4 text-[#5D916A] hover:bg-[#7ED6A7]/10 data-[active=true]:bg-[#7ED6A7] data-[active=true]:text-white"
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="space-y-2">
          <SidebarMenuButton
            onClick={() => navigate('/profile')}
            className="w-full justify-start gap-3 py-3 px-4 text-[#5D916A] hover:bg-[#7ED6A7]/10"
          >
            <User className="h-5 w-5" />
            Profile
          </SidebarMenuButton>
          <SidebarMenuButton
            onClick={handleLogout}
            className="w-full justify-start gap-3 py-3 px-4 text-[#5D916A] hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </SidebarMenuButton>
        </div>
        {faculty && (
          <div className="mt-4 p-3 bg-[#F8E4BE] rounded-lg">
            <p className="text-sm font-medium text-[#5D916A]">{faculty.name}</p>
            <p className="text-xs text-[#5D916A]/70">{faculty.department}</p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
