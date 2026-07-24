import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCV26iDB1UBv0Y-n4R1zLBrlw9hMlV-EV0",
  authDomain: "el-pacto-ludico.firebaseapp.com",
  projectId: "el-pacto-ludico",
  storageBucket: "el-pacto-ludico.firebasestorage.app",
  messagingSenderId: "117302414675",
  appId: "1:117302414675:web:6d27c07b01ab6dadaa25a6",
  measurementId: "G-Q343XE10XL",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
