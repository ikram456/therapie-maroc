import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userType, setUserType] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Chercher les infos dans Firestore
        const patientDoc = await getDoc(doc(db, 'patients', firebaseUser.uid))
        const therapistDoc = await getDoc(doc(db, 'therapists', firebaseUser.uid))
        const adminDoc = await getDoc(doc(db, 'admins', firebaseUser.uid))

        if (patientDoc.exists()) {
          setUser({ uid: firebaseUser.uid, ...patientDoc.data() })
          setUserType('patient')
        } else if (therapistDoc.exists()) {
          setUser({ uid: firebaseUser.uid, ...therapistDoc.data() })
          setUserType('therapist')
        } else if (adminDoc.exists()) {
          setUser({ uid: firebaseUser.uid, ...adminDoc.data() })
          setUserType('admin')
        }
      } else {
        setUser(null)
        setUserType(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const loginPatient = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    const patientDoc = await getDoc(doc(db, 'patients', result.user.uid))
    if (!patientDoc.exists()) {
      await signOut(auth)
      throw new Error('Ce compte n\'est pas un compte patient')
    }
    return result
  }

  const loginTherapist = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    const therapistDoc = await getDoc(doc(db, 'therapists', result.user.uid))
    if (!therapistDoc.exists()) {
      await signOut(auth)
      throw new Error('Ce compte n\'est pas un compte thérapeute')
    }
    return result
  }

  const registerPatient = async (userData) => {
    const result = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
    await setDoc(doc(db, 'patients', result.user.uid), {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      birthDate: userData.birthDate,
      gender: userData.gender,
      createdAt: new Date().toISOString()
    })
    return result
  }

  const registerTherapist = async (userData) => {
    const result = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
    await setDoc(doc(db, 'therapists', result.user.uid), {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      specialty: userData.specialty,
      experience: userData.experience,
      bio: userData.bio,
      status: 'pending',
      createdAt: new Date().toISOString()
    })
    return result
  }

  const logout = () => signOut(auth)

  return (
    <AuthContext.Provider value={{
      user, userType, loading,
      loginPatient, loginTherapist,
      registerPatient, registerTherapist,
      logout
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}