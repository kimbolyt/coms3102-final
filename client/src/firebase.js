
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCYI3MmwZ87E8BzmUGdxiRd0WScwxCHIxA",
    authDomain: "coms3102-final.firebaseapp.com",
    projectId: "coms3102-final",
    storageBucket: "coms3102-final.appspot.com",
    messagingSenderId: "750768868963",
    appId: "1:750768868963:web:51bc02544eef8fbe44b256",
    measurementId: "G-8RQSVPBFGJ"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });