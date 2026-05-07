import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Calendar, Clock, Video, ArrowLeft, CheckCircle, 
  CreditCard, Shield, Star, MapPin 
} from 'lucide-react'

const PatientBooking = () => {
  const { therapistId } = useParams()
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [step, setStep] = useState(1)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const therapist = {
    id: therapistId,
    name: "Dr. Fatima Alaoui",
    specialty: "Psychologie clinique",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
    rating: 4.9,
    reviews: 45,
    price: 400,
    duration: 50,
    location: "Casablanca"
  }

  // Generate next 7 days
  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push({
        day: date.toLocaleDateString('fr-FR', { weekday: 'short' }),
        date: date.getDate(),
        month: date.toLocaleDateString('fr-FR', { month: 'short' }),
        fullDate: date.toISOString().split('T')[0]
      })
    }
    return dates
  }

  const dates = generateDates()

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ]

  const handleConfirm = () => {
    setIsConfirmed(true)
  }

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-100 via-majorelle-50 to-terre-50 py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto moroccan-card p-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <CheckCircle className="w-20 h-20 text-safran-500 mx-auto mb-6" />
          </motion.div>
          <h2 className="font-amiri text-3xl font-bold text-majorelle-900 mb-4">
            Réservation Confirmée !
          </h2>
          <p className="text-majorelle-600 mb-2">
            Votre séance avec {therapist.name} est confirmée
          </p>
          <div className="bg-cream-100 rounded-moroccan p-4 my-6">
            <p className="font-semibold text-majorelle-900">
              {selectedDate} à {selectedTime}
            </p>
            <p className="text-sm text-majorelle-600 mt-1">
              Durée: {therapist.duration} minutes
            </p>
          </div>
          <p className="text-sm text-majorelle-500 mb-6">
            Un email de confirmation vous a été envoyé avec le lien de la visioconférence.
          </p>
          <Link to="/patient/dashboard" className="moroccan-btn-primary inline-block">
            Retour au Dashboard
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/patient/therapists" className="flex items-center text-majorelle-600 hover:text-majorelle-800 mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux thérapeutes
          </Link>
          <h1 className="font-amiri text-4xl font-bold text-majorelle-900">
            Réserver une Séance
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Therapist Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="moroccan-card p-6 sticky top-24">
              <img 
                src={therapist.image} 
                alt={therapist.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-safran-200 mx-auto mb-4"
              />
              <h2 className="font-amiri text-xl font-bold text-center text-majorelle-900">{therapist.name}</h2>
              <p className="text-terre-600 text-center text-sm">{therapist.specialty}</p>

              <div className="flex items-center justify-center mt-2">
                <Star className="w-4 h-4 text-safran-500 fill-current" />
                <span className="text-sm text-majorelle-700 ml-1">{therapist.rating}</span>
                <span className="text-sm text-majorelle-500 ml-1">({therapist.reviews} avis)</span>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between p-3 bg-cream-50 rounded-lg">
                  <span className="text-sm text-majorelle-600">Prix</span>
                  <span className="font-bold text-majorelle-900">{therapist.price} MAD</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-cream-50 rounded-lg">
                  <span className="text-sm text-majorelle-600">Durée</span>
                  <span className="font-bold text-majorelle-900">{therapist.duration} min</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-cream-50 rounded-lg">
                  <span className="text-sm text-majorelle-600">Type</span>
                  <span className="font-bold text-majorelle-900 flex items-center">
                    <Video className="w-4 h-4 mr-1" />
                    Vidéo
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="moroccan-card p-6">
              {/* Step 1: Date Selection */}
              <div className="mb-8">
                <h3 className="font-amiri text-xl font-bold text-majorelle-900 mb-4">
                  <Calendar className="w-5 h-5 inline mr-2" />
                  Choisir une Date
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {dates.map((date) => (
                    <button
                      key={date.fullDate}
                      onClick={() => setSelectedDate(date.fullDate)}
                      className={`p-3 rounded-lg text-center transition-all ${
                        selectedDate === date.fullDate
                          ? 'bg-majorelle-500 text-white shadow-md'
                          : 'bg-cream-50 text-majorelle-700 hover:bg-majorelle-100'
                      }`}
                    >
                      <p className="text-xs uppercase">{date.day}</p>
                      <p className="text-lg font-bold">{date.date}</p>
                      <p className="text-xs">{date.month}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Time Selection */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-8"
                >
                  <h3 className="font-amiri text-xl font-bold text-majorelle-900 mb-4">
                    <Clock className="w-5 h-5 inline mr-2" />
                    Choisir une Heure
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-moroccan text-center transition-all ${
                          selectedTime === time
                            ? 'bg-terre-500 text-white shadow-md'
                            : 'bg-cream-50 text-majorelle-700 hover:bg-terre-100'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {selectedDate && selectedTime && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t border-safran-200 pt-6"
                >
                  <h3 className="font-amiri text-xl font-bold text-majorelle-900 mb-4">
                    Récapitulatif
                  </h3>
                  <div className="bg-cream-50 rounded-moroccan p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-majorelle-500">Date</p>
                        <p className="font-semibold text-majorelle-900">{selectedDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-majorelle-500">Heure</p>
                        <p className="font-semibold text-majorelle-900">{selectedTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-majorelle-500">Thérapeute</p>
                        <p className="font-semibold text-majorelle-900">{therapist.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-majorelle-500">Total</p>
                        <p className="font-semibold text-majorelle-900">{therapist.price} MAD</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-6 text-sm text-majorelle-600">
                    <Shield className="w-4 h-4 text-safran-500" />
                    <span>Paiement sécurisé • Annulation gratuite jusqu'à 24h avant</span>
                  </div>

                  <button
                    onClick={handleConfirm}
                    className="w-full moroccan-btn-primary py-4 text-lg flex items-center justify-center space-x-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Confirmer la Réservation</span>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PatientBooking
