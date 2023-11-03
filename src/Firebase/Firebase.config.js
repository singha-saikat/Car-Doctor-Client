// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyB2HyX0NpzFsFJ5OHNQu-V9ALla0Q9XeH4",
  authDomain: "car-doctor-e9b7b.firebaseapp.com",
  projectId: "car-doctor-e9b7b",
  storageBucket: "car-doctor-e9b7b.appspot.com",
  messagingSenderId: "310618760342",
  appId: "1:310618760342:web:cef0653c0f4ab1d5130eb7"


  // apiKey:import.meta.env.VITE_apiKey,
  // authDomain:import.meta.env.VITE_authDomain,
  // projectId:import.meta.env.VITE_projectId,
  // storageBucket:import.meta.env.VITE_storageBucket,
  // messagingSenderId:import.meta.env.VITE_messagingSenderId,
  // appId:import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;