import { initializeApp } from "firebase/app";
import { getAuth } from  "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyC04vuf-JddAdg82eYNuXNo8EZLJ_qCySw",
    authDomain: "reactflix-clone-e5eab.firebaseapp.com",
    projectId: "reactflix-clone-e5eab",
    storageBucket: "reactflix-clone-e5eab.appspot.com",
    messagingSenderId: "271273288993",
    appId: "1:271273288993:web:50fabc04a8028127f70a60",
    measurementId: "G-SBXBJV09QG"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
const auth = getAuth();

export { auth };
export default db;


  