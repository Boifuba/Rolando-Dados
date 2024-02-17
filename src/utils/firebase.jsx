import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Importe getStorage

const firebaseConfig = {
  apiKey: "AIzaSyC4oKmEgPGS2onNrartQc6Cwvd1yEkqnYs",
  authDomain: "warez-7198a.firebaseapp.com",
  projectId: "warez-7198a",
  storageBucket: "warez-7198a.appspot.com",
  messagingSenderId: "98244594618",
  appId: "1:98244594618:web:81d7330da6451d22a76b83",
  measurementId: "G-QVD8VW7D3W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
