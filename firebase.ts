
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
    apiKey: "AIzaSyBRKvvHwbFEF1PAjJprs5UEH-0C7mp0nnI",
    authDomain: "one48-4b962.firebaseapp.com",
    projectId: "one48-4b962",
    storageBucket: "one48-4b962.firebasestorage.app",
    messagingSenderId: "785842302808",
    appId: "1:785842302808:web:345e03673e4c3938e1ff2d",
    measurementId: "G-MFJ3YDYT7P",
    databaseURL: "https://one48-4b962-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
