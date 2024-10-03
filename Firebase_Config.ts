// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {initializeAuth,  getReactNativePersistence} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
const FIREBASE_DB = getFirestore(FIREBASE_APP);


export {FIREBASE_APP,FIREBASE_AUTH,FIREBASE_DB};