import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC1kZy3RWwYkPBZ36ksMYpOeJ9H_yABv0s",
  authDomain: "milofoods-20131.firebaseapp.com",
  projectId: "milofoods-20131",
  storageBucket: "milofoods-20131.appspot.com",
  messagingSenderId: "159232251381",
  appId: "1:159232251381:web:a97c3d9fc699b7b4c43cbc",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
