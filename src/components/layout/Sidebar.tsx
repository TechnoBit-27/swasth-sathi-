import { useState } from "react"
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  UserPlus, 
  ChevronRight,
  Stethoscope,
  Activity
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  active?: boolean
  badge?: string
}

const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    id: "patients",
    label: "Patients",
    icon: Users,
    badge: "156",
  },
  {
    id: "appointments",
    label: "Appointments",
    icon: Calendar,
    badge: "12",
  },
  {
    id: "medical-records",
    label: "Medical Records",
    icon: FileText,
  },
  {
    id: "register-patient",
    label: "Register Patient",
    icon: UserPlus,
  },
]

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  return (
    <div className="flex h-full w-64 flex-col bg-card border-r border-border">
      <div className="flex h-16 items-center justify-center border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="rounded-md bg-gradient-primary p-1.5">
            <Stethoscope className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground">Healthcare Portal</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-secondary",
                isActive 
                  ? "bg-gradient-primary text-primary-foreground shadow-card" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                {item.badge && (
                  <span className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    isActive 
                      ? "bg-primary-foreground/20 text-primary-foreground" 
                      : "bg-primary/10 text-primary"
                  )}>
                    {item.badge}
                  </span>
                )}
                <ChevronRight className={cn(
                  "h-4 w-4 transition-transform",
                  isActive ? "rotate-90" : "rotate-0"
                )} />
              </div>
            </button>
          )
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center space-x-3 rounded-lg bg-accent/10 p-3">
          <div className="rounded-full bg-success p-2">
            <Activity className="h-4 w-4 text-success-foreground animate-pulse-healthcare" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">System Status</p>
            <p className="text-xs text-success">All systems operational</p>
          </div>
        </div>
      </div>
    </div>
  )
}