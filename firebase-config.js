import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDD5x6hBjIMF3sPAoR-wGQMaz-_rK5DhAA",
    authDomain: "rimjhim-graphics.firebaseapp.com",
    projectId: "rimjhim-graphics",
    storageBucket: "rimjhim-graphics.firebasestorage.app",
    messagingSenderId: "377873381805",
    appId: "1:377873381805:web:a7c2ed26119d3b6dab4924",
    measurementId: "G-H0BNY5TZ3M"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
