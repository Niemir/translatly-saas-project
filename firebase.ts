import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCYr2hjr1EXJUVKhPw1d4udLC2sQBMzkhc",
  authDomain: "saas-translator-app-86400.firebaseapp.com",
  projectId: "saas-translator-app-86400",
  storageBucket: "saas-translator-app-86400.appspot.com",
  messagingSenderId: "1050318189994",
  appId: "1:1050318189994:web:d844111834c779387d67d3",
  measurementId: "G-QB52L34KK0",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { auth, db, functions };
