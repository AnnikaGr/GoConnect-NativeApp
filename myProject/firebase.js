// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {getStorage} from 'firebase/storage'
import {initializeFirestore} from 'firebase/firestore'
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBqnrFtU7oyNnEYnxNMv1FfNL0VwOaliM",
  authDomain: "meetupapp-411f6.firebaseapp.com",
  databaseURL: "https://meetupapp-411f6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "meetupapp-411f6",
  storageBucket: "meetupapp-411f6.appspot.com",
  messagingSenderId: "806278500537",
  appId: "1:806278500537:web:80b0cd16311f780b824b68"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const realtime_database = getDatabase(app);

export const db = initializeFirestore(app, {
		experimentalForceLongPolling: true,
	});

export function signIn(email, password) {
	return signInWithEmailAndPassword(auth, email, password);
}

export function signUp(email, password) {
	return createUserWithEmailAndPassword(auth, email, password);
}
