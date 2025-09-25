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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { UserPlus, Save, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { MockDataService } from "@/lib/mockData"

const patientSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"]),
  address: z.string().min(10, "Address must be at least 10 characters"),
  emergencyContact: z.string().min(10, "Emergency contact is required"),
  bloodGroup: z.string().min(1, "Blood group is required"),
  allergies: z.string().optional(),
  medications: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insuranceNumber: z.string().optional(),
  consent: z.boolean().refine(val => val === true, "Consent is required")
})

type PatientFormData = z.infer<typeof patientSchema>

export const PatientRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema)
  })

  const onSubmit = async (data: PatientFormData) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    try {
      const newPatient = MockDataService.addPatient({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        address: data.address,
        emergencyContact: data.emergencyContact,
        bloodGroup: data.bloodGroup,
        allergies: data.allergies,
        medications: data.medications,
        insuranceProvider: data.insuranceProvider,
        insuranceNumber: data.insuranceNumber
      })
      
      toast({
        title: "Patient Registered Successfully!",
        description: `${newPatient.firstName} ${newPatient.lastName} has been added with ID: ${newPatient.patientId}`
      })
      
      reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register patient. Please try again."
      })
    }
    
    setIsSubmitting(false)
  }

  const generatePatientId = () => {
    const id = `SS${Date.now().toString().slice(-6)}`
    toast({
      title: "Patient ID Generated",
      description: `New Patient ID: ${id}`
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Patient Registration</h2>
          <p className="text-muted-foreground">Add a new patient to the healthcare system</p>
        </div>
        <HealthcareButton onClick={generatePatientId} variant="outline" className="flex items-center space-x-2">
          <RefreshCw className="h-4 w-4" />
          <span>Generate ID</span>
        </HealthcareButton>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5 text-primary" />
            <span>Patient Information</span>
          </CardTitle>
          <CardDescription>
            Please fill in all required fields to register a new patient
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  placeholder="Enter first name"
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  placeholder="Enter last name"
                  className={errors.lastName ? "border-destructive" : ""}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="patient@email.com"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="+1 (555) 123-4567"
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Demographics */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth")}
                  className={errors.dateOfBirth ? "border-destructive" : ""}
                />
                {errors.dateOfBirth && (
                  <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Gender *</Label>
                <RadioGroup
                  onValueChange={(value) => setValue("gender", value as "male" | "female" | "other")}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
                {errors.gender && (
                  <p className="text-sm text-destructive">{errors.gender.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group *</Label>
                <Select onValueChange={(value) => setValue("bloodGroup", value)}>
                  <SelectTrigger className={errors.bloodGroup ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
                {errors.bloodGroup && (
                  <p className="text-sm text-destructive">{errors.bloodGroup.message}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                {...register("address")}
                placeholder="Enter complete address"
                className={errors.address ? "border-destructive" : ""}
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address.message}</p>
              )}
            </div>

            {/* Emergency Contact */}
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact *</Label>
              <Input
                id="emergencyContact"
                {...register("emergencyContact")}
                placeholder="Emergency contact name and phone"
                className={errors.emergencyContact ? "border-destructive" : ""}
              />
              {errors.emergencyContact && (
                <p className="text-sm text-destructive">{errors.emergencyContact.message}</p>
              )}
            </div>

            {/* Medical Information */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="allergies">Known Allergies</Label>
                <Textarea
                  id="allergies"
                  {...register("allergies")}
                  placeholder="List any known allergies"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  {...register("medications")}
                  placeholder="List current medications"
                  rows={3}
                />
              </div>
            </div>

            {/* Insurance Information */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                <Input
                  id="insuranceProvider"
                  {...register("insuranceProvider")}
                  placeholder="Insurance company name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="insuranceNumber">Insurance Number</Label>
                <Input
                  id="insuranceNumber"
                  {...register("insuranceNumber")}
                  placeholder="Policy/Member ID"
                />
              </div>
            </div>

            {/* Consent */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="consent" 
                onCheckedChange={(checked) => setValue("consent", checked as boolean)}
              />
              <Label htmlFor="consent" className="text-sm">
                I consent to the collection and processing of my personal health information *
              </Label>
            </div>
            {errors.consent && (
              <p className="text-sm text-destructive">{errors.consent.message}</p>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <HealthcareButton
                type="button"
                variant="outline"
                onClick={() => reset()}
                disabled={isSubmitting}
              >
                Reset Form
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
                    <span>Registering...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Save className="h-4 w-4" />
                    <span>Register Patient</span>
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