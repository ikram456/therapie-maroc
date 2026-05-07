import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Stethoscope, Search, Filter, MoreVertical, 
  Ban, CheckCircle, Star, Mail, Phone, MapPin, Award
} from 'lucide-react'

const AdminTherapists = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const therapists = [
    {
      id: 1,
      name: "Dr. Fatima Alaoui",
      email: "fatima.alaoui@email.com",
      phone: "+212 612-345678",
      specialty: "Psychologie clinique",
      location: "Casablanca",
      rating: 4.9,
      reviews: 45,
      experience: 12,
      status: "verified",
      licenseNumber: "PSY-2014-001",
      patientsCount: 15,
      sessionsCount: 128,
      revenue: 51200
    },
    {
      id: 2,
      name: "Dr. Karim Benali",
      email: "karim.benali@email.com",
      phone: "+212 623-456789",
      specialty: "Thérapie cognitivo-comportementale",
      location: "Rabat",
      rating: 4.7,
      reviews: 32,
      experience: 8,
      status: "verified",
      licenseNumber: "PSY-2018-045",
      patientsCount: 12,
      sessionsCount: 96,
      revenue: 33600
    },
    {
      id: 3,
      name: "Dr. Omar El Harrak",
      email: "omar.harrak@email.com",
      phone: "+212 634-567890",
      specialty: "Psychiatrie",
      location: "Marrakech",
      rating: 0,
      reviews: 0,
      experience: 8,
      status: "pending",
      licenseNumber: "PSY-2024-089",
      patientsCount: 0,
      sessionsCount: 0,
      revenue: 0
    },
    {
      id: 4,
      name: "Dr. Nadia Fassi",
      email: "nadia.fassi@email.com",
      phone: "+212 645-678901",
      specialty: "Thérapie familiale",
      location: "Fès",
      rating: 0,
      reviews: 0,
      experience: 5,
      status: "pending",
      licenseNumber: "PSY-2024-090",
      patientsCount: 0,
      sessionsCount: 0,
      revenue: 0
    },
    {
      id: 5,
      name: "Dr. Youssef El Amrani",
      email: "youssef.amrani@email.com",
      phone: "+212 656-789012",
      specialty: "Hypnothérapie",
      location: "Tanger",
      rating: 4.6,
      reviews: 19,
      experience: 6,
      status: "verified",
      licenseNumber: "PSY-2020-067",
      patientsCount: 8,
      sessionsCount: 64,
      revenue: 19200
    }
  ]

  const filteredTherapists = therapists.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         therapist.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         therapist.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || therapist.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'verified':
        return <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs"><CheckCircle className="w-3 h-3 mr-1" />Vérifié</span>
      case 'pending':
        return <span className="inline-flex items-center px-2 py-1 bg-safran-100 text-safran-700 rounded-full text-xs"><Award className="w-3 h-3 mr-1" />En attente</span>
      case 'suspended':
        return <span className="inline-flex items-center px-2 py-1 bg-terre-100 text-terre-700 rounded-full text-xs"><Ban className="w-3 h-3 mr-1" />Suspendu</span>
      default:
        return null
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
          <Link to="/admin/dashboard" className="flex items-center text-majorelle-600 hover:text-majorelle-800 mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-amiri text-4xl font-bold text-majorelle-900 mb-2">
                <Stethoscope className="w-8 h-8 inline mr-3" />
                Gestion des Thérapeutes
              </h1>
              <p className="text-majorelle-600">
                {filteredTherapists.length} thérapeute{filteredTherapists.length > 1 ? 's' : ''} trouvé{filteredTherapists.length > 1 ? 's' : ''}
              </p>
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
                placeholder="Rechercher par nom, spécialité ou licence..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="moroccan-input pl-12"
              />
            </div>
            <div className="flex space-x-2">
              {['all', 'verified', 'pending', 'suspended'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-moroccan text-sm font-medium transition-all ${
                    filterStatus === status
                      ? 'bg-majorelle-500 text-white shadow-md'
                      : 'bg-cream-100 text-majorelle-700 hover:bg-majorelle-100'
                  }`}
                >
                  {status === 'all' ? 'Tout' : status === 'verified' ? 'Vérifiés' : status === 'pending' ? 'En attente' : 'Suspendus'}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Therapists Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="moroccan-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-cream-100 border-b border-safran-200">
                  <th className="text-left p-4 text-sm font-semibold text-majorelle-800">Thérapeute</th>
                  <th className="text-left p-4 text-sm font-semibold text-majorelle-800">Spécialité</th>
                  <th className="text-left p-4 text-sm font-semibold text-majorelle-800">Licence</th>
                  <th className="text-left p-4 text-sm font-semibold text-majorelle-800">Note</th>
                  <th className="text-left p-4 text-sm font-semibold text-majorelle-800">Patients</th>
                  <th className="text-left p-4 text-sm font-semibold text-majorelle-800">Revenus</th>
                  <th className="text-left p-4 text-sm font-semibold text-majorelle-800">Statut</th>
                  <th className="text-left p-4 text-sm font-semibold text-majorelle-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTherapists.map((therapist, index) => (
                  <motion.tr
                    key={therapist.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-safran-100 hover:bg-cream-50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-terre-100 rounded-full flex items-center justify-center">
                          <Stethoscope className="w-5 h-5 text-terre-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-majorelle-900">{therapist.name}</p>
                          <p className="text-xs text-majorelle-500 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />{therapist.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-majorelle-700">{therapist.specialty}</p>
                      <p className="text-xs text-majorelle-500">{therapist.experience} ans d'expérience</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-majorelle-700 font-mono">{therapist.licenseNumber}</p>
                    </td>
                    <td className="p-4">
                      {therapist.rating > 0 ? (
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-safran-500 fill-current" />
                          <span className="text-sm font-semibold text-majorelle-900 ml-1">{therapist.rating}</span>
                          <span className="text-xs text-majorelle-500 ml-1">({therapist.reviews})</span>
                        </div>
                      ) : (
                        <span className="text-xs text-majorelle-400">Nouveau</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="text-center">
                        <p className="font-amiri text-lg font-bold text-majorelle-900">{therapist.patientsCount}</p>
                        <p className="text-xs text-majorelle-500">{therapist.sessionsCount} séances</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-majorelle-900">{therapist.revenue.toLocaleString()} MAD</p>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(therapist.status)}
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        {therapist.status === 'pending' && (
                          <>
                            <button className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-terre-100 text-terre-600 rounded-full hover:bg-terre-200 transition-colors">
                              <Ban className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button className="p-2 text-majorelle-400 hover:text-majorelle-600 transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminTherapists
