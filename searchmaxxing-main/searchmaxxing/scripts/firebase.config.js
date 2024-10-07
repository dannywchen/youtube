// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxIGjBuQ_oH4uJbyJ1PnTkp7_IVVb8I-0",
  authDomain: "searchmax-20796.firebaseapp.com",
  projectId: "searchmax-20796",
  storageBucket: "searchmax-20796.appspot.com",
  messagingSenderId: "276703838698",
  appId: "1:276703838698:web:e8174c4c8d670b2d7fb293",
  measurementId: "G-TN7BJZ3EDJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

if (typeof window !== 'undefined') {
  import('firebase/analytics').then(({ getAnalytics }) => {
    getAnalytics(app);
  }).catch((error) => {
    console.error("Error initializing Firebase Analytics:", error);
  });
}