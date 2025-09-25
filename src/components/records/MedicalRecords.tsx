import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HealthcareButton } from "@/components/ui/healthcare-button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Save, RefreshCw, Plus, Calendar, User, Stethoscope } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { MockDataService, MedicalRecord } from "@/lib/mockData"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { format } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const recordSchema = z.object({
  patientId: z.string().min(1, "Please select a patient"),
  type: z.enum(["consultation", "lab", "imaging", "prescription", "surgery"], {
    required_error: "Record type is required"
  }),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  diagnosis: z.string().optional(),
  treatment: z.string().optional(),
  doctorName: z.string().min(2, "Doctor name is required"),
  date: z.string().min(1, "Date is required")
})

type RecordFormData = z.infer<typeof recordSchema>

const recordTypes = [
  { value: "consultation", label: "Consultation", color: "bg-blue-500" },
  { value: "lab", label: "Laboratory", color: "bg-green-500" },
  { value: "imaging", label: "Imaging", color: "bg-purple-500" },
  { value: "prescription", label: "Prescription", color: "bg-orange-500" },
  { value: "surgery", label: "Surgery", color: "bg-red-500" }
]

const doctors = [
  "Dr. Sarah Smith",
  "Dr. Michael Johnson", 
  "Dr. Emily Brown",
  "Dr. David Wilson",
  "Dr. Lisa Davis",
  "Dr. James Miller",
  "Dr. Jennifer Garcia"
]

export const MedicalRecords = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("add")
  const { toast } = useToast()
  
  const patients = MockDataService.getPatients()
  const records = MockDataService.getMedicalRecords()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<RecordFormData>({
    resolver: zodResolver(recordSchema)
  })

  const selectedPatientId = watch("patientId")
  const selectedPatient = patients.find(p => p.id === selectedPatientId)

  const onSubmit = async (data: RecordFormData) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const patient = patients.find(p => p.id === data.patientId)
    if (!patient) {
      toast({
        title: "Error",
        description: "Selected patient not found"
      })
      setIsSubmitting(false)
      return
    }

    try {
      const newRecord = MockDataService.addMedicalRecord({
        patientId: data.patientId,
        patientName: `${patient.firstName} ${patient.lastName}`,
        type: data.type,
        title: data.title,
        description: data.description,
        diagnosis: data.diagnosis,
        treatment: data.treatment,
        doctorName: data.doctorName,
        date: data.date
      })
      
      toast({
        title: "Medical Record Added Successfully!",
        description: `Record "${data.title}" has been added for ${patient.firstName} ${patient.lastName}`
      })
      
      reset()
      setActiveTab("view")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add medical record. Please try again."
      })
    }
    
    setIsSubmitting(false)
  }

  const getRecordTypeInfo = (type: string) => {
    return recordTypes.find(rt => rt.value === type) || recordTypes[0]
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Medical Records</h2>
        <p className="text-muted-foreground">Manage patient medical records and history</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="add" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Record</span>
          </TabsTrigger>
          <TabsTrigger value="view" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>View Records</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="add">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>Add Medical Record</span>
              </CardTitle>
              <CardDescription>
                Create a new medical record for a patient
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Patient Selection */}
                <div className="space-y-2">
                  <Label htmlFor="patientId">Select Patient *</Label>
                  <Select onValueChange={(value) => setValue("patientId", value)}>
                    <SelectTrigger className={errors.patientId ? "border-destructive" : ""}>
                      <SelectValue placeholder="Choose a patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{patient.firstName} {patient.lastName}</span>
                            <span className="text-muted-foreground">({patient.patientId})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.patientId && (
                    <p className="text-sm text-destructive">{errors.patientId.message}</p>
                  )}
                </div>

                {/* Patient Info Display */}
                {selectedPatient && (
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="grid gap-2 md:grid-cols-3">
                      <div>
                        <span className="text-sm font-medium">Blood Group:</span>
                        <p className="text-sm text-muted-foreground">{selectedPatient.bloodGroup}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Allergies:</span>
                        <p className="text-sm text-muted-foreground">{selectedPatient.allergies || "None known"}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Current Medications:</span>
                        <p className="text-sm text-muted-foreground">{selectedPatient.medications || "None"}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Record Type and Doctor */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="type">Record Type *</Label>
                    <Select onValueChange={(value) => setValue("type", value as any)}>
                      <SelectTrigger className={errors.type ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select record type" />
                      </SelectTrigger>
                      <SelectContent>
                        {recordTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
                              <span>{type.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.type && (
                      <p className="text-sm text-destructive">{errors.type.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctorName">Attending Doctor *</Label>
                    <Select onValueChange={(value) => setValue("doctorName", value)}>
                      <SelectTrigger className={errors.doctorName ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor} value={doctor}>
                            {doctor}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.doctorName && (
                      <p className="text-sm text-destructive">{errors.doctorName.message}</p>
                    )}
                  </div>
                </div>

                {/* Title and Date */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Record Title *</Label>
                    <Input
                      id="title"
                      {...register("title")}
                      placeholder="e.g., Annual Physical Examination"
                      className={errors.title ? "border-destructive" : ""}
                    />
                    {errors.title && (
                      <p className="text-sm text-destructive">{errors.title.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      {...register("date")}
                      className={errors.date ? "border-destructive" : ""}
                    />
                    {errors.date && (
                      <p className="text-sm text-destructive">{errors.date.message}</p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    placeholder="Detailed description of the medical record"
                    rows={4}
                    className={errors.description ? "border-destructive" : ""}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                  )}
                </div>

                {/* Diagnosis and Treatment */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="diagnosis">Diagnosis</Label>
                    <Textarea
                      id="diagnosis"
                      {...register("diagnosis")}
                      placeholder="Medical diagnosis (optional)"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="treatment">Treatment</Label>
                    <Textarea
                      id="treatment"
                      {...register("treatment")}
                      placeholder="Treatment plan (optional)"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-4">
                  <HealthcareButton
                    type="button"
                    variant="outline"
                    onClick={() => reset()}
                    disabled={isSubmitting}
                  >
                    Clear Form
                  </HealthcareButton>
                  <HealthcareButton
                    type="submit"
                    variant="medical"
                    disabled={isSubmitting}
                    className="min-w-[150px]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Saving...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Save className="h-4 w-4" />
                        <span>Save Record</span>
                      </div>
                    )}
                  </HealthcareButton>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="view">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>Medical Records</span>
              </CardTitle>
              <CardDescription>
                All medical records in the system ({records.length} total)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {records.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No medical records found</h3>
                  <p className="text-muted-foreground mb-4">Start by adding your first medical record</p>
                  <HealthcareButton onClick={() => setActiveTab("add")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Record
                  </HealthcareButton>
                </div>
              ) : (
                <div className="space-y-4">
                  {records.map((record, index) => {
                    const typeInfo = getRecordTypeInfo(record.type)
                    return (
                      <div 
                        key={record.id}
                        className="p-4 border rounded-lg hover:bg-muted/30 transition-colors animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg ${typeInfo.color} flex items-center justify-center`}>
                              <FileText className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-medium text-foreground">{record.title}</h3>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <User className="h-3 w-3" />
                                  <span>{record.patientName}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Stethoscope className="h-3 w-3" />
                                  <span>{record.doctorName}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{format(new Date(record.date), "MMM dd, yyyy")}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Badge variant="secondary">{typeInfo.label}</Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{record.description}</p>
                        
                        {(record.diagnosis || record.treatment) && (
                          <div className="grid gap-3 md:grid-cols-2 pt-3 border-t">
                            {record.diagnosis && (
                              <div>
                                <span className="text-sm font-medium text-foreground">Diagnosis:</span>
                                <p className="text-sm text-muted-foreground mt-1">{record.diagnosis}</p>
                              </div>
                            )}
                            {record.treatment && (
                              <div>
                                <span className="text-sm font-medium text-foreground">Treatment:</span>
                                <p className="text-sm text-muted-foreground mt-1">{record.treatment}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}