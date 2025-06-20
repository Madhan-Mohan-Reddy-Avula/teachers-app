
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
  const { collapsed } = useSidebar();

  return (
    <Sidebar className={collapsed ? "w-14" : "w-60"} collapsible>
      <div className="p-4 border-b">
        <SidebarTrigger className="mb-2" />
        {!collapsed && (
          <h2 className="text-xl font-bold text-blue-700">Teacher Portal</h2>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full ${
                      activeSection === item.id
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
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
