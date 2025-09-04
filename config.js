// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore, addDoc, collection, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAhdtRTPD8yBuMg4HRe_Weop5z1N1lbpsM",
    authDomain: "chatroom-d04b1.firebaseapp.com",
    projectId: "chatroom-d04b1",
    storageBucket: "chatroom-d04b1.firebasestorage.app",
    messagingSenderId: "592747185050",
    appId: "1:592747185050:web:a16a43a3891d86592ff023",
    measurementId: "G-Q0D9KH14JF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export {
    auth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    addDoc,
    collection,
    setDoc,
    doc,
    db,
    app,
}