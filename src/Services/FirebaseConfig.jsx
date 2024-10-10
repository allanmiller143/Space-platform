/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import {getAuth} from 'firebase/auth';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCc1WJj8UliI5C3jPNLdrdnuoZCdTqTGYM",
  authDomain: "spaceimoveis-72b28.firebaseapp.com",
  projectId: "spaceimoveis-72b28",
  storageBucket: "spaceimoveis-72b28.appspot.com",
  messagingSenderId: "591246886346",
  appId: "1:591246886346:web:92231e5543ae814e253b33",
  measurementId: "G-E0Z06CHBG1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new firebase.auth.GoogleAuthProvider();


export { auth, provider  };
