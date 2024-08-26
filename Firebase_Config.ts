//Firebase_Config.ts


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXT9AaezX8ezRLOzJY-zXhM97e4tL42jE",
  authDomain: "spmsmartwaste.firebaseapp.com",
  projectId: "spmsmartwaste",
  storageBucket: "spmsmartwaste.appspot.com",
  messagingSenderId: "1063883423580",
  appId: "1:1063883423580:web:ae141140ce794244288b99"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_DB = getFirestore(FIREBASE_APP);