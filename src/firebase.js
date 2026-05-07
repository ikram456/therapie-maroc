import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAkeapjudDj9LQ3Y6piku0ttLs_bMlPNuY",
  authDomain: "therapie-maroc.firebaseapp.com",
  databaseURL: "https://therapie-maroc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "therapie-maroc",
  storageBucket: "therapie-maroc.firebasestorage.app",
  messagingSenderId: "549828969071",
  appId: "1:549828969071:web:f4e0c8e8402be88598c39a"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app