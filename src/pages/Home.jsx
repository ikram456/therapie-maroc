import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Stethoscope, Shield, MessageCircle, Video, Calendar, Star, Users } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Soins Personnalisés",
      description: "Questionnaire complet pour comprendre vos besoins et vous matcher avec le thérapeute idéal."
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Messagerie Sécurisée",
      description: "Communiquez en toute confidentialité avec votre thérapeute via notre chat intégré."
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Séances Vidéo",
      description: "Réservez et participez à des séances de thérapie en visioconférence de haute qualité."
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Réservation Facile",
      description: "Planifiez vos séances selon vos disponibilités et celles de votre thérapeute."
    }
  ]

  const stats = [
    { number: "500+", label: "Patients accompagnés" },
    { number: "50+", label: "Thérapeutes certifiés" },
    { number: "98%", label: "Satisfaction client" },
    { number: "24/7", label: "Support disponible" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-majorelle-50 via-cream-100 to-terre-50 py-20 lg:py-32">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-safran-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-majorelle-200 rounded-full opacity-20 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-amiri text-5xl md:text-7xl font-bold text-majorelle-900 mb-6 leading-tight">
                Votre Bien-être Mental,
                <span className="text-gradient block mt-2">Notre Priorité</span>
              </h1>
              <p className="text-xl text-majorelle-700 mb-10 max-w-2xl mx-auto leading-relaxed">
                Accédez à des soins psychologiques de qualité depuis chez vous. 
                Des thérapeutes certifiés, une approche marocaine bienveillante.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/patient/register" className="moroccan-btn-primary text-lg px-8 py-4">
                <Heart className="w-5 h-5 inline mr-2" />
                Commencer en tant que Patient
              </Link>
              <Link to="/therapist/register" className="moroccan-btn-secondary text-lg px-8 py-4">
                <Stethoscope className="w-5 h-5 inline mr-2" />
                Espace Thérapeute
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-amiri text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-majorelle-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-amiri text-4xl font-bold text-majorelle-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-majorelle-600 text-lg max-w-2xl mx-auto">
              Un parcours simple et sécurisé pour accéder aux soins psychologiques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="moroccan-card p-8 text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-moroccan rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                  {feature.icon}
                </div>
                <h3 className="font-amiri text-xl font-bold text-majorelle-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-majorelle-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-gradient-to-br from-majorelle-900 to-majorelle-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-amiri text-4xl font-bold text-white mb-4">
              Choisissez Votre Espace
            </h2>
            <p className="text-cream-300 text-lg max-w-2xl mx-auto">
              Une plateforme adaptée à chaque utilisateur
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Patient Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-moroccan p-8 border border-white/20 hover:bg-white/20 transition-all"
            >
              <Heart className="w-12 h-12 text-safran-400 mb-6" />
              <h3 className="font-amiri text-2xl font-bold text-white mb-4">Patient</h3>
              <ul className="space-y-3 text-cream-200 mb-8">
                <li className="flex items-center"><Star className="w-4 h-4 mr-2 text-safran-400" />Création de compte</li>
                <li className="flex items-center"><Star className="w-4 h-4 mr-2 text-safran-400" />Questionnaire personnalisé</li>
                <li className="flex items-center"><Star className="w-4 h-4 mr-2 text-safran-400" />Choix du thérapeute</li>
                <li className="flex items-center"><Star className="w-4 h-4 mr-2 text-safran-400" />Chat et vidéo</li>
              </ul>
              <Link to="/patient/register" className="block w-full text-center bg-safran-500 hover:bg-safran-600 text-white py-3 rounded-moroccan font-semibold transition-colors">
                Rejoindre
              </Link>
            </motion.div>

            {/* Therapist Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-moroccan-reverse p-8 border border-white/20 hover:bg-white/20 transition-all"
            >
              <Stethoscope className="w-12 h-12 text-terre-400 mb-6" />
              <h3 className="font-amiri text-2xl font-bold text-white mb-4">Thérapeute</h3>
              <ul className="space-y-3 text-cream-200 mb-8">
                <li className="flex items-center"><Star className="w-4 h-4 mr-2 text-terre-400" />Inscription professionnelle</li>
                <li className="flex items-center"><Star className="w-4 h-4 mr-2 text-terre-400" />Gestion des demandes</li>
                <li className="flex items-center"><Star className="w-4 h-4 mr-2 text-terre-400" />Agenda des séances</li>
                <li className="flex items-center"><Star className="w-4 h-4 mr-2 text-terre-400" />Suivi des patients</li>
              </ul>
              <Link to="/therapist/register" className="block w-full text-center bg-terre-500 hover:bg-terre-600 text-white py-3 rounded-moroccan-reverse font-semibold transition-colors">
                S'inscrire
              </Link>
            </motion.div>

            {/* Admin Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-moroccan p-8 border border-white/20 hover:bg-white/20 transition-all"
            >
              <Shield className="w-12 h-12 text-majorelle-400 mb-6" />
              <h3 className="font-amiri text-2xl font-bold text-white mb-4">Administrateur</h3>
              <ul className="space-y-3 text-cream-200 mb-8">
                <li className="flex items-center"><Star className="w-4 h-4 mr-2 text-majorelle-400" />Gestion des utilisateurs</li>
                <li className="flex items-center"><Star className="w-4 h-4 mr-2 text-majorelle-400" />Validation des thérapeutes</li>
                <li className="flex items-center"><Star className="w-4 h-4 mr-2 text-majorelle-400" />Statistiques globales</li>
                <li className="flex items-center"><Star className="w-4 h-4 mr-2 text-majorelle-400" />Modération</li>
              </ul>
              <Link to="/admin/dashboard" className="block w-full text-center bg-majorelle-500 hover:bg-majorelle-600 text-white py-3 rounded-moroccan font-semibold transition-colors">
                Accéder
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
