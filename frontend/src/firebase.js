// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA30qjuT2hzyaQHnQwlxdX09gaUruazzlQ",
    authDomain: "learning-10d9b.firebaseapp.com",
    projectId: "learning-10d9b",
    storageBucket: "learning-10d9b.appspot.com",
    messagingSenderId: "543218075741",
    appId: "1:543218075741:web:b58a95daed4d1f402ae5b4",
    measurementId: "G-C8G5H6GE02"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app