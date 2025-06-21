
import { Book, Calendar, Users, BookOpen, Trophy, Clock } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface TeacherSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const menuItems = [
  { id: "dashboard", title: "Dashboard", icon: BookOpen },
  { id: "students", title: "Students", icon: Users },
  { id: "homework", title: "Homework", icon: Book },
  { id: "events", title: "Events", icon: Calendar },
  { id: "timetable", title: "Timetable", icon: Clock },
  { id: "results", title: "Results", icon: Trophy },
];

export function TeacherSidebar({ activeSection, setActiveSection }: TeacherSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={`${isCollapsed ? "w-14" : "w-64"} sidebar-3d`} collapsible="icon">
      <div className="p-4 border-b border-white/20">
        <SidebarTrigger className="mb-4 text-white hover:bg-white/20" />
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/f335eb3b-5a51-4fb6-b14f-493524b71168.png" 
              alt="Schools App Logo" 
              className="w-10 h-10 logo-3d"
            />
            <div>
              <h2 className="text-xl font-bold text-white text-shadow-soft">Schools App</h2>
              <p className="text-white/80 text-sm">Teacher Portal</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/f335eb3b-5a51-4fb6-b14f-493524b71168.png" 
              alt="Schools App Logo" 
              className="w-8 h-8 logo-3d"
            />
          </div>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/70 font-semibold">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-white/20 text-white font-semibold shadow-lg"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {!isCollapsed && <span className="text-shadow-soft">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
