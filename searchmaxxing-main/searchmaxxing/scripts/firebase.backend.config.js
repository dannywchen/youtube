import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxIGjBuQ_oH4uJbyJ1PnTkp7_IVVb8I-0",
  authDomain: "searchmax-20796.firebaseapp.com",
  projectId: "searchmax-20796",
  storageBucket: "searchmax-20796.appspot.com",
  messagingSenderId: "276703838698",
  appId: "1:276703838698:web:e8174c4c8d670b2d7fb293",
  measurementId: "G-TN7BJZ3EDJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);