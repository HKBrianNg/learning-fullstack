import { createContext, useContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    sendPasswordResetEmail
} from "firebase/auth"
import { auth } from '../firebase'


const authContext = createContext()

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null)
    const signUp = (name, email, password) => {
        createUserWithEmailAndPassword(auth, email, password).then(() => {
            return updateProfile(auth.currentUser, {
                displayName: name,
            })
        })

    }

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const googleSignIn = () => {
        const googleAuthProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleAuthProvider)
    }

    const forgetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <authContext.Provider value={{ user, signUp, logIn, logOut, googleSignIn, forgetPassword }} >
            {children}
        </authContext.Provider>
    )
}

export function useAuth() {
    return useContext(authContext)
}