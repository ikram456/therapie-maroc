import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Menu, X, User, LogOut, Heart, Stethoscope, Shield } from 'lucide-react'

const Navbar = () => {
  const { user, userType, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const getDashboardLink = () => {
    switch (userType) {
      case 'patient': return '/patient/dashboard'
      case 'therapist': return '/therapist/dashboard'
      case 'admin': return '/admin/dashboard'
      default: return '/'
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b-2 border-safran-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-moroccan rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="font-amiri text-2xl font-bold text-gradient">
              Thérapie Maroc
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {!user ? (
              <>
                <Link to="/patient/login" className="text-majorelle-600 hover:text-majorelle-800 font-medium transition-colors">
                  Espace Patient
                </Link>
                <Link to="/therapist/login" className="text-terre-600 hover:text-terre-800 font-medium transition-colors">
                  Espace Thérapeute
                </Link>
                <Link to="/admin/dashboard" className="text-safran-600 hover:text-safran-800 font-medium transition-colors">
                  <Shield className="w-5 h-5 inline mr-1" />
                  Admin
                </Link>
              </>
            ) : (
              <>
                <Link to={getDashboardLink()} className="flex items-center space-x-2 text-majorelle-600 hover:text-majorelle-800">
                  <User className="w-5 h-5" />
                  <span className="font-medium">Mon Espace</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-terre-600 hover:text-terre-800 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Déconnexion</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-majorelle-600 hover:bg-majorelle-50"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-safran-200">
          <div className="px-4 py-3 space-y-2">
            {!user ? (
              <>
                <Link to="/patient/login" className="block py-2 text-majorelle-600 font-medium">
                  <Heart className="w-4 h-4 inline mr-2" />
                  Espace Patient
                </Link>
                <Link to="/therapist/login" className="block py-2 text-terre-600 font-medium">
                  <Stethoscope className="w-4 h-4 inline mr-2" />
                  Espace Thérapeute
                </Link>
                <Link to="/admin/dashboard" className="block py-2 text-safran-600 font-medium">
                  <Shield className="w-4 h-4 inline mr-2" />
                  Administration
                </Link>
              </>
            ) : (
              <>
                <Link to={getDashboardLink()} className="block py-2 text-majorelle-600 font-medium">
                  <User className="w-4 h-4 inline mr-2" />
                  Mon Espace
                </Link>
                <button onClick={handleLogout} className="block py-2 text-terre-600 font-medium w-full text-left">
                  <LogOut className="w-4 h-4 inline mr-2" />
                  Déconnexion
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
