import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, CheckCircle, Heart, Brain, Moon, Activity, Users, AlertTriangle } from 'lucide-react'

const PatientQuestionnaire = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isCompleted, setIsCompleted] = useState(false)

  const questions = [
    {
      category: "État général",
      icon: <Heart className="w-6 h-6" />,
      question: "Comment décririez-vous votre état émotionnel général ces derniers temps ?",
      options: [
        "Très positif et énergique",
        "Plutôt stable avec quelques fluctuations",
        "Souvent triste ou anxieux",
        "Très difficile à gérer"
      ]
    },
    {
      category: "Sommeil",
      icon: <Moon className="w-6 h-6" />,
      question: "Comment qualifiez-vous votre sommeil ?",
      options: [
        "Excellent, je me réveille reposé",
        "Correct avec quelques nuits difficiles",
        "Difficile à trouver ou maintenir",
        "Insomnie chronique"
      ]
    },
    {
      category: "Stress & Anxiété",
      icon: <Brain className="w-6 h-6" />,
      question: "À quelle fréquence ressentez-vous du stress ou de l'anxiété ?",
      options: [
        "Rarement",
        "Occasionnellement",
        "Fréquemment",
        "Presque constamment"
      ]
    },
    {
      category: "Activité",
      icon: <Activity className="w-6 h-6" />,
      question: "Vos activités quotidiennes sont-elles affectées ?",
      options: [
        "Pas du tout",
        "Légèrement",
        "Modérément",
        "Sévèrement"
      ]
    },
    {
      category: "Relations",
      icon: <Users className="w-6 h-6" />,
      question: "Comment se portent vos relations sociales ?",
      options: [
        "Épanouissantes",
        "Correctes",
        "Tendues ou distantes",
        "Très isolé"
      ]
    },
    {
      category: "Urgence",
      icon: <AlertTriangle className="w-6 h-6" />,
      question: "Avez-vous des pensées de vous faire du mal ou des idées suicidaires ?",
      options: [
        "Jamais",
        "Rarement",
        "Parfois",
        "Fréquemment"
      ],
      warning: true
    }
  ]

  const handleAnswer = (optionIndex) => {
    setAnswers({ ...answers, [currentStep]: optionIndex })
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsCompleted(true)
      setTimeout(() => {
        navigate('/patient/dashboard')
      }, 3000)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = ((currentStep + 1) / questions.length) * 100

  if (isCompleted) {
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
            Questionnaire Terminé !
          </h2>
          <p className="text-majorelle-600 mb-6">
            Merci pour vos réponses. Nous allons maintenant vous proposer les thérapeutes les plus adaptés à vos besoins.
          </p>
          <p className="text-sm text-safran-600">
            Redirection vers votre dashboard...
          </p>
        </motion.div>
      </div>
    )
  }

  const currentQuestion = questions[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-100 via-majorelle-50 to-terre-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-majorelle-700">
              Question {currentStep + 1} sur {questions.length}
            </span>
            <span className="text-sm text-majorelle-500">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-cream-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-moroccan h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="moroccan-card p-8 md:p-12"
          >
            {/* Category */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-moroccan rounded-full flex items-center justify-center text-white">
                {currentQuestion.icon}
              </div>
              <span className="font-amiri text-xl text-majorelle-700">{currentQuestion.category}</span>
            </div>

            {/* Question */}
            <h2 className="font-amiri text-2xl font-bold text-majorelle-900 mb-8">
              {currentQuestion.question}
            </h2>

            {currentQuestion.warning && (
              <div className="bg-terre-50 border border-terre-200 rounded-moroccan p-4 mb-6">
                <p className="text-terre-700 text-sm">
                  <AlertTriangle className="w-4 h-4 inline mr-2" />
                  Si vous êtes en danger immédiat, appelez le 15 (SAMU) ou le 0522 25 80 80 (SOS Suicide Maroc)
                </p>
              </div>
            )}

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full text-left p-4 rounded-moroccan border-2 transition-all duration-300 ${
                    answers[currentStep] === index
                      ? 'border-majorelle-500 bg-majorelle-50 text-majorelle-900'
                      : 'border-safran-200 hover:border-majorelle-300 hover:bg-cream-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answers[currentStep] === index
                        ? 'border-majorelle-500 bg-majorelle-500'
                        : 'border-safran-300'
                    }`}>
                      {answers[currentStep] === index && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={`flex items-center space-x-2 px-6 py-3 rounded-moroccan font-semibold transition-colors ${
                  currentStep === 0
                    ? 'bg-cream-200 text-cream-400 cursor-not-allowed'
                    : 'bg-cream-100 text-majorelle-700 hover:bg-cream-200'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Précédent</span>
              </button>

              <button
                onClick={handleNext}
                disabled={answers[currentStep] === undefined}
                className={`flex items-center space-x-2 px-6 py-3 rounded-moroccan font-semibold transition-all ${
                  answers[currentStep] !== undefined
                    ? 'moroccan-btn-primary'
                    : 'bg-cream-200 text-cream-400 cursor-not-allowed'
                }`}
              >
                <span>{currentStep === questions.length - 1 ? 'Terminer' : 'Suivant'}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default PatientQuestionnaire
