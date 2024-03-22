// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOsDOoeka9M34pu77iMJilZKRcZM3bwp0",
  authDomain: "scouting-2024-db.firebaseapp.com",
  projectId: "scouting-2024-db",
  storageBucket: "scouting-2024-db.appspot.com",
  messagingSenderId: "839572216416",
  appId: "1:839572216416:web:a5cd13d4c1e67df9fe8105",
  measurementId: "G-H8H5KZ9D08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

export default app;
