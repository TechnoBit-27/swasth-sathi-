import { Heart, User, Bell, Settings, LogOut } from "lucide-react"
import { HealthcareButton } from "@/components/ui/healthcare-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="rounded-lg bg-gradient-primary p-2">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Swasth Sathi</h1>
              <p className="text-xs text-muted-foreground">Healthcare Management</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <HealthcareButton variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-warning text-warning-foreground">
              3
            </Badge>
          </HealthcareButton>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <HealthcareButton variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/admin.png" alt="Admin" />
                  <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
                </Avatar>
              </HealthcareButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">Dr. Admin</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    admin@swasthsathi.com
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}