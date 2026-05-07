import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/common/Layout'
import Home from './pages/Home'
import PatientRegister from './pages/patient/PatientRegister'
import PatientLogin from './pages/patient/PatientLogin'
import PatientDashboard from './pages/patient/PatientDashboard'
import PatientQuestionnaire from './pages/patient/PatientQuestionnaire'
import TherapistList from './pages/patient/TherapistList'
import PatientChat from './pages/patient/PatientChat'
import PatientBooking from './pages/patient/PatientBooking'
import TherapistRegister from './pages/therapist/TherapistRegister'
import TherapistLogin from './pages/therapist/TherapistLogin'
import TherapistDashboard from './pages/therapist/TherapistDashboard'
import TherapistRequests from './pages/therapist/TherapistRequests'
import TherapistChat from './pages/therapist/TherapistChat'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminTherapists from './pages/admin/AdminTherapists'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* Patient Routes */}
          <Route path="patient/register" element={<PatientRegister />} />
          <Route path="patient/login" element={<PatientLogin />} />
          <Route path="patient/dashboard" element={<PatientDashboard />} />
          <Route path="patient/questionnaire" element={<PatientQuestionnaire />} />
          <Route path="patient/therapists" element={<TherapistList />} />
          <Route path="patient/chat/:therapistId" element={<PatientChat />} />
          <Route path="patient/booking/:therapistId" element={<PatientBooking />} />

          {/* Therapist Routes */}
          <Route path="therapist/register" element={<TherapistRegister />} />
          <Route path="therapist/login" element={<TherapistLogin />} />
          <Route path="therapist/dashboard" element={<TherapistDashboard />} />
          <Route path="therapist/requests" element={<TherapistRequests />} />
          <Route path="therapist/chat/:patientId" element={<TherapistChat />} />

          {/* Admin Routes */}
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/users" element={<AdminUsers />} />
          <Route path="admin/therapists" element={<AdminTherapists />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
