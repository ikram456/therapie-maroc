import React, { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Send, Paperclip, ArrowLeft, MoreVertical, 
  Calendar, FileText, Check, CheckCheck, User 
} from 'lucide-react'

const TherapistChat = () => {
  const { patientId } = useParams()
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'patient',
      text: 'Bonjour Dr. Alaoui, merci d'avoir accepté ma demande. Je me sens un peu anxieux ces derniers temps.',
      time: '14:30',
      status: 'read'
    },
    {
      id: 2,
      sender: 'therapist',
      text: 'Bonjour ! Je suis ravie de pouvoir vous accompagner. Pouvez-vous me dire depuis quand vous ressentez cette anxiété ?',
      time: '14:35',
      status: 'read'
    },
    {
      id: 3,
      sender: 'patient',
      text: 'Ça fait environ 3 mois maintenant. C'est surtout au travail que ça se manifeste.',
      time: '14:38',
      status: 'read'
    },
    {
      id: 4,
      sender: 'therapist',
      text: 'Je comprends. Le stress professionnel est très courant. Nous allons travailler ensemble sur des techniques de gestion du stress.',
      time: '14:42',
      status: 'read'
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [showPatientInfo, setShowPatientInfo] = useState(false)
  const messagesEndRef = useRef(null)

  const patient = {
    id: patientId,
    name: "Ahmed Benjelloun",
    age: 28,
    gender: "homme",
    image: null,
    status: "online",
    lastSession: "2026-05-03",
    nextSession: "2026-05-10",
    notes: "Anxiété généralisée - Séance 3/10",
    questionnaire: {
      emotional: "Souvent triste ou anxieux",
      sleep: "Difficile à trouver",
      stress: "Fréquemment",
      activity: "Modérément",
      relations: "Tendues"
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      sender: 'therapist',
      text: newMessage,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  return (
    <div className="min-h-screen bg-cream-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="moroccan-card overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-moroccan p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Link to="/therapist/dashboard" className="text-white hover:text-cream-200 transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                  </Link>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-amiri text-lg font-bold text-white">{patient.name}</h3>
                    <p className="text-cream-200 text-sm">{patient.notes}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setShowPatientInfo(!showPatientInfo)}
                    className="lg:hidden p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors"
                  >
                    <FileText className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="h-[500px] overflow-y-auto p-4 space-y-4 bg-cream-50">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'therapist' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${
                      message.sender === 'therapist' 
                        ? 'bg-majorelle-500 text-white rounded-moroccan' 
                        : 'bg-white text-majorelle-900 rounded-moroccan-reverse border border-safran-200'
                    } p-4`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <div className={`flex items-center justify-end mt-2 space-x-1 ${
                        message.sender === 'therapist' ? 'text-cream-200' : 'text-majorelle-400'
                      }`}>
                        <span className="text-xs">{message.time}</span>
                        {message.sender === 'therapist' && (
                          <CheckCheck className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSend} className="p-4 bg-white border-t border-safran-200">
                <div className="flex items-center space-x-3">
                  <button type="button" className="p-2 text-majorelle-400 hover:text-majorelle-600 transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Écrivez votre message..."
                    className="flex-1 moroccan-input"
                  />
                  <button 
                    type="submit"
                    disabled={!newMessage.trim()}
                    className={`p-3 rounded-full transition-all ${
                      newMessage.trim() 
                        ? 'bg-majorelle-500 text-white hover:bg-majorelle-600 shadow-md' 
                        : 'bg-cream-200 text-cream-400'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Patient Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`lg:col-span-1 ${showPatientInfo ? 'block' : 'hidden lg:block'}`}
          >
            <div className="moroccan-card p-6 sticky top-24">
              <h3 className="font-amiri text-xl font-bold text-majorelle-900 mb-6">
                <FileText className="w-5 h-5 inline mr-2" />
                Dossier Patient
              </h3>

              {/* Basic Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-majorelle-100 rounded-full flex items-center justify-center">
                    <span className="font-amiri text-2xl font-bold text-majorelle-600">
                      {patient.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-majorelle-900">{patient.name}</h4>
                    <p className="text-sm text-majorelle-600">{patient.age} ans • {patient.gender}</p>
                  </div>
                </div>
              </div>

              {/* Sessions Info */}
              <div className="bg-cream-50 rounded-lg p-4 mb-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-majorelle-600">Dernière séance</span>
                  <span className="text-sm font-medium text-majorelle-900">{patient.lastSession}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-majorelle-600">Prochaine séance</span>
                  <span className="text-sm font-medium text-majorelle-900">{patient.nextSession}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-majorelle-600">Progression</span>
                  <span className="text-sm font-medium text-majorelle-900">3/10 séances</span>
                </div>
              </div>

              {/* Questionnaire Results */}
              <div className="space-y-3">
                <h4 className="font-semibold text-majorelle-800 text-sm uppercase tracking-wide">
                  Résultats Questionnaire
                </h4>
                {Object.entries(patient.questionnaire).map(([key, value]) => (
                  <div key={key} className="bg-cream-50 rounded-lg p-3">
                    <p className="text-xs text-majorelle-500 capitalize mb-1">{key}</p>
                    <p className="text-sm font-medium text-majorelle-800">{value}</p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-3">
                <Link 
                  to={`/therapist/booking/${patientId}`}
                  className="block w-full text-center moroccan-btn-primary py-3"
                >
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Planifier une séance
                </Link>
                <button className="block w-full text-center bg-cream-100 text-majorelle-700 py-3 rounded-moroccan font-medium hover:bg-cream-200 transition-colors">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Ajouter des notes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TherapistChat
