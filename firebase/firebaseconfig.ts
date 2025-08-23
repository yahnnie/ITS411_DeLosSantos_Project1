// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace with your Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDcckJfbncd8GJEzG2J35Pa5H6bMzU8-E8",
  authDomain: "its411-delossantosproject1.firebaseapp.com",
  projectId: "its411-delossantosproject1",
  storageBucket: "its411-delossantosproject1.firebasestorage.app",
  messagingSenderId: "59199704117",
  appId: "1:59199704117:web:6a7a139fa9554d6ffc757c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
