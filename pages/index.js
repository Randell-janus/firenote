import Head from "next/head";
import Todos from "../components/Todos";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import firebase from 'firebase'

const signInWithGoogle = () => {auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())};

const SignIn = () => (
  <main>
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  </main>
);

export default function Home() {
  const [user] = useAuthState(auth);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user ? <Todos /> : <SignIn />}
    </div>
  );
}
