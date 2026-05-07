import React, { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Send, Paperclip, Phone, Video, ArrowLeft, 
  MoreVertical, Clock, Check, CheckCheck 
} from 'lucide-react'

const PatientChat = () => {
  const { therapistId } = useParams()
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'therapist',
      text: 'Bonjour ! Je suis ravie de pouvoir vous accompagner dans votre parcours. Comment vous sentez-vous aujourd'hui ?',
      time: '14:30',
      status: 'read'
    },
    {
      id: 2,
      sender: 'patient',
      text: 'Bonjour Dr. Alaoui, merci de prendre le temps de me parler. Je me sens un peu anxieux ces derniers temps.',
      time: '14:32',
      status: 'read'
    },
    {
      id: 3,
      sender: 'therapist',
      text: 'Je comprends. L'anxiété est une réponse normale au stress, mais elle peut devenir envahissante. Pouvez-vous me dire ce qui déclenche ces sentiments ?',
      time: '14:35',
      status: 'read'
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const therapist = {
    id: therapistId,
    name: "Dr. Fatima Alaoui",
    specialty: "Psychologie clinique",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
    status: "online",
    lastSeen: "En ligne"
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
      sender: 'patient',
      text: newMessage,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    }

    setMessages([...messages, message])
    setNewMessage('')
    setIsTyping(true)

    // Simulate therapist response
    setTimeout(() => {
      setIsTyping(false)
      const response = {
        id: messages.length + 2,
        sender: 'therapist',
        text: 'Merci pour votre partage. C'est important d'identifier ces déclencheurs. Nous allons travailler ensemble sur des techniques pour mieux gérer cette anxiété.',
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      }
      setMessages(prev => [...prev, response])
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-cream-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="moroccan-card overflow-hidden"
        >
          {/* Chat Header */}
          <div className="bg-gradient-moroccan p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/patient/dashboard" className="text-white hover:text-cream-200 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <img 
                src={therapist.image} 
                alt={therapist.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white"
              />
              <div>
                <h3 className="font-amiri text-lg font-bold text-white">{therapist.name}</h3>
                <p className="text-cream-200 text-sm">{therapist.specialty}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link 
                to={`/patient/booking/${therapistId}`}
                className="p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors"
                title="Réserver une séance vidéo"
              >
                <Video className="w-5 h-5" />
              </Link>
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
                className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${
                  message.sender === 'patient' 
                    ? 'bg-majorelle-500 text-white rounded-moroccan' 
                    : 'bg-white text-majorelle-900 rounded-moroccan-reverse border border-safran-200'
                } p-4`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <div className={`flex items-center justify-end mt-2 space-x-1 ${
                    message.sender === 'patient' ? 'text-cream-200' : 'text-majorelle-400'
                  }`}>
                    <span className="text-xs">{message.time}</span>
                    {message.sender === 'patient' && (
                      <CheckCheck className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white rounded-moroccan-reverse border border-safran-200 p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-majorelle-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-majorelle-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-majorelle-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
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
        </motion.div>
      </div>
    </div>
  )
}

export default PatientChat
