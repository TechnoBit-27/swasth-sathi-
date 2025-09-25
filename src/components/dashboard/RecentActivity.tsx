import { Clock, User, Calendar, FileText, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MockDataService } from "@/lib/mockData"
import { useEffect, useState } from "react"

interface ActivityItem {
  id: string
  type: 'appointment' | 'patient' | 'record' | 'checkup'
  title: string
  description: string
  time: string
  patientName?: string
  status: 'completed' | 'pending' | 'scheduled'
}

export const RecentActivity = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([])

  useEffect(() => {
    const recentActivities = MockDataService.getActivities()
    setActivities(recentActivities.slice(0, 8)) // Show last 8 activities
  }, [])

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'appointment':
      return Calendar
    case 'patient':
      return User
    case 'record':
      return FileText
    case 'checkup':
      return CheckCircle
    default:
      return Clock
  }
}

const getStatusBadge = (status: ActivityItem['status']) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-success text-success-foreground">Completed</Badge>
    case 'pending':
      return <Badge variant="outline" className="border-warning text-warning">Pending</Badge>
    case 'scheduled':
      return <Badge className="bg-primary text-primary-foreground">Scheduled</Badge>
    default:
      return null
  }
}

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary" />
          <span>Recent Activity</span>
        </CardTitle>
        <CardDescription>
          Latest updates from your healthcare system ({activities.length} activities)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No recent activity</h3>
            <p className="text-muted-foreground">Activity will appear here as you use the system</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const Icon = getActivityIcon(activity.type)
              return (
                <div 
                  key={activity.id} 
                  className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="rounded-full bg-primary/10 p-2">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">
                        {activity.title}
                      </p>
                      {getStatusBadge(activity.status)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{activity.time}</span>
                    </div>
                  </div>

                  {activity.patientName && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {getInitials(activity.patientName)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}