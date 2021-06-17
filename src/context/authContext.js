import React, { useState, useEffect } from 'react'

import { auth, db } from '../firebase'

const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const signup = (email, password) => {
    db.collection('users').doc(email).set({
      username: '',
      bio: '',
    })
    return auth.createUserWithEmailAndPassword(email, password)
  }

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const logout = () => {
    const docRef = db.collection('users').doc(currentUser.email)
    return docRef
      .update({
        online: false,
      })
      .finally(() => {
        return auth.signOut()
      })
  }

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email)
  }

  const updateEmail = (email) => {
    return currentUser.updateEmail(email)
  }
  const updatePassword = (password) => {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    if (currentUser) {
      const docRef = db.collection('users').doc(currentUser.email)
      if (currentUser) {
        docRef.update({
          online: true,
        })
      }
    }

    return () => {}
  }, [currentUser])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setIsLoading(false)
    })
    return unsubscribe
  }, [])

  const values = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }
  return (
    <AuthContext.Provider value={values} children={!isLoading && children} />
  )
}
export { AuthContext, AuthProvider }
