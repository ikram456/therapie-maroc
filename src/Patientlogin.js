import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { Mail, Lock, ArrowRight, Heart } from 'lucide-react'

const PatientLogin = () => {
  const navigate = useNavigate()
  const { loginPatient } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [firebaseError, setFirebaseError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email requis'
    if (!formData.password) newErrors.password = 'Mot de passe requis'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    setFirebaseError('')
    try {
      await loginPatient(formData.email, formData.password)
      navigate('/patient/dashboard')
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setFirebaseError('Email ou mot de passe incorrect')
      } else {
        setFirebaseError(error.message || 'Une erreur est survenue')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-100 via-majorelle-50 to-terre-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="moroccan-card p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-moroccan rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-amiri text-3xl font-bold text-majorelle-900 mb-3">
              Connexion Patient
            </h1>
            <p className="text-majorelle-600">
              Accédez à votre espace personnel
            </p>
          </div>

          {firebaseError && (
            <div className="bg-terre-50 border border-terre-300 text-terre-700 px-4 py-3 rounded-lg mb-6">
              {firebaseError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-majorelle-800 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`moroccan-input ${errors.email ? 'border-terre-500' : ''}`}
                placeholder="votre@email.com"
              />
              {errors.email && <p className="text-terre-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-majorelle-800 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Mot de passe
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className={`moroccan-input ${errors.password ? 'border-terre-500' : ''}`}
                placeholder="••••••••"
              />
              {errors.password && <p className="text-terre-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full moroccan-btn-primary py-4 text-lg flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-majorelle-600">
            Pas encore de compte ?{' '}
            <Link to="/patient/register" className="text-terre-600 hover:text-terre-800 font-semibold underline">
              S'inscrire
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default PatientLogin