import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Users, Search, Filter, MoreVertical, 
  Ban, CheckCircle, Mail, Phone, Calendar
} from 'lucide-react'

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const users = [
    {
      id: 1,
      name: "Ahmed Benjelloun",
      email: "ahmed.b@email.com",
      phone: "+212 612-345678",
      age: 28,
      gender: "homme",
      status: "active",
      registeredDate: "2026-04-15",
      sessionsCount: 12,
      lastActive: "2026-05-07"
    },
    {
      id: 2,
      name: "Sara El Fassi",
      email: "sara.f@email.com",
      phone: "+212 623-456789",
      age: 24,
      gender: "femme",
      status: "active",
      registeredDate: "2026-04-20",
      sessionsCount: 5,
      lastActive: "2026-05-07"
    },
    {
      id: 3,
      name: "Karim Idrissi",
      email: "karim.i@email.com",
      phone: "+212 634-567890",
      age: 35,
      gender: "homme",
      status: "inactive",
      registeredDate: "2026-03-10",
      sessionsCount: 0,
      lastActive: "2026-04-01"
    },
    {
      id: 4,
      name: "Laila Bennani",
      email: "laila.b@email.com",
      phone: "+212 645-678901",
      age: 26,
      gender: "femme",
      status: "active",
      registeredDate: "2026-05-01",
      sessionsCount: 2,
      lastActive: "2026-05-06"
    },
    {
      id: 5,
      name: "Youssef Amrani",
      email: "youssef.a@email.com",
      phone: "+212 656-789012",
      age: 32,
      gender: "homme",
      status: "suspended",
      registeredDate: "2026-02-20",
      sessionsCount: 8,
      lastActive: "2026-04-15"
    }
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs"><CheckCircle className="w-3 h-3 mr-1" />Actif</span>
      case 'inactive':
        return <span className="inline-flex items-center px-2 py-1 bg-cream-200 text-cream-600 rounded-full text-xs">Inactif</span>
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
                <Users className="w-8 h-8 inline mr-3" />
                Gestion des Patients
              </h1>
              <p className="text-majorelle-600">
                {filteredUsers.length} patient{filteredUsers.length > 1 ? 's' : ''} trouvé{filteredUsers.length > 1 ? 's' : ''}
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
                placeholder="Rechercher par nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="moroccan-input pl-12"
              />
            </div>
            <div className="flex space-x-2">
              {['all', 'active', 'inactive', 'suspended'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-moroccan text-sm font-medium transition-all ${
                    filterStatus === status
                      ? 'bg-majorelle-500 text-white shadow-md'
                      : 'bg-cream-100 text-majorelle-700 hover:bg-majorelle-100'
                  }`}
                >
                  {status === 'all' ? 'Tout' : status === 'active' ? 'Actifs' : status === 'inactive' ? 'Inactifs' : 'Suspendus'}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Users Table */}
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
                  <th className="text-left p-4 text-sm font-semibold text-majorelle-800">Patient</th>
                  <th className="text-left p-4 text-sm font-semibold text-majorelle-800">Contact</th>
                  <th className="text-left p-4 text-sm font-semibold text-majorelle-800">Inscription</th>
                  <th className="text-left p-4 text-sm font-semibold text-majorelle-800">Séances</th>
                  <th className="text-left p-4 text-sm font-semibold text-majorelle-800">Statut</th>
                  <th className="text-left p-4 text-sm font-semibold text-majorelle-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-safran-100 hover:bg-cream-50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-majorelle-100 rounded-full flex items-center justify-center">
                          <span className="font-amiri font-bold text-majorelle-600">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-majorelle-900">{user.name}</p>
                          <p className="text-xs text-majorelle-500">{user.age} ans • {user.gender}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="text-sm text-majorelle-700 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />{user.email}
                        </p>
                        <p className="text-sm text-majorelle-700 flex items-center">
                          <Phone className="w-3 h-3 mr-1" />{user.phone}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-majorelle-700">{user.registeredDate}</p>
                      <p className="text-xs text-majorelle-500">Dernière activité: {user.lastActive}</p>
                    </td>
                    <td className="p-4">
                      <span className="font-amiri text-xl font-bold text-majorelle-900">{user.sessionsCount}</span>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
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

export default AdminUsers
