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

const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, GoogleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, GoogleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  //kullanıcı verileri mevcut değilse
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
