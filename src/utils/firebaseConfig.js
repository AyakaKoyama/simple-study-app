// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByHFOJN7L3R5VlZ_8k679fupk16ebJMr8",
  authDomain: "simple-study-app.firebaseapp.com",
  projectId: "simple-study-app",
  storageBucket: "simple-study-app.appspot.com",
  messagingSenderId: "120207105625",
  appId: "1:120207105625:web:e04342e7c662186884db48",
  measurementId: "G-6YD263KYPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);