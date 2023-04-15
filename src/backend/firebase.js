import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVXX11HsrOs26QqiYthR20-Sixwk-mD7c",
  authDomain: "unirecs-787f9.firebaseapp.com",
  projectId: "unirecs-787f9",
  storageBucket: "unirecs-787f9.appspot.com",
  messagingSenderId: "898243812572",
  appId: "1:898243812572:web:27b0f9a2b8eff20cde2819",
  measurementId: "G-H6K880V4EE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const config = firebaseConfig;

export const database = getFirestore(app);


export const auth = getAuth(app);
