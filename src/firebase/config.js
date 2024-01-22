import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyB_JM09YoZEmtqj63mxVKH30nGBjHGmrfE",
    authDomain: "myposts-5146d.firebaseapp.com",
    projectId: "myposts-5146d",
    storageBucket: "myposts-5146d.appspot.com",
    messagingSenderId: "603747063658",
    appId: "1:603747063658:web:6e06d47707d760297ef713"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
