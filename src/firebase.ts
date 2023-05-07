// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyl0CSZN6prUT2pwzXDlHkNGpJnvbi00s",
  authDomain: "chess-5eba8.firebaseapp.com",
  projectId: "chess-5eba8",
  storageBucket: "chess-5eba8.appspot.com",
  messagingSenderId: "840154125212",
  appId: "1:840154125212:web:63cb9f00f89e932d5fae59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)