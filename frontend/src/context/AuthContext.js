import { createContext, useContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth"
import { auth } from '../firebase'


const authContext = createContext()

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null)
    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
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
        <authContext.Provider value={{ user, signUp, logIn }} >
            {children}
        </authContext.Provider>
    )
}

export function useAuth() {
    return useContext(authContext)
}