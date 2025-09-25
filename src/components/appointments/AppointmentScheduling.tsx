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
import { Calendar as CalendarIcon, Clock, Save, RefreshCw, UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { MockDataService } from "@/lib/mockData"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const appointmentSchema = z.object({
  patientId: z.string().min(1, "Please select a patient"),
  doctorName: z.string().min(2, "Doctor name is required"),
  date: z.date({ required_error: "Appointment date is required" }),
  time: z.string().min(1, "Appointment time is required"),
  type: z.enum(["consultation", "checkup", "followup", "emergency"], {
    required_error: "Appointment type is required"
  }),
  notes: z.string().optional()
})

type AppointmentFormData = z.infer<typeof appointmentSchema>

const doctors = [
  "Dr. Sarah Smith",
  "Dr. Michael Johnson", 
  "Dr. Emily Brown",
  "Dr. David Wilson",
  "Dr. Lisa Davis",
  "Dr. James Miller",
  "Dr. Jennifer Garcia"
]

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
]

export const AppointmentScheduling = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const { toast } = useToast()
  
  const patients = MockDataService.getPatients()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema)
  })

  const selectedPatientId = watch("patientId")
  const selectedPatient = patients.find(p => p.id === selectedPatientId)

  const onSubmit = async (data: AppointmentFormData) => {
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
      const newAppointment = MockDataService.addAppointment({
        patientId: data.patientId,
        patientName: `${patient.firstName} ${patient.lastName}`,
        doctorName: data.doctorName,
        date: format(data.date, "yyyy-MM-dd"),
        time: data.time,
        type: data.type,
        status: 'scheduled',
        notes: data.notes
      })
      
      toast({
        title: "Appointment Scheduled Successfully!",
        description: `Appointment for ${patient.firstName} ${patient.lastName} on ${format(data.date, "PPP")} at ${data.time}`
      })
      
      reset()
      setSelectedDate(undefined)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule appointment. Please try again."
      })
    }
    
    setIsSubmitting(false)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Schedule Appointment</h2>
        <p className="text-muted-foreground">Book a new appointment for a patient</p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            <span>Appointment Details</span>
          </CardTitle>
          <CardDescription>
            Fill in the appointment information below
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
                    <span className="text-sm font-medium">Email:</span>
                    <p className="text-sm text-muted-foreground">{selectedPatient.email}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Phone:</span>
                    <p className="text-sm text-muted-foreground">{selectedPatient.phone}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Blood Group:</span>
                    <p className="text-sm text-muted-foreground">{selectedPatient.bloodGroup}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Doctor Selection */}
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

            {/* Date and Time */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Appointment Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <HealthcareButton
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground",
                        errors.date && "border-destructive"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </HealthcareButton>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date)
                        if (date) setValue("date", date)
                      }}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && (
                  <p className="text-sm text-destructive">{errors.date.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Appointment Time *</Label>
                <Select onValueChange={(value) => setValue("time", value)}>
                  <SelectTrigger className={errors.time ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{time}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.time && (
                  <p className="text-sm text-destructive">{errors.time.message}</p>
                )}
              </div>
            </div>

            {/* Appointment Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Appointment Type *</Label>
              <Select onValueChange={(value) => setValue("type", value as any)}>
                <SelectTrigger className={errors.type ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select appointment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="checkup">Regular Checkup</SelectItem>
                  <SelectItem value="followup">Follow-up</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-destructive">{errors.type.message}</p>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                {...register("notes")}
                placeholder="Any special instructions or notes for the appointment"
                rows={3}
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4">
              <HealthcareButton
                type="button"
                variant="outline"
                onClick={() => {
                  reset()
                  setSelectedDate(undefined)
                }}
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
                    <span>Scheduling...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Save className="h-4 w-4" />
                    <span>Schedule Appointment</span>
                  </div>
                )}
              </HealthcareButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}