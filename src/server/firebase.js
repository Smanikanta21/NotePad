import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9XlY7JtXaN3pT86eRXrNhBha4xSIynOw",
  authDomain: "notepad-c81f9.firebaseapp.com",
  projectId: "notepad-c81f9",
  storageBucket: "notepad-c81f9.appspot.com",
  messagingSenderId: "393407533788",
  appId: "1:393407533788:web:4ef71e10b043cab5be5a19",
  measurementId: "G-NN7N431H6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };