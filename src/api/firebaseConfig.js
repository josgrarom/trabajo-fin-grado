import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import 'firebase/storage';
import { getStorage } from 'firebase/storage';
export const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyA_kFEbFOHhb33A7KB5DrCswOMmjKIAf3o",
  authDomain: "trabajo-fin-grado-4f454.firebaseapp.com",
  projectId: "trabajo-fin-grado-4f454",
  storageBucket: "trabajo-fin-grado-4f454.appspot.com",
  messagingSenderId: "861924981875",
  appId: "1:861924981875:web:16ddd26555f416496c7e06",
  measurementId: "G-GZ46MSNDJ5",
  databaseURL: "https://trabajo-fin-grado-4f454-default-rtdb.europe-west1.firebasedatabase.app"
});

export const db = getFirestore();
export const auth = getAuth();
export const database = getDatabase();
export const storage = getStorage();