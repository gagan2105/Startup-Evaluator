import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBt5wIDuaMW93DM1Oo8L46RBd-AV7FZE9k",
  authDomain: "startup-evaluator-48f26.firebaseapp.com",
  projectId: "startup-evaluator-48f26",
  storageBucket: "startup-evaluator-48f26.firebasestorage.app",
  messagingSenderId: "1034882143657",
  appId: "1:1034882143657:web:270b006cd1c530e7e1a0b8",
  measurementId: "G-5SZ5VGEL3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
