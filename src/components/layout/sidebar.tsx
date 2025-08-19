'use client';

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home,
  Users,
  Shield,
  Database,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Folder,
  CheckSquare
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
}

// Navigation menu items
const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/', active: true },
  { icon: Users, label: 'Users', href: '/users', active: false },
  { icon: Shield, label: 'Roles', href: '/roles', active: false },
  { icon: Folder, label: 'Documents', href: '/documents', active: false },
  { icon: CheckSquare, label: 'Todos', href: '/todos', active: false },
  { icon: Database, label: 'Database', href: '#', active: false },
  { icon: FileText, label: 'Reports', href: '#', active: false },
  { icon: Settings, label: 'Settings', href: '/settings', active: false },
  { icon: HelpCircle, label: 'Help', href: '#', active: false },
];

export default function Sidebar({ sidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  
  return (
    <>
      <aside className={`fixed left-0 top-16 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out z-40 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 w-64`}>
        <div className="p-4">
          {/* User Profile Section */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">admin@eveportal.com</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.label} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      isActive 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="absolute bottom-4 left-4 right-4">
            <Separator className="mb-4" />
            <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <LogOut className="h-4 h-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => {/* This will be handled by parent component */}}
        />
      )}
    </>
  );
} 