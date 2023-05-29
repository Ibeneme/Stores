

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);
// firebase.auth().settings.appVerificationDisabledForTesting = true;

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Function to send email verification using Firebase
// export const sendEmailVerification = async (email) => {
//   try {
//     await auth.currentUser.sendEmailVerification();
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// Function to sign in with email and password using Firebase
// export const signIn = async (email, password) => {
//   try {
//     const userCredential = await auth.signInWithEmailAndPassword(email, password);
//     const user = userCredential.user;
//     return user;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

export default firebase;
