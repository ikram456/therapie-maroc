import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { 
  Heart, MessageCircle, Calendar, User, Clock, 
  Star, ChevronRight, Bell, Search, Filter 
} from 'lucide-react'

const PatientDashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data
  const upcomingSessions = [
    {
      id: 1,
      therapistName: "Dr. Fatima Alaoui",
      specialty: "Psychologie clinique",
      date: "2026-05-10",
      time: "14:00",
      type: "Vidéo",
      status: "confirmed"
    }
  ]

  const recentTherapists = [
    {
      id: 1,
      name: "Dr. Fatima Alaoui",
      specialty: "Psychologie clinique",
      rating: 4.9,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
      status: "connected"
    },
    {
      id: 2,
      name: "Dr. Karim Benali",
      specialty: "Thérapie cognitivo-comportementale",
      rating: 4.7,
      reviews: 32,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop",
      status: "pending"
    }
  ]

  const notifications = [
    { id: 1, message: "Dr. Alaoui a accepté votre demande", time: "Il y a 2h", type: "success" },
    { id: 2, message: "Rappel: Séance demain à 14h", time: "Il y a 5h", type: "info" },
  ]

  const stats = [
    { label: "Séances complétées", value: 12, icon: <Calendar className="w-5 h-5" />, color: "bg-majorelle-500" },
    { label: "Messages non lus", value: 3, icon: <MessageCircle className="w-5 h-5" />, color: "bg-terre-500" },
    { label: "Thérapeutes", value: 2, icon: <User className="w-5 h-5" />, color: "bg-safran-500" },
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
                Bonjour, {user?.firstName || 'Patient'} 👋
              </h1>
              <p className="text-majorelle-600">
                Voici un aperçu de votre parcours de bien-être
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <button className="relative p-3 bg-white rounded-moroccan shadow-md hover:shadow-lg transition-shadow">
                <Bell className="w-6 h-6 text-majorelle-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-terre-500 text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                  Prochaines Séances
                </h2>
                <Link to="/patient/booking" className="text-terre-600 hover:text-terre-800 font-medium text-sm">
                  Voir tout
                </Link>
              </div>

              {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="bg-cream-50 rounded-moroccan p-4 border border-safran-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-majorelle-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-majorelle-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-majorelle-900">{session.therapistName}</h3>
                            <p className="text-sm text-majorelle-600">{session.specialty}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-majorelle-900">{session.date}</p>
                          <p className="text-sm text-majorelle-600">{session.time}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="inline-flex items-center px-3 py-1 bg-safran-100 text-safran-700 rounded-full text-sm">
                          <Video className="w-4 h-4 mr-1" />
                          {session.type}
                        </span>
                        <Link 
                          to={`/patient/chat/${session.id}`}
                          className="moroccan-btn-primary text-sm py-2 px-4"
                        >
                          Rejoindre
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-safran-300 mx-auto mb-4" />
                  <p className="text-majorelle-600">Aucune séance prévue</p>
                  <Link to="/patient/therapists" className="text-terre-600 hover:underline mt-2 inline-block">
                    Réserver une séance
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Recent Therapists */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="moroccan-card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-amiri text-2xl font-bold text-majorelle-900">
                  <Heart className="w-6 h-6 inline mr-2" />
                  Mes Thérapeutes
                </h2>
                <Link to="/patient/therapists" className="text-terre-600 hover:text-terre-800 font-medium text-sm">
                  Trouver un thérapeute
                </Link>
              </div>

              <div className="space-y-4">
                {recentTherapists.map((therapist) => (
                  <div key={therapist.id} className="flex items-center justify-between bg-cream-50 rounded-moroccan p-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={therapist.image} 
                        alt={therapist.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-safran-200"
                      />
                      <div>
                        <h3 className="font-semibold text-majorelle-900">{therapist.name}</h3>
                        <p className="text-sm text-majorelle-600">{therapist.specialty}</p>
                        <div className="flex items-center mt-1">
                          <Star className="w-4 h-4 text-safran-500 fill-current" />
                          <span className="text-sm text-majorelle-700 ml-1">{therapist.rating}</span>
                          <span className="text-sm text-majorelle-500 ml-1">({therapist.reviews} avis)</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {therapist.status === 'connected' ? (
                        <Link 
                          to={`/patient/chat/${therapist.id}`}
                          className="p-2 bg-majorelle-100 text-majorelle-600 rounded-full hover:bg-majorelle-200 transition-colors"
                        >
                          <MessageCircle className="w-5 h-5" />
                        </Link>
                      ) : (
                        <span className="px-3 py-1 bg-safran-100 text-safran-700 rounded-full text-sm">
                          En attente
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="moroccan-card p-6"
            >
              <h2 className="font-amiri text-xl font-bold text-majorelle-900 mb-4">
                <Bell className="w-5 h-5 inline mr-2" />
                Notifications
              </h2>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex items-start space-x-3 p-3 bg-cream-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notif.type === 'success' ? 'bg-safran-500' : 'bg-majorelle-500'
                    }`} />
                    <div>
                      <p className="text-sm text-majorelle-800">{notif.message}</p>
                      <p className="text-xs text-majorelle-500 mt-1">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
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
                  to="/patient/therapists"
                  className="flex items-center justify-between p-4 bg-majorelle-50 rounded-moroccan hover:bg-majorelle-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Search className="w-5 h-5 text-majorelle-600" />
                    <span className="text-majorelle-800 font-medium">Trouver un thérapeute</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-majorelle-400" />
                </Link>
                <Link 
                  to="/patient/questionnaire"
                  className="flex items-center justify-between p-4 bg-terre-50 rounded-moroccan-reverse hover:bg-terre-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Heart className="w-5 h-5 text-terre-600" />
                    <span className="text-terre-800 font-medium">Refaire le questionnaire</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-terre-400" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard
