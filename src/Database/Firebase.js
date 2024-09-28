import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAIVZk9xQAbjh5JIkvN17R7ql7wNETiB0c",
  authDomain: "bingebox-97ec3.firebaseapp.com",
  projectId: "bingebox-97ec3",
  storageBucket: "bingebox-97ec3.appspot.com",
  messagingSenderId: "689862667736",
  appId: "1:689862667736:web:76042bc1d1a43409f056ad",
  measurementId: "G-LYDXKZNKY8"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)