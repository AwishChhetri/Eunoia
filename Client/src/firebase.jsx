// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBT3pvgJcU9V2vv8VDeqWVS59JkWLrO9n4",
  authDomain: "eunoia-78ba2.firebaseapp.com",
  projectId: "eunoia-78ba2",
  storageBucket: "eunoia-78ba2.appspot.com",
  messagingSenderId: "156468858369",
  appId: "1:156468858369:web:10ec4dc53fd05d4c313a00",
  measurementId: "G-T2PLNC8DF4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);