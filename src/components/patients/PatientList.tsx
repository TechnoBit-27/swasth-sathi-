import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { HealthcareButton } from "@/components/ui/healthcare-button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Users, Phone, Mail, Calendar, Eye, Edit, Trash2 } from "lucide-react"
import { MockDataService, Patient } from "@/lib/mockData"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"

export const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  
  const patients = MockDataService.getPatients()
  
  const filteredPatients = useMemo(() => {
    if (!searchTerm) return patients
    return MockDataService.searchPatients(searchTerm)
  }, [searchTerm, patients])

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient)
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Patient Management</h2>
          <p className="text-muted-foreground">View and manage all registered patients</p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {patients.length} Total Patients
        </Badge>
      </div>

      {/* Search Bar */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-primary" />
            <span>Search Patients</span>
          </CardTitle>
          <CardDescription>
            Search by name, email, phone number, or patient ID
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Enter patient name, email, phone, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <HealthcareButton
              onClick={() => setSearchTerm("")}
              variant="outline"
            >
              Clear
            </HealthcareButton>
          </div>
        </CardContent>
      </Card>

      {/* Patient List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Patient List</span>
          </CardTitle>
          <CardDescription>
            {filteredPatients.length} patient(s) {searchTerm && `found for "${searchTerm}"`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPatients.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchTerm ? "No patients found" : "No patients registered"}
              </h3>
              <p className="text-muted-foreground">
                {searchTerm 
                  ? "Try adjusting your search terms" 
                  : "Start by registering your first patient"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Age/Gender</TableHead>
                    <TableHead>Blood Group</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient, index) => (
                    <TableRow 
                      key={patient.id}
                      className="animate-fade-in hover:bg-muted/30"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {getInitials(patient.firstName, patient.lastName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-foreground">
                              {patient.firstName} {patient.lastName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ID: {patient.patientId}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span>{patient.email}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span>{patient.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            {calculateAge(patient.dateOfBirth)} years
                          </div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {patient.gender}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {patient.bloodGroup}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>
                            {patient.lastVisit 
                              ? format(new Date(patient.lastVisit), "MMM dd, yyyy")
                              : "No visits"
                            }
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={patient.status === 'active' ? 'default' : 'secondary'}
                          className={patient.status === 'active' ? 'bg-success text-success-foreground' : ''}
                        >
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <HealthcareButton
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewPatient(patient)}
                          >
                            <Eye className="h-4 w-4" />
                          </HealthcareButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Patient Detail Modal/Card - Simple inline display for now */}
      {selectedPatient && (
        <Card className="shadow-elevated border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(selectedPatient.firstName, selectedPatient.lastName)}
                  </AvatarFallback>
                </Avatar>
                <span>{selectedPatient.firstName} {selectedPatient.lastName}</span>
              </CardTitle>
              <HealthcareButton
                size="sm"
                variant="outline"
                onClick={() => setSelectedPatient(null)}
              >
                Close
              </HealthcareButton>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Patient ID:</span>
                      <span className="font-mono">{selectedPatient.patientId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date of Birth:</span>
                      <span>{format(new Date(selectedPatient.dateOfBirth), "PPP")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gender:</span>
                      <span className="capitalize">{selectedPatient.gender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Blood Group:</span>
                      <span className="font-mono">{selectedPatient.bloodGroup}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{selectedPatient.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span>{selectedPatient.phone}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Address:</span>
                      <p className="text-foreground mt-1">{selectedPatient.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Medical Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Allergies:</span>
                      <p className="text-foreground mt-1">{selectedPatient.allergies || "None known"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Current Medications:</span>
                      <p className="text-foreground mt-1">{selectedPatient.medications || "None"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Emergency Contact:</span>
                      <p className="text-foreground mt-1">{selectedPatient.emergencyContact}</p>
                    </div>
                  </div>
                </div>

                {selectedPatient.insuranceProvider && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Insurance Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Provider:</span>
                        <span>{selectedPatient.insuranceProvider}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Policy Number:</span>
                        <span className="font-mono">{selectedPatient.insuranceNumber}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}