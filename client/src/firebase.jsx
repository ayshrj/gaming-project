import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHa6Zmr_clQuMchGGmQ5FxXmlO2Z9Dg18",
  authDomain: "nocando-backend.firebaseapp.com",
  projectId: "nocando-backend",
  storageBucket: "nocando-backend.appspot.com",
  messagingSenderId: "130341287064",
  appId: "1:130341287064:web:a5267486c2d333af9e0ced",
  measurementId: "G-C4ZNC03T4P",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
