import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { Sidebar } from "@/components/layout/Sidebar"
import { DashboardCards } from "@/components/dashboard/DashboardCards"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { PatientRegistration } from "@/components/patients/PatientRegistration"
import { PatientList } from "@/components/patients/PatientList"
import { AppointmentScheduling } from "@/components/appointments/AppointmentScheduling"
import { MedicalRecords } from "@/components/records/MedicalRecords"

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Healthcare Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's what's happening with your patients today.</p>
            </div>
            <DashboardCards />
            <div className="grid gap-6 lg:grid-cols-2">
              <RecentActivity />
              <div className="space-y-6">
                {/* Additional dashboard widgets can go here */}
              </div>
            </div>
          </div>
        )
      case "register-patient":
        return <PatientRegistration />
      case "patients":
        return <PatientList />
      case "appointments":
        return <AppointmentScheduling />
      case "medical-records":
        return <MedicalRecords />
      default:
        return (
          <div className="space-y-6 animate-fade-in">
            <DashboardCards />
            <RecentActivity />
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
};

export default Index;
