import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

//----------------------------------------------------------------------------

const firebaseConfig = {
  apiKey: "AIzaSyA_bsv0iyrji3fv0yUhNqcVKYUOpXsXxYA",
  authDomain: "crwn-clothing-db-ca7fe.firebaseapp.com",
  projectId: "crwn-clothing-db-ca7fe",
  storageBucket: "crwn-clothing-db-ca7fe.appspot.com",
  messagingSenderId: "558904054006",
  appId: "1:558904054006:web:16c3a823315efa689a9cd7",
};

//----------------------------------------------------------------------------

const firebaseApp = initializeApp(firebaseConfig);

//----------------------------------------------------------------------------

const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({
  prompt: "select_account",
});

//----------------------------------------------------------------------------

export const auth = getAuth();

//----------------------------------------------------------------------------

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, GoogleProvider);

//----------------------------------------------------------------------------

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, GoogleProvider);

//----------------------------------------------------------------------------

export const db = getFirestore();

//----------------------------------------------------------------------------

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docREf = doc(collectionRef, object.title.toLowerCase());
    batch.set(docREf, object);
  });

  await batch.commit();
  console.log("done");
};

//----------------------------------------------------------------------------

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapShot) => {
    const { title, items } = docSnapShot.data();
    acc[title.toLowerCase()] = items;

    return acc;
  }, {});

  return categoryMap;
};
//----------------------------------------------------------------------------

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = { displayName: "mike" }
) => {
  if (!userAuth) return;

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
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  //----------------------------------------------------------------------------

  return userDocRef;
};

//----------------------------------------------------------------------------

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

//----------------------------------------------------------------------------

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

//----------------------------------------------------------------------------

export const signOutUser = async () => await signOut(auth);

//----------------------------------------------------------------------------

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

//----------------------------------------------------------------------------
