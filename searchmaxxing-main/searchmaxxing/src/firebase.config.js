import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const addEmailToWaitlist = async (email, useCase) => {
  try {
    const docRef = await addDoc(collection(db, "waitlist"), {
      email: email,
      useCase: useCase,
      timestamp: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
    logEvent(analytics, 'waitlist_signup', { email, useCase });
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    logEvent(analytics, 'waitlist_signup_error', { error: e.message });
    return false;
  }
};

export const saveWaitlistSubmission = addEmailToWaitlist;

if (typeof window !== 'undefined') {
  import('firebase/analytics').then(() => {
    logEvent(analytics, 'page_view', {
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title
    });
  }).catch((error) => {
    console.error("Error initializing Firebase Analytics:", error);
  });
}

export const logCustomEvent = (eventName, eventParams) => {
  logEvent(analytics, eventName, eventParams);
};