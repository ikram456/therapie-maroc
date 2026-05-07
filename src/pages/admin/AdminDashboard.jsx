import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Users, Stethoscope, Calendar, TrendingUp, 
  Shield, AlertTriangle, CheckCircle, XCircle,
  DollarSign, Activity, BarChart3, PieChart
} from 'lucide-react'

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('week')

  // Mock statistics
  const stats = [
    { label: "Patients totaux", value: 245, change: "+12%", icon: <Users className="w-6 h-6" />, color: "bg-majorelle-500" },
    { label: "Thérapeutes", value: 48, change: "+5%", icon: <Stethoscope className="w-6 h-6" />, color: "bg-terre-500" },
    { label: "Séances ce mois", value: 186, change: "+23%", icon: <Calendar className="w-6 h-6" />, color: "bg-safran-500" },
    { label: "Revenus (MAD)", value: "74,400", change: "+18%", icon: <DollarSign className="w-6 h-6" />, color: "bg-green-500" },
  ]

  // Mock recent activities
  const recentActivities = [
    { id: 1, type: 'user_registered', user: "Ahmed Benjelloun", role: "patient", time: "Il y a 5 min" },
    { id: 2, type: 'therapist_verified', user: "Dr. Fatima Alaoui", role: "therapist", time: "Il y a 15 min" },
    { id: 3, type: 'session_completed', user: "Sara El Fassi", role: "patient", time: "Il y a 30 min" },
    { id: 4, type: 'payment_received', user: "Karim Benali", amount: 400, time: "Il y a 1h" },
    { id: 5, type: 'user_registered', user: "Laila Bennani", role: "patient", time: "Il y a 2h" },
  ]

  // Mock pending verifications
  const pendingVerifications = [
    {
      id: 1,
      name: "Dr. Omar El Harrak",
      specialty: "Psychiatrie",
      licenseNumber: "PSY-2024-089",
      education: "Doctorat en Psychiatrie - Université de Rabat",
      experience: 8,
      submittedDate: "2026-05-06",
      documents: ["licence.pdf", "diplome.pdf", "cv.pdf"]
    },
    {
      id: 2,
      name: "Dr. Nadia Fassi",
      specialty: "Thérapie familiale",
      licenseNumber: "PSY-2024-090",
      education: "Master en Thérapie Familiale - Université de Casablanca",
      experience: 5,
      submittedDate: "2026-05-07",
      documents: ["licence.pdf", "diplome.pdf"]
    }
  ]

  // Mock chart data (simplified)
  const weeklySessions = [
    { day: 'Lun', sessions: 12 },
    { day: 'Mar', sessions: 19 },
    { day: 'Mer', sessions: 15 },
    { day: 'Jeu', sessions: 22 },
    { day: 'Ven', sessions: 18 },
    { day: 'Sam', sessions: 8 },
    { day: 'Dim', sessions: 5 },
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_registered': return <Users className="w-4 h-4 text-majorelle-500" />
      case 'therapist_verified': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'session_completed': return <Calendar className="w-4 h-4 text-safran-500" />
      case 'payment_received': return <DollarSign className="w-4 h-4 text-terre-500" />
      default: return <Activity className="w-4 h-4 text-majorelle-500" />
    }
  }

  const getActivityText = (activity) => {
    switch (activity.type) {
      case 'user_registered': return `Nouveau ${activity.role} inscrit`
      case 'therapist_verified': return `Thérapeute vérifié`
      case 'session_completed': return `Séance terminée`
      case 'payment_received': return `Paiement reçu (${activity.amount} MAD)`
      default: return 'Activité'
    }
  }

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
                <Shield className="w-8 h-8 inline mr-3" />
                Tableau de Bord Administrateur
              </h1>
              <p className="text-majorelle-600">
                Vue d'ensemble de la plateforme Thérapie Maroc
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              {['day', 'week', 'month', 'year'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-moroccan text-sm font-medium transition-all ${
                    timeRange === range
                      ? 'bg-majorelle-500 text-white shadow-md'
                      : 'bg-white text-majorelle-700 hover:bg-majorelle-50'
                  }`}
                >
                  {range === 'day' ? 'Jour' : range === 'week' ? 'Semaine' : range === 'month' ? 'Mois' : 'Année'}
                </button>
              ))}
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
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center text-white`}>
                  {stat.icon}
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="font-amiri text-3xl font-bold text-majorelle-900">{stat.value}</p>
              <p className="text-majorelle-600 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sessions Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="moroccan-card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-amiri text-2xl font-bold text-majorelle-900">
                  <BarChart3 className="w-6 h-6 inline mr-2" />
                  Activité des Séances
                </h2>
                <span className="text-sm text-majorelle-500">Cette semaine</span>
              </div>

              <div className="flex items-end justify-between h-48 space-x-2">
                {weeklySessions.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(item.sessions / 25) * 100}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="w-full bg-gradient-to-t from-majorelle-500 to-majorelle-300 rounded-t-lg relative group"
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-majorelle-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.sessions}
                      </div>
                    </motion.div>
                    <span className="text-xs text-majorelle-600 mt-2">{item.day}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Pending Verifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="moroccan-card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-amiri text-2xl font-bold text-majorelle-900">
                  <AlertTriangle className="w-6 h-6 inline mr-2" />
                  Vérifications en Attente
                </h2>
                <span className="bg-terre-500 text-white text-sm px-3 py-1 rounded-full">
                  {pendingVerifications.length} en attente
                </span>
              </div>

              <div className="space-y-4">
                {pendingVerifications.map((therapist) => (
                  <div key={therapist.id} className="bg-cream-50 rounded-moroccan p-4 border border-safran-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 bg-majorelle-100 rounded-full flex items-center justify-center">
                            <Stethoscope className="w-5 h-5 text-majorelle-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-majorelle-900">{therapist.name}</h3>
                            <p className="text-sm text-majorelle-600">{therapist.specialty}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <p className="text-majorelle-600">
                            <span className="font-medium">Licence:</span> {therapist.licenseNumber}
                          </p>
                          <p className="text-majorelle-600">
                            <span className="font-medium">Expérience:</span> {therapist.experience} ans
                          </p>
                          <p className="text-majorelle-600 col-span-2">
                            <span className="font-medium">Formation:</span> {therapist.education}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {therapist.documents.map((doc, i) => (
                            <span key={i} className="text-xs bg-safran-100 text-safran-700 px-2 py-1 rounded-full">
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-moroccan text-sm font-medium transition-colors flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Vérifier
                        </button>
                        <button className="bg-cream-200 hover:bg-cream-300 text-majorelle-700 px-4 py-2 rounded-moroccan-reverse text-sm font-medium transition-colors flex items-center">
                          <XCircle className="w-4 h-4 mr-1" />
                          Refuser
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="moroccan-card p-6"
            >
              <h2 className="font-amiri text-xl font-bold text-majorelle-900 mb-4">
                <Activity className="w-5 h-5 inline mr-2" />
                Activité Récente
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-cream-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div>
                      <p className="text-sm text-majorelle-800">{getActivityText(activity)}</p>
                      <p className="text-xs text-majorelle-500">{activity.user}</p>
                      <p className="text-xs text-majorelle-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="moroccan-card p-6"
            >
              <h2 className="font-amiri text-xl font-bold text-majorelle-900 mb-4">
                Gestion Rapide
              </h2>
              <div className="space-y-3">
                <Link 
                  to="/admin/users"
                  className="flex items-center justify-between p-4 bg-majorelle-50 rounded-moroccan hover:bg-majorelle-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-majorelle-600" />
                    <span className="text-majorelle-800 font-medium">Gérer les patients</span>
                  </div>
                  <span className="text-majorelle-500">245</span>
                </Link>
                <Link 
                  to="/admin/therapists"
                  className="flex items-center justify-between p-4 bg-terre-50 rounded-moroccan-reverse hover:bg-terre-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Stethoscope className="w-5 h-5 text-terre-600" />
                    <span className="text-terre-800 font-medium">Gérer les thérapeutes</span>
                  </div>
                  <span className="text-terre-500">48</span>
                </Link>
                <div className="flex items-center justify-between p-4 bg-safran-50 rounded-moroccan hover:bg-safran-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <PieChart className="w-5 h-5 text-safran-600" />
                    <span className="text-safran-800 font-medium">Rapports financiers</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
