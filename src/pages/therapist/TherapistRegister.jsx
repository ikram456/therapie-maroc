import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { 
  User, Mail, Lock, Phone, Stethoscope, GraduationCap, 
  MapPin, FileText, ArrowRight, Award 
} from 'lucide-react'

const TherapistRegister = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    specialty: '',
    licenseNumber: '',
    education: '',
    experience: '',
    location: '',
    languages: [],
    bio: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)

  const specialties = [
    'Psychologie clinique',
    'Thérapie cognitivo-comportementale',
    'Psychanalyse',
    'Thérapie familiale',
    'Hypnothérapie',
    'Coaching',
    'Thérapie de couple',
    'Psychiatrie'
  ]

  const availableLanguages = ['Français', 'Arabe', 'Anglais', 'Espagnol', 'Tamazight']

  const validateStep1 = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis'
    if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis'
    if (!formData.email.trim()) newErrors.email = 'Email requis'
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email invalide'
    if (!formData.password) newErrors.password = 'Mot de passe requis'
    else if (formData.password.length < 6) newErrors.password = 'Minimum 6 caractères'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
    if (!formData.phone) newErrors.phone = 'Téléphone requis'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}
    if (!formData.specialty) newErrors.specialty = 'Spécialité requise'
    if (!formData.licenseNumber) newErrors.licenseNumber = 'Numéro de licence requis'
    if (!formData.education) newErrors.education = 'Formation requise'
    if (!formData.experience) newErrors.experience = 'Expérience requise'
    if (!formData.location) newErrors.location = 'Ville requise'
    if (formData.languages.length === 0) newErrors.languages = 'Au moins une langue requise'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    }
  }

  const handlePrev = () => {
    setStep(1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep2()) return

    setIsLoading(true)
    setTimeout(() => {
      const userData = {
        id: 1,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        specialty: formData.specialty,
        licenseNumber: formData.licenseNumber,
        status: 'pending'
      }
      login(userData, 'therapist')
      setIsLoading(false)
      navigate('/therapist/dashboard')
    }, 1500)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const toggleLanguage = (lang) => {
    const newLanguages = formData.languages.includes(lang)
      ? formData.languages.filter(l => l !== lang)
      : [...formData.languages, lang]
    setFormData({ ...formData, languages: newLanguages })
    if (errors.languages) {
      setErrors({ ...errors, languages: '' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-100 via-terre-50 to-majorelle-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="moroccan-card p-8 md:p-12"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-moroccan rounded-full flex items-center justify-center mx-auto mb-6">
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-amiri text-4xl font-bold text-majorelle-900 mb-3">
              Inscription Thérapeute
            </h1>
            <p className="text-majorelle-600">
              Rejoignez notre réseau de professionnels de santé mentale
            </p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center mb-8">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= 1 ? 'bg-majorelle-500 text-white' : 'bg-cream-200 text-cream-400'
            }`}>1</div>
            <div className={`w-20 h-1 ${step >= 2 ? 'bg-majorelle-500' : 'bg-cream-200'}`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= 2 ? 'bg-majorelle-500 text-white' : 'bg-cream-200 text-cream-400'
            }`}>2</div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="font-amiri text-2xl font-bold text-majorelle-900 mb-6">
                  Informations Personnelles
                </h2>

                {/* Name Row */}
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

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-majorelle-800 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Professionnel
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

                {/* Password Row */}
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

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-majorelle-800 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Téléphone Professionnel
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`moroccan-input ${errors.phone ? 'border-terre-500' : ''}`}
                    placeholder="+212 5XX-XXXXXX"
                  />
                  {errors.phone && <p className="text-terre-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full moroccan-btn-primary py-4 text-lg flex items-center justify-center space-x-2"
                >
                  <span>Continuer</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="font-amiri text-2xl font-bold text-majorelle-900 mb-6">
                  Informations Professionnelles
                </h2>

                {/* Specialty */}
                <div>
                  <label className="block text-sm font-semibold text-majorelle-800 mb-2">
                    <Stethoscope className="w-4 h-4 inline mr-2" />
                    Spécialité
                  </label>
                  <select
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    className={`moroccan-input ${errors.specialty ? 'border-terre-500' : ''}`}
                  >
                    <option value="">Sélectionnez votre spécialité</option>
                    {specialties.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.specialty && <p className="text-terre-500 text-sm mt-1">{errors.specialty}</p>}
                </div>

                {/* License & Education Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-majorelle-800 mb-2">
                      <Award className="w-4 h-4 inline mr-2" />
                      Numéro de Licence
                    </label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      className={`moroccan-input ${errors.licenseNumber ? 'border-terre-500' : ''}`}
                      placeholder="Ex: PSY-12345"
                    />
                    {errors.licenseNumber && <p className="text-terre-500 text-sm mt-1">{errors.licenseNumber}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-majorelle-800 mb-2">
                      <GraduationCap className="w-4 h-4 inline mr-2" />
                      Formation
                    </label>
                    <input
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      className={`moroccan-input ${errors.education ? 'border-terre-500' : ''}`}
                      placeholder="Ex: Doctorat en Psychologie"
                    />
                    {errors.education && <p className="text-terre-500 text-sm mt-1">{errors.education}</p>}
                  </div>
                </div>

                {/* Experience & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-majorelle-800 mb-2">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Années d'expérience
                    </label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className={`moroccan-input ${errors.experience ? 'border-terre-500' : ''}`}
                      placeholder="Ex: 5"
                    />
                    {errors.experience && <p className="text-terre-500 text-sm mt-1">{errors.experience}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-majorelle-800 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Ville
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`moroccan-input ${errors.location ? 'border-terre-500' : ''}`}
                      placeholder="Ex: Casablanca"
                    />
                    {errors.location && <p className="text-terre-500 text-sm mt-1">{errors.location}</p>}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-sm font-semibold text-majorelle-800 mb-2">
                    Langues Parlées
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableLanguages.map(lang => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleLanguage(lang)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          formData.languages.includes(lang)
                            ? 'bg-majorelle-500 text-white shadow-md'
                            : 'bg-cream-100 text-majorelle-700 hover:bg-majorelle-100'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                  {errors.languages && <p className="text-terre-500 text-sm mt-1">{errors.languages}</p>}
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-semibold text-majorelle-800 mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Biographie Professionnelle
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="moroccan-input resize-none"
                    placeholder="Décrivez votre approche thérapeutique et votre expérience..."
                  />
                </div>

                {/* Buttons */}
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex-1 py-4 bg-cream-100 text-majorelle-700 rounded-moroccan font-semibold hover:bg-cream-200 transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 moroccan-btn-primary py-4 text-lg flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>Finaliser l'inscription</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </form>

          {/* Login Link */}
          <p className="text-center mt-8 text-majorelle-600">
            Déjà un compte ?{' '}
            <Link to="/therapist/login" className="text-terre-600 hover:text-terre-800 font-semibold underline">
              Se connecter
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default TherapistRegister
