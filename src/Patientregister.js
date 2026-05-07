import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { User, Mail, Lock, Phone, Calendar, ArrowRight, Heart } from 'lucide-react'

const PatientRegister = () => {
  const navigate = useNavigate()
  const { registerPatient } = useAuth()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
    gender: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [firebaseError, setFirebaseError] = useState('')

  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis'
    if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis'
    if (!formData.email.trim()) newErrors.email = 'Email requis'
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email invalide'
    if (!formData.password) newErrors.password = 'Mot de passe requis'
    else if (formData.password.length < 6) newErrors.password = 'Minimum 6 caractères'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
    if (!formData.phone) newErrors.phone = 'Téléphone requis'
    if (!formData.birthDate) newErrors.birthDate = 'Date de naissance requise'
    if (!formData.gender) newErrors.gender = 'Genre requis'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setFirebaseError('')
    try {
      await registerPatient(formData)
      navigate('/patient/questionnaire')
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setFirebaseError('Cet email est déjà utilisé')
      } else {
        setFirebaseError(error.message || 'Une erreur est survenue')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-100 via-majorelle-50 to-terre-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
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
            <h1 className="font-amiri text-4xl font-bold text-majorelle-900 mb-3">
              Créer un Compte Patient
            </h1>
            <p className="text-majorelle-600">
              Rejoignez notre communauté et commencez votre parcours de bien-être
            </p>
          </div>

          {firebaseError && (
            <div className="bg-terre-50 border border-terre-300 text-terre-700 px-4 py-3 rounded-lg mb-6">
              {firebaseError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-majorelle-800 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`moroccan-input ${errors.firstName ? 'border-terre-500' : ''}`}
                  placeholder="Votre prénom"
                />
                {errors.firstName && <p className="text-terre-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-majorelle-800 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nom
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`moroccan-input ${errors.lastName ? 'border-terre-500' : ''}`}
                  placeholder="Votre nom"
                />
                {errors.lastName && <p className="text-terre-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-majorelle-800 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`moroccan-input ${errors.email ? 'border-terre-500' : ''}`}
                placeholder="votre@email.com"
              />
              {errors.email && <p className="text-terre-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-majorelle-800 mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`moroccan-input ${errors.password ? 'border-terre-500' : ''}`}
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-terre-500 text-sm mt-1">{errors.password}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-majorelle-800 mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Confirmer
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`moroccan-input ${errors.confirmPassword ? 'border-terre-500' : ''}`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && <p className="text-terre-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-majorelle-800 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`moroccan-input ${errors.phone ? 'border-terre-500' : ''}`}
                  placeholder="+212 6XX-XXXXXX"
                />
                {errors.phone && <p className="text-terre-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-majorelle-800 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Date de naissance
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className={`moroccan-input ${errors.birthDate ? 'border-terre-500' : ''}`}
                />
                {errors.birthDate && <p className="text-terre-500 text-sm mt-1">{errors.birthDate}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-majorelle-800 mb-2">Genre</label>
              <div className="flex space-x-4">
                {['homme', 'femme'].map((g) => (
                  <label key={g} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      className="w-4 h-4 text-majorelle-500 focus:ring-majorelle-500"
                    />
                    <span className="capitalize text-majorelle-700">{g}</span>
                  </label>
                ))}
              </div>
              {errors.gender && <p className="text-terre-500 text-sm mt-1">{errors.gender}</p>}
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
                  <span>Continuer vers le Questionnaire</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-majorelle-600">
            Déjà un compte ?{' '}
            <Link to="/patient/login" className="text-terre-600 hover:text-terre-800 font-semibold underline">
              Se connecter
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default PatientRegister