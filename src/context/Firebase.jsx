// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvI6uP-dTL6xdFSs8Yflg3O893S4FJcCU",
  authDomain: "rapid-esop.firebaseapp.com",
  projectId: "rapid-esop",
  storageBucket: "rapid-esop.appspot.com",
  messagingSenderId: "1038847846103",
  appId: "1:1038847846103:web:9a81f8da7c0f993a79b292",
  measurementId: "G-4QGG6VH9JS",
  databaseURL: "https://rapid-esop-default-rtdb.firebaseio.com/"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database=getDatabase(app);