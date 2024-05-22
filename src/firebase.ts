// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhFuwaQHrEHpzol6YGRsYUf3erlsOwG94",
  authDomain: "react-board-demo.firebaseapp.com",
  projectId: "react-board-demo",
  storageBucket: "react-board-demo.appspot.com",
  messagingSenderId: "391235492834",
  appId: "1:391235492834:web:c642cda292376b7f83f7bb",
  measurementId: "G-TPTVH6FBLW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);