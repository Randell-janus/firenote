import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// if (!firebase.apps.length) {
firebase.initializeApp({
  apiKey: "AIzaSyD448Eany84UFuH0h_rHTpG5FM1ND80Exg",
  authDomain: "next-firebase-todo-b21dd.firebaseapp.com",
  projectId: "next-firebase-todo-b21dd",
  storageBucket: "next-firebase-todo-b21dd.appspot.com",
  messagingSenderId: "573918500193",
  appId: "1:573918500193:web:786bd1908d27fa0fd1a120",
});
// } else {
//   firebase.app(); // if already initialized, use that one
// }

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;
