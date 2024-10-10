import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUCkwJ10CdfHaEhhuqL1FOQUO3XNj-Vr8",
    authDomain: "uog-movie-website.firebaseapp.com",
    projectId: "uog-movie-website",
    storageBucket: "uog-movie-website.appspot.com",
    messagingSenderId: "912240401461",
    appId: "1:912240401461:web:f5fb92846cfa153f7e257c",
    measurementId: "G-673ZCET60W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

