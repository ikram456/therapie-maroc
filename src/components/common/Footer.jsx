import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Phone, Mail, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-majorelle-900 text-cream-200 mt-20">
      {/* Decorative top border */}
      <div className="h-2 bg-gradient-to-r from-majorelle-500 via-terre-500 to-safran-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-moroccan rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="font-amiri text-2xl font-bold text-white">
                Thérapie Maroc
              </span>
            </div>
            <p className="text-cream-300 text-sm leading-relaxed">
              Votre bien-être mental, notre priorité. Une plateforme de télémédecine 
              psychologique inspirée des traditions marocaines de soins et d'écoute.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-amiri text-xl text-safran-400">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/patient/login" className="text-cream-300 hover:text-safran-400 transition-colors">
                  Espace Patient
                </Link>
              </li>
              <li>
                <Link to="/therapist/login" className="text-cream-300 hover:text-safran-400 transition-colors">
                  Espace Thérapeute
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="text-cream-300 hover:text-safran-400 transition-colors">
                  Administration
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-amiri text-xl text-safran-400">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-safran-400" />
                <span className="text-cream-300">+212 5XX-XXXXXX</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-safran-400" />
                <span className="text-cream-300">contact@therapiemaroc.ma</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-safran-400" />
                <span className="text-cream-300">Casablanca, Maroc</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-majorelle-700 text-center">
          <p className="text-cream-400 text-sm">
            © 2026 Thérapie Maroc. Tous droits réservés. | Fait avec ❤️ au Maroc
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
