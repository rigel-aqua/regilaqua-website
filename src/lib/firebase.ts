import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDwxvParACVF0T8eq8Pdxs0Yh46AJNcIw4",
  authDomain: "regilaqua-website.firebaseapp.com",
  projectId: "regilaqua-website",
  storageBucket: "regilaqua-website.firebasestorage.app",
  messagingSenderId: "644352435505",
  appId: "1:644352435505:web:45457c11e35ba5e3817c10",
  measurementId: "G-GGNELV6DSN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
