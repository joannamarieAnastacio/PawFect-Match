// Import the functions you need from the SDKs you need
import { getApps, initializeApp, getApp } from "firebase/app";
import { getAuth, EmailAuthProvider } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ_QiANnLFgow6yZRlMQgT6s94rCY3hmE",
  authDomain: "pawpaw-57409.firebaseapp.com",
  projectId: "pawpaw-57409",
  storageBucket: "pawpaw-57409.appspot.com",
  messagingSenderId: "694673818624",
  appId: "1:694673818624:web:86c4bf3679c71a4eb984e5",
  measurementId: "G-5GEJP1THFT"
};

// Initialize Firebase
let app, auth;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}
const provider = new EmailAuthProvider();
const db = getFirestore();
const timestamp = serverTimestamp();

export { app, auth, provider, db, timestamp };
