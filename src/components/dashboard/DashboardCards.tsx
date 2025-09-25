import { Users, Calendar, FileText, TrendingUp, Activity, Heart, Clock, UserCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MockDataService } from "@/lib/mockData"
import { useEffect, useState } from "react"

interface DashboardCardData {
  title: string
  value: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  trend?: {
    value: string
    positive: boolean
  }
  color: 'default' | 'success' | 'warning' | 'primary'
}

export const DashboardCards = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    pendingRecords: 0,
    activeCases: 0,
    newPatientsThisMonth: 0,
    completedToday: 0
  })

  useEffect(() => {
    const currentStats = MockDataService.getStats()
    setStats(currentStats)
  }, [])

  const cardData: DashboardCardData[] = [
    {
      title: "Total Patients",
      value: stats.totalPatients.toString(),
      description: "Registered patients",
      icon: Users,
      trend: { value: `+${stats.newPatientsThisMonth}`, positive: true },
      color: 'primary'
    },
    {
      title: "Today's Appointments",
      value: stats.todayAppointments.toString(),
      description: "Scheduled for today",
      icon: Calendar,
      trend: { value: `${stats.completedToday} completed`, positive: true },
      color: 'success'
    },
    {
      title: "Recent Records",
      value: stats.pendingRecords.toString(),
      description: "Added this week",
      icon: FileText,
      trend: { value: "This week", positive: true },
      color: 'warning'
    },
    {
      title: "Active Cases",
      value: stats.activeCases.toString(),
      description: "Pending appointments",
      icon: Activity,
      trend: { value: "Ongoing", positive: true },
      color: 'default'
    }
  ]

const getCardStyles = (color: DashboardCardData['color']) => {
  switch (color) {
    case 'primary':
      return "border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10"
    case 'success':
      return "border-success/20 bg-gradient-to-br from-success/5 to-success/10"
    case 'warning':
      return "border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10"
    default:
      return "border-border bg-gradient-card"
  }
}

const getIconStyles = (color: DashboardCardData['color']) => {
  switch (color) {
    case 'primary':
      return "bg-primary text-primary-foreground"
    case 'success':
      return "bg-success text-success-foreground"
    case 'warning':
      return "bg-warning text-warning-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cardData.map((card, index) => {
        const Icon = card.icon
        return (
          <Card 
            key={card.title} 
            className={`${getCardStyles(card.color)} shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                {card.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${getIconStyles(card.color)}`}>
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{card.value}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">
                  {card.description}
                </p>
                {card.trend && (
                  <Badge 
                    variant={card.trend.positive ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {card.trend.value}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}