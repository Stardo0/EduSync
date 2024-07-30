import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase } from 'firebase/database';
import { ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD0wHJnHD5yf1lvWHvwOwHjuzqqPPqr4lY",
  authDomain: "edusync1-3af45.firebaseapp.com",
  databaseURL: "https://edusync1-3af45-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "edusync1-3af45",
  storageBucket: "edusync1-3af45.appspot.com",
  messagingSenderId: "293958266884",
  appId: "1:293958266884:web:5e90b1f5e8bea850e80551",
  measurementId: "G-RX6R0VD61T"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app); 
const db = getFirestore(app); 
const provider = new GoogleAuthProvider();



export default database;