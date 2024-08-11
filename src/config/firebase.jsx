import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC4JmCWLy8wGbCD7_jG_3_aMCeSPZeI83o",
    authDomain: "netphim-acb5c.firebaseapp.com",
    projectId: "netphim-acb5c",
    storageBucket: "netphim-acb5c.appspot.com",
    messagingSenderId: "975540903901",
    appId: "1:975540903901:web:a2e6b2ec8742a59e5c2034",
    measurementId: "G-304DW54N2L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
