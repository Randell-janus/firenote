import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const clientCredentials = {
  apiKey: "AIzaSyARKhJThLpHSjZWcdZGdBGF_HnuzvIX_9w",
  authDomain: "nextjs-firebase-f3bf4.firebaseapp.com",
  databaseURL: "https://nextjs-firebase-f3bf4.firebaseio.com",
  projectID: "nextjs-firebase-f3bf4",
  storageBucket: "nextjs-firebase-f3bf4.appspot.com",
  messagingSender: "681803110148",
  appID: "1:681803110148:web:920d92fdc3772c21e8a251",
};

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials);

    if (typeof window !== "undefined") {
      if ("measurementID" in clientCredentials) {
        firebase.analytics();
        firebase.performance();
      }
    }
    console.log("Firebase init.");
  }
}
