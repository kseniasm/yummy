import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0Lafwg7vBnecl2bcJB1zW3G7xwOSdtvQ",
  authDomain: "yummy-4c5e9.firebaseapp.com",
  databaseURL: "https://yummy-4c5e9.firebaseio.com",
  projectId: "yummy-4c5e9",
  storageBucket: "yummy-4c5e9.appspot.com",
  messagingSenderId: "1076375025055",
  appId: "1:1076375025055:web:df04079341d26f1faf79aa",
  measurementId: "G-E1R6EP0TX8"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
