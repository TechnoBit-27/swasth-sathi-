// Mock Data Service for Healthcare Management System
export interface Patient {
  id: string
  patientId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other'
  address: string
  emergencyContact: string
  bloodGroup: string
  allergies?: string
  medications?: string
  insuranceProvider?: string
  insuranceNumber?: string
  registeredAt: string
  lastVisit?: string
  status: 'active' | 'inactive'
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorName: string
  date: string
  time: string
  type: 'consultation' | 'checkup' | 'followup' | 'emergency'
  status: 'scheduled' | 'completed' | 'cancelled' | 'ongoing'
  notes?: string
  createdAt: string
}

export interface MedicalRecord {
  id: string
  patientId: string
  patientName: string
  type: 'consultation' | 'lab' | 'imaging' | 'prescription' | 'surgery'
  title: string
  description: string
  diagnosis?: string
  treatment?: string
  doctorName: string
  date: string
  attachments?: string[]
  createdAt: string
}

export interface Activity {
  id: string
  type: 'appointment' | 'patient' | 'record' | 'checkup'
  title: string
  description: string
  time: string
  patientId?: string
  patientName?: string
  status: 'completed' | 'pending' | 'scheduled'
}

// Sample data for initial load
const samplePatients: Patient[] = [
  {
    id: '1',
    patientId: 'SS001234',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1-555-0101',
    dateOfBirth: '1985-03-15',
    gender: 'male',
    address: '123 Main St, City, State 12345',
    emergencyContact: 'Jane Doe - +1-555-0102',
    bloodGroup: 'A+',
    allergies: 'Penicillin, Peanuts',
    medications: 'Aspirin 81mg daily',
    insuranceProvider: 'HealthCare Plus',
    insuranceNumber: 'HC123456789',
    registeredAt: '2024-01-15T10:30:00Z',
    lastVisit: '2024-09-20T14:15:00Z',
    status: 'active'
  },
  {
    id: '2', 
    patientId: 'SS001235',
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@email.com',
    phone: '+1-555-0201',
    dateOfBirth: '1990-07-22',
    gender: 'female',
    address: '456 Oak Ave, City, State 12345',
    emergencyContact: 'Mike Wilson - +1-555-0202',
    bloodGroup: 'O+',
    allergies: 'None known',
    medications: 'Multivitamin',
    insuranceProvider: 'MediCare Pro',
    insuranceNumber: 'MP987654321',
    registeredAt: '2024-02-10T09:45:00Z',
    lastVisit: '2024-09-18T11:30:00Z',
    status: 'active'
  },
  {
    id: '3',
    patientId: 'SS001236', 
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@email.com',
    phone: '+1-555-0301',
    dateOfBirth: '1978-11-08',
    gender: 'male',
    address: '789 Pine St, City, State 12345',
    emergencyContact: 'Lisa Johnson - +1-555-0302',
    bloodGroup: 'B+',
    allergies: 'Shellfish',
    medications: 'Lisinopril 10mg daily',
    insuranceProvider: 'Blue Shield',
    insuranceNumber: 'BS456789123',
    registeredAt: '2024-01-28T16:20:00Z',
    lastVisit: '2024-09-15T10:00:00Z',
    status: 'active'
  }
]

const sampleAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'John Doe',
    doctorName: 'Dr. Smith',
    date: '2024-09-25',
    time: '09:00',
    type: 'consultation',
    status: 'scheduled',
    notes: 'Regular checkup',
    createdAt: '2024-09-20T10:00:00Z'
  },
  {
    id: '2',
    patientId: '2', 
    patientName: 'Sarah Wilson',
    doctorName: 'Dr. Johnson',
    date: '2024-09-25',
    time: '14:30',
    type: 'followup',
    status: 'scheduled',
    notes: 'Follow-up on blood work',
    createdAt: '2024-09-22T11:15:00Z'
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Mike Johnson', 
    doctorName: 'Dr. Brown',
    date: '2024-09-24',
    time: '11:00',
    type: 'checkup',
    status: 'completed',
    notes: 'Annual physical',
    createdAt: '2024-09-15T09:30:00Z'
  }
]

const sampleMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'John Doe',
    type: 'consultation',
    title: 'Annual Physical Examination',
    description: 'Complete physical examination with vital signs assessment',
    diagnosis: 'Patient in good health, mild hypertension noted',
    treatment: 'Continue current medications, lifestyle modifications recommended',
    doctorName: 'Dr. Smith',
    date: '2024-09-20',
    createdAt: '2024-09-20T14:15:00Z'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Sarah Wilson',
    type: 'lab',
    title: 'Blood Work - Complete Panel',
    description: 'Comprehensive metabolic panel and CBC',
    diagnosis: 'All values within normal range',
    treatment: 'No treatment needed, continue regular diet',
    doctorName: 'Dr. Johnson', 
    date: '2024-09-18',
    createdAt: '2024-09-18T16:45:00Z'
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Mike Johnson',
    type: 'prescription',
    title: 'Hypertension Management',
    description: 'Blood pressure medication adjustment',
    diagnosis: 'Controlled hypertension',
    treatment: 'Lisinopril 10mg daily, follow-up in 3 months',
    doctorName: 'Dr. Brown',
    date: '2024-09-15',
    createdAt: '2024-09-15T10:00:00Z'
  }
]

// Local Storage Keys
const STORAGE_KEYS = {
  PATIENTS: 'healthcare_patients',
  APPOINTMENTS: 'healthcare_appointments', 
  MEDICAL_RECORDS: 'healthcare_medical_records',
  ACTIVITIES: 'healthcare_activities'
}

// Data Access Layer
export class MockDataService {
  // Initialize with sample data if empty
  static initialize() {
    if (!localStorage.getItem(STORAGE_KEYS.PATIENTS)) {
      localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(samplePatients))
    }
    if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(sampleAppointments))
    }
    if (!localStorage.getItem(STORAGE_KEYS.MEDICAL_RECORDS)) {
      localStorage.setItem(STORAGE_KEYS.MEDICAL_RECORDS, JSON.stringify(sampleMedicalRecords))
    }
    if (!localStorage.getItem(STORAGE_KEYS.ACTIVITIES)) {
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify([]))
    }
  }

  // Patient Methods
  static getPatients(): Patient[] {
    const data = localStorage.getItem(STORAGE_KEYS.PATIENTS)
    return data ? JSON.parse(data) : []
  }

  static getPatient(id: string): Patient | null {
    const patients = this.getPatients()
    return patients.find(p => p.id === id) || null
  }

  static addPatient(patient: Omit<Patient, 'id' | 'patientId' | 'registeredAt' | 'status'>): Patient {
    const patients = this.getPatients()
    const newPatient: Patient = {
      ...patient,
      id: Date.now().toString(),
      patientId: `SS${Date.now().toString().slice(-6)}`,
      registeredAt: new Date().toISOString(),
      status: 'active'
    }
    patients.push(newPatient)
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients))
    
    // Add activity
    this.addActivity({
      type: 'patient',
      title: 'New Patient Registered',
      description: `${newPatient.firstName} ${newPatient.lastName} registered successfully`,
      time: 'Just now',
      patientId: newPatient.id,
      patientName: `${newPatient.firstName} ${newPatient.lastName}`,
      status: 'completed'
    })
    
    return newPatient
  }

  static updatePatient(id: string, updates: Partial<Patient>): Patient | null {
    const patients = this.getPatients()
    const index = patients.findIndex(p => p.id === id)
    if (index === -1) return null
    
    patients[index] = { ...patients[index], ...updates }
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients))
    return patients[index]
  }

  static deletePatient(id: string): boolean {
    const patients = this.getPatients()
    const filtered = patients.filter(p => p.id !== id)
    if (filtered.length === patients.length) return false
    
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(filtered))
    return true
  }

  static searchPatients(query: string): Patient[] {
    const patients = this.getPatients()
    const searchTerm = query.toLowerCase()
    return patients.filter(patient =>
      patient.firstName.toLowerCase().includes(searchTerm) ||
      patient.lastName.toLowerCase().includes(searchTerm) ||
      patient.email.toLowerCase().includes(searchTerm) ||
      patient.patientId.toLowerCase().includes(searchTerm) ||
      patient.phone.includes(searchTerm)
    )
  }

  // Appointment Methods  
  static getAppointments(): Appointment[] {
    const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)
    return data ? JSON.parse(data) : []
  }

  static getTodayAppointments(): Appointment[] {
    const appointments = this.getAppointments()
    const today = new Date().toISOString().split('T')[0]
    return appointments.filter(apt => apt.date === today)
  }

  static addAppointment(appointment: Omit<Appointment, 'id' | 'createdAt'>): Appointment {
    const appointments = this.getAppointments()
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    appointments.push(newAppointment)
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments))
    
    // Add activity
    this.addActivity({
      type: 'appointment',
      title: 'Appointment Scheduled',
      description: `${appointment.type} with ${appointment.doctorName}`,
      time: 'Just now',
      patientId: appointment.patientId,
      patientName: appointment.patientName,
      status: 'scheduled'
    })
    
    return newAppointment
  }

  static updateAppointment(id: string, updates: Partial<Appointment>): Appointment | null {
    const appointments = this.getAppointments()
    const index = appointments.findIndex(a => a.id === id)
    if (index === -1) return null
    
    appointments[index] = { ...appointments[index], ...updates }
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments))
    return appointments[index]
  }

  // Medical Records Methods
  static getMedicalRecords(): MedicalRecord[] {
    const data = localStorage.getItem(STORAGE_KEYS.MEDICAL_RECORDS)
    return data ? JSON.parse(data) : []
  }

  static getPatientRecords(patientId: string): MedicalRecord[] {
    const records = this.getMedicalRecords()
    return records.filter(record => record.patientId === patientId)
  }

  static addMedicalRecord(record: Omit<MedicalRecord, 'id' | 'createdAt'>): MedicalRecord {
    const records = this.getMedicalRecords()
    const newRecord: MedicalRecord = {
      ...record,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    records.push(newRecord)
    localStorage.setItem(STORAGE_KEYS.MEDICAL_RECORDS, JSON.stringify(records))
    
    // Add activity
    this.addActivity({
      type: 'record',
      title: 'Medical Record Added',
      description: record.title,
      time: 'Just now',
      patientId: record.patientId,
      patientName: record.patientName,
      status: 'completed'
    })
    
    return newRecord
  }

  // Activity Methods
  static getActivities(): Activity[] {
    const data = localStorage.getItem(STORAGE_KEYS.ACTIVITIES)
    return data ? JSON.parse(data) : []
  }

  static addActivity(activity: Omit<Activity, 'id'>): Activity {
    const activities = this.getActivities()
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString()
    }
    activities.unshift(newActivity) // Add to beginning
    // Keep only last 20 activities
    activities.splice(20)
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities))
    return newActivity
  }

  // Statistics
  static getStats() {
    const patients = this.getPatients()
    const appointments = this.getAppointments()
    const todayAppointments = this.getTodayAppointments()
    const records = this.getMedicalRecords()
    
    const activePatients = patients.filter(p => p.status === 'active').length
    const pendingAppointments = appointments.filter(a => a.status === 'scheduled').length
    const completedToday = todayAppointments.filter(a => a.status === 'completed').length
    
    return {
      totalPatients: activePatients,
      todayAppointments: todayAppointments.length,
      pendingRecords: records.filter(r => new Date(r.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
      activeCases: pendingAppointments,
      completedToday,
      newPatientsThisMonth: patients.filter(p => 
        new Date(p.registeredAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      ).length
    }
  }
}

// Initialize on module load
MockDataService.initialize()
