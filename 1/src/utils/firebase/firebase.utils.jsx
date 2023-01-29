import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

//----------------------------------------------------------------------------

const firebaseConfig = {
  apiKey: "AIzaSyA_bsv0iyrji3fv0yUhNqcVKYUOpXsXxYA",
  authDomain: "crwn-clothing-db-ca7fe.firebaseapp.com",
  projectId: "crwn-clothing-db-ca7fe",
  storageBucket: "crwn-clothing-db-ca7fe.appspot.com",
  messagingSenderId: "558904054006",
  appId: "1:558904054006:web:16c3a823315efa689a9cd7",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());
};
