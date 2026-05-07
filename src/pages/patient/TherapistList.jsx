import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, Star, MapPin, Clock, MessageCircle, ChevronRight, Heart } from 'lucide-react'

const TherapistList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [selectedLanguage, setSelectedLanguage] = useState('all')

  const specialties = [
    'all', 'Psychologie clinique', 'Thérapie cognitivo-comportementale', 
    'Psychanalyse', 'Thérapie familiale', 'Hypnothérapie', 'Coaching'
  ]

  const languages = ['all', 'Français', 'Arabe', 'Anglais', 'Espagnol']

  // Mock therapists data
  const therapists = [
    {
      id: 1,
      name: "Dr. Fatima Alaoui",
      specialty: "Psychologie clinique",
      languages: ["Français", "Arabe"],
      location: "Casablanca",
      rating: 4.9,
      reviews: 45,
      price: 400,
      experience: 12,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
      bio: "Spécialiste en traitement de l'anxiété et de la dépression avec une approche humaniste.",
      available: true,
      nextAvailable: "Aujourd'hui"
    },
    {
      id: 2,
      name: "Dr. Karim Benali",
      specialty: "Thérapie cognitivo-comportementale",
      languages: ["Français", "Anglais"],
      location: "Rabat",
      rating: 4.7,
      reviews: 32,
      price: 350,
      experience: 8,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop",
      bio: "Expert en TCC pour le traitement des phobies et des troubles obsessionnels.",
      available: true,
      nextAvailable: "Demain"
    },
    {
      id: 3,
      name: "Dr. Amina Bennani",
      specialty: "Thérapie familiale",
      languages: ["Français", "Arabe", "Anglais"],
      location: "Marrakech",
      rating: 4.8,
      reviews: 28,
      price: 450,
      experience: 15,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop",
      bio: "Médiateur familial et thérapeute de couple avec une approche systémique.",
      available: false,
      nextAvailable: "Dans 3 jours"
    },
    {
      id: 4,
      name: "Dr. Youssef El Amrani",
      specialty: "Hypnothérapie",
      languages: ["Français", "Arabe"],
      location: "Fès",
      rating: 4.6,
      reviews: 19,
      price: 300,
      experience: 6,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop",
      bio: "Hypnothérapeute certifié pour la gestion du stress et des addictions.",
      available: true,
      nextAvailable: "Aujourd'hui"
    }
  ]

  const filteredTherapists = therapists.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         therapist.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === 'all' || therapist.specialty === selectedSpecialty
    const matchesLanguage = selectedLanguage === 'all' || therapist.languages.includes(selectedLanguage)
    return matchesSearch && matchesSpecialty && matchesLanguage
  })

  return (
    <div className="min-h-screen bg-cream-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-amiri text-4xl font-bold text-majorelle-900 mb-2">
            Nos Thérapeutes
          </h1>
          <p className="text-majorelle-600">
            Trouvez le professionnel qui correspond à vos besoins
          </p>
        </motion.div>

        {/* Search & Filters */}
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
                placeholder="Rechercher par nom ou spécialité..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="moroccan-input pl-12"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="moroccan-input"
              >
                {specialties.map(s => (
                  <option key={s} value={s}>
                    {s === 'all' ? 'Toutes spécialités' : s}
                  </option>
                ))}
              </select>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="moroccan-input"
              >
                {languages.map(l => (
                  <option key={l} value={l}>
                    {l === 'all' ? 'Toutes langues' : l}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results count */}
        <p className="text-majorelle-600 mb-6">
          {filteredTherapists.length} thérapeute{filteredTherapists.length > 1 ? 's' : ''} trouvé{filteredTherapists.length > 1 ? 's' : ''}
        </p>

        {/* Therapists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTherapists.map((therapist, index) => (
            <motion.div
              key={therapist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="moroccan-card p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Image */}
                <div className="relative">
                  <img 
                    src={therapist.image} 
                    alt={therapist.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-safran-200 mx-auto sm:mx-0"
                  />
                  {therapist.available && (
                    <span className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-amiri text-xl font-bold text-majorelle-900">{therapist.name}</h3>
                  <p className="text-terre-600 font-medium text-sm">{therapist.specialty}</p>

                  <div className="flex items-center justify-center sm:justify-start space-x-4 mt-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-safran-500 fill-current" />
                      <span className="text-sm text-majorelle-700 ml-1">{therapist.rating}</span>
                      <span className="text-sm text-majorelle-500 ml-1">({therapist.reviews})</span>
                    </div>
                    <div className="flex items-center text-sm text-majorelle-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {therapist.location}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                    {therapist.languages.map(lang => (
                      <span key={lang} className="px-2 py-1 bg-cream-100 text-majorelle-700 text-xs rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-majorelle-600 text-sm mt-4 leading-relaxed">
                {therapist.bio}
              </p>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t border-safran-100">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <div className="text-center">
                    <p className="font-amiri text-2xl font-bold text-majorelle-900">{therapist.price} MAD</p>
                    <p className="text-xs text-majorelle-500">/séance</p>
                  </div>
                  <div className="text-center">
                    <p className="font-amiri text-xl font-bold text-majorelle-900">{therapist.experience} ans</p>
                    <p className="text-xs text-majorelle-500">d'expérience</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link 
                    to={`/patient/chat/${therapist.id}`}
                    className="p-3 bg-majorelle-100 text-majorelle-600 rounded-full hover:bg-majorelle-200 transition-colors"
                    title="Envoyer un message"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </Link>
                  <Link 
                    to={`/patient/booking/${therapist.id}`}
                    className="moroccan-btn-primary flex items-center space-x-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Réserver</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TherapistList
