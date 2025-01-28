
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDM0K_KjD1htdQ40Yil3yhafft1hE-Qkmc",
  authDomain: "note-project-d80f6.firebaseapp.com",
  projectId: "note-project-d80f6",
  storageBucket: "note-project-d80f6.firebasestorage.app",
  messagingSenderId: "1070613871",
  appId: "1:1070613871:web:a203214bf871b4324a149a",
  measurementId: "G-JGLRF6D0D7"
};


const app = initializeApp(firebaseConfig);

export default app