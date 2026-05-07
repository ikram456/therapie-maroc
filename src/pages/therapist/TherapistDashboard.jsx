import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { 
  Users, Calendar, MessageCircle, TrendingUp, 
  DollarSign, Star, Clock, ChevronRight, Bell,
  CheckCircle, XCircle, UserCheck
} from 'lucide-react'

const TherapistDashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data
  const stats = [
    { label: "Patients actifs", value: 12, icon: <Users className="w-5 h-5" />, color: "bg-majorelle-500" },
    { label: "Séances cette semaine", value: 8, icon: <Calendar className="w-5 h-5" />, color: "bg-terre-500" },
    { label: "Revenus (MAD)", value: "3,200", icon: <DollarSign className="w-5 h-5" />, color: "bg-safran-500" },
    { label: "Note moyenne", value: "4.9", icon: <Star className="w-5 h-5" />, color: "bg-green-500" },
  ]

  const upcomingSessions = [
    {
      id: 1,
      patientName: "Ahmed Benjelloun",
      date: "2026-05-10",
      time: "14:00",
      type: "Vidéo",
      status: "confirmed",
      notes: "Suivi anxiété - Séance 3"
    },
    {
      id: 2,
      patientName: "Sara El Fassi",
      date: "2026-05-10",
      time: "16:30",
      type: "Vidéo",
      status: "confirmed",
      notes: "Première consultation"
    },
    {
      id: 3,
      patientName: "Karim Idrissi",
      date: "2026-05-11",
      time: "10:00",
      type: "Vidéo",
      status: "pending",
      notes: "Thérapie TCC"
    }
  ]

  const recentPatients = [
    {
      id: 1,
      name: "Ahmed Benjelloun",
      age: 28,
      status: "active",
      lastSession: "2026-05-03",
      nextSession: "2026-05-10",
      progress: 65
    },
    {
      id: 2,
      name: "Sara El Fassi",
      age: 24,
      status: "active",
      lastSession: "Nouveau",
      nextSession: "2026-05-10",
      progress: 0
    }
  ]

  const pendingRequests = [
    {
      id: 1,
      patientName: "Youssef Amrani",
      requestDate: "2026-05-07",
      reason: "Anxiété sociale",
      urgency: "normal"
    },
    {
      id: 2,
      patientName: "Laila Bennani",
      requestDate: "2026-05-07",
      reason: "Dépression légère",
      urgency: "high"
    }
  ]

  return (
    <div className="min-h-screen bg-cream-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-amiri text-4xl font-bold text-majorelle-900 mb-2">
                Bonjour, Dr. {user?.lastName || 'Thérapeute'} 👋
              </h1>
              <p className="text-majorelle-600">
                Voici un aperçu de votre activité aujourd'hui
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-majorelle-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-terre-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </div>
              <div className="bg-gradient-moroccan text-white px-4 py-2 rounded-moroccan text-sm font-medium">
                <UserCheck className="w-4 h-4 inline mr-2" />
                En ligne
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="moroccan-card p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-majorelle-600 text-sm font-medium">{stat.label}</p>
                  <p className="font-amiri text-3xl font-bold text-majorelle-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center text-white`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="moroccan-card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-amiri text-2xl font-bold text-majorelle-900">
                  <Calendar className="w-6 h-6 inline mr-2" />
                  Séances à Venir
                </h2>
                <Link to="/therapist/calendar" className="text-terre-600 hover:text-terre-800 font-medium text-sm">
                  Voir l'agenda
                </Link>
              </div>

              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="bg-cream-50 rounded-moroccan p-4 border border-safran-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-majorelle-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-majorelle-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-majorelle-900">{session.patientName}</h3>
                          <p className="text-sm text-majorelle-600">{session.notes}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-majorelle-900">{session.date}</p>
                        <p className="text-sm text-majorelle-600">{session.time}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                        session.status === 'confirmed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-safran-100 text-safran-700'
                      }`}>
                        {session.status === 'confirmed' ? (
                          <CheckCircle className="w-4 h-4 mr-1" />
                        ) : (
                          <Clock className="w-4 h-4 mr-1" />
                        )}
                        {session.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                      </span>
                      <Link 
                        to={`/therapist/chat/${session.id}`}
                        className="moroccan-btn-primary text-sm py-2 px-4"
                      >
                        Rejoindre
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Patients */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="moroccan-card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-amiri text-2xl font-bold text-majorelle-900">
                  <Users className="w-6 h-6 inline mr-2" />
                  Mes Patients
                </h2>
                <Link to="/therapist/patients" className="text-terre-600 hover:text-terre-800 font-medium text-sm">
                  Voir tout
                </Link>
              </div>

              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between bg-cream-50 rounded-moroccan p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-majorelle-100 rounded-full flex items-center justify-center">
                        <span className="font-amiri text-xl font-bold text-majorelle-600">
                          {patient.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-majorelle-900">{patient.name}</h3>
                        <p className="text-sm text-majorelle-600">{patient.age} ans</p>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className="text-xs text-majorelle-500">Dernière séance: {patient.lastSession}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-24 bg-cream-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-majorelle-500 h-2 rounded-full transition-all"
                          style={{ width: `${patient.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-majorelle-600">Progression {patient.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Pending Requests */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="moroccan-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-amiri text-xl font-bold text-majorelle-900">
                  Demandes en Attente
                </h2>
                <span className="bg-terre-500 text-white text-xs px-2 py-1 rounded-full">
                  {pendingRequests.length}
                </span>
              </div>
              <div className="space-y-3">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="bg-cream-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-majorelle-900 text-sm">{request.patientName}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        request.urgency === 'high' 
                          ? 'bg-terre-100 text-terre-700' 
                          : 'bg-safran-100 text-safran-700'
                      }`}>
                        {request.urgency === 'high' ? 'Urgent' : 'Normal'}
                      </span>
                    </div>
                    <p className="text-xs text-majorelle-600 mb-3">{request.reason}</p>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Accepter
                      </button>
                      <button className="flex-1 bg-cream-200 hover:bg-cream-300 text-majorelle-700 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                        <XCircle className="w-4 h-4 mr-1" />
                        Refuser
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                to="/therapist/requests"
                className="block text-center text-terre-600 hover:text-terre-800 font-medium text-sm mt-4"
              >
                Voir toutes les demandes
              </Link>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="moroccan-card p-6"
            >
              <h2 className="font-amiri text-xl font-bold text-majorelle-900 mb-4">
                Actions Rapides
              </h2>
              <div className="space-y-3">
                <Link 
                  to="/therapist/requests"
                  className="flex items-center justify-between p-4 bg-majorelle-50 rounded-moroccan hover:bg-majorelle-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-majorelle-600" />
                    <span className="text-majorelle-800 font-medium">Nouvelles demandes</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-majorelle-400" />
                </Link>
                <Link 
                  to="/therapist/chat"
                  className="flex items-center justify-between p-4 bg-terre-50 rounded-moroccan-reverse hover:bg-terre-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 text-terre-600" />
                    <span className="text-terre-800 font-medium">Messages</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-terre-400" />
                </Link>
                <div className="flex items-center justify-between p-4 bg-safran-50 rounded-moroccan hover:bg-safran-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-safran-600" />
                    <span className="text-safran-800 font-medium">Statistiques</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-safran-400" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TherapistDashboard
