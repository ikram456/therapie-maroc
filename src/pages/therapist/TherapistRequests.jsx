import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Users, CheckCircle, XCircle, Clock, 
  Filter, Search, AlertTriangle, MessageCircle 
} from 'lucide-react'

const TherapistRequests = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const requests = [
    {
      id: 1,
      patientName: "Youssef Amrani",
      age: 32,
      gender: "homme",
      requestDate: "2026-05-07",
      reason: "Anxiété sociale et difficultés relationnelles au travail",
      urgency: "normal",
      status: "pending",
      questionnaire: {
        emotional: "Souvent triste ou anxieux",
        sleep: "Difficile à trouver",
        stress: "Fréquemment",
        activity: "Modérément",
        relations: "Tendues"
      }
    },
    {
      id: 2,
      patientName: "Laila Bennani",
      age: 26,
      gender: "femme",
      requestDate: "2026-05-07",
      reason: "Dépression légère suite à un burn-out",
      urgency: "high",
      status: "pending",
      questionnaire: {
        emotional: "Souvent triste ou anxieux",
        sleep: "Insomnie chronique",
        stress: "Presque constamment",
        activity: "Sévèrement",
        relations: "Très isolé"
      }
    },
    {
      id: 3,
      patientName: "Omar El Harrak",
      age: 45,
      gender: "homme",
      requestDate: "2026-05-06",
      reason: "Stress post-traumatique",
      urgency: "high",
      status: "accepted",
      questionnaire: {
        emotional: "Très difficile",
        sleep: "Insomnie chronique",
        stress: "Presque constamment",
        activity: "Sévèrement",
        relations: "Très isolé"
      }
    },
    {
      id: 4,
      patientName: "Nadia Fassi",
      age: 29,
      gender: "femme",
      requestDate: "2026-05-05",
      reason: "Problèmes de couple",
      urgency: "normal",
      status: "rejected",
      questionnaire: {
        emotional: "Plutôt stable",
        sleep: "Correct",
        stress: "Occasionnellement",
        activity: "Légèrement",
        relations: "Tendues"
      }
    }
  ]

  const filteredRequests = requests.filter(req => {
    const matchesFilter = filter === 'all' || req.status === filter
    const matchesSearch = req.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.reason.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-terre-100 text-terre-700 border-terre-300'
      case 'normal': return 'bg-safran-100 text-safran-700 border-safran-300'
      default: return 'bg-green-100 text-green-700 border-green-300'
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            <CheckCircle className="w-4 h-4 mr-1" />
            Accepté
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center px-3 py-1 bg-cream-200 text-cream-600 rounded-full text-sm">
            <XCircle className="w-4 h-4 mr-1" />
            Refusé
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 bg-safran-100 text-safran-700 rounded-full text-sm">
            <Clock className="w-4 h-4 mr-1" />
            En attente
          </span>
        )
    }
  }

  return (
    <div className="min-h-screen bg-cream-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/therapist/dashboard" className="flex items-center text-majorelle-600 hover:text-majorelle-800 mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-amiri text-4xl font-bold text-majorelle-900 mb-2">
                Demandes des Patients
              </h1>
              <p className="text-majorelle-600">
                Gérez les demandes de consultation de vos patients
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <span className="bg-terre-500 text-white text-sm px-3 py-1 rounded-full">
                {requests.filter(r => r.status === 'pending').length} en attente
              </span>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="moroccan-card p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-majorelle-400" />
              <input
                type="text"
                placeholder="Rechercher par nom ou motif..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="moroccan-input pl-12"
              />
            </div>
            <div className="flex space-x-2">
              {['all', 'pending', 'accepted', 'rejected'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-moroccan text-sm font-medium transition-all ${
                    filter === f
                      ? 'bg-majorelle-500 text-white shadow-md'
                      : 'bg-cream-100 text-majorelle-700 hover:bg-majorelle-100'
                  }`}
                >
                  {f === 'all' ? 'Tout' : f === 'pending' ? 'En attente' : f === 'accepted' ? 'Acceptés' : 'Refusés'}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Requests List */}
        <div className="space-y-6">
          {filteredRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="moroccan-card p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                {/* Patient Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-majorelle-100 rounded-full flex items-center justify-center">
                        <span className="font-amiri text-xl font-bold text-majorelle-600">
                          {request.patientName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-amiri text-xl font-bold text-majorelle-900">{request.patientName}</h3>
                        <p className="text-sm text-majorelle-600">{request.age} ans • {request.gender}</p>
                        <p className="text-xs text-majorelle-500 mt-1">Demande du {request.requestDate}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {getStatusBadge(request.status)}
                      <span className={`text-xs px-2 py-1 rounded-full border ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency === 'high' ? (
                          <AlertTriangle className="w-3 h-3 inline mr-1" />
                        ) : null}
                        {request.urgency === 'high' ? 'Urgent' : 'Normal'}
                      </span>
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="bg-cream-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-majorelle-700">
                      <span className="font-semibold">Motif:</span> {request.reason}
                    </p>
                  </div>

                  {/* Questionnaire Summary */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {Object.entries(request.questionnaire).map(([key, value]) => (
                      <div key={key} className="bg-cream-100 rounded-lg p-2 text-center">
                        <p className="text-xs text-majorelle-500 capitalize">{key}</p>
                        <p className="text-xs font-medium text-majorelle-800 mt-1">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {request.status === 'pending' && (
                  <div className="flex lg:flex-col space-x-3 lg:space-x-0 lg:space-y-3">
                    <button className="flex-1 lg:flex-none bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-moroccan font-medium transition-colors flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Accepter
                    </button>
                    <button className="flex-1 lg:flex-none bg-cream-200 hover:bg-cream-300 text-majorelle-700 py-3 px-6 rounded-moroccan-reverse font-medium transition-colors flex items-center justify-center">
                      <XCircle className="w-5 h-5 mr-2" />
                      Refuser
                    </button>
                  </div>
                )}

                {request.status === 'accepted' && (
                  <Link 
                    to={`/therapist/chat/${request.id}`}
                    className="moroccan-btn-primary flex items-center justify-center"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Ouvrir le chat
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TherapistRequests
