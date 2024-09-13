/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import {getAuth} from 'firebase/auth';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAVeHeLlZpHTRW5PHirwQkDBc3yCg3rN94',
  authDomain: 'spaceimoveis-72b28.firebaseapp.com',
  projectId: 'spaceimoveis-72b28',
  storageBucket: 'spaceimoveis-72b28.appspot.com',
  messagingSenderId: '591246886346',
  appId: '1:591246886346:web:ee0a80420ace1489253b33',
  measurementId: 'G-H9KC7L4L08'
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new firebase.auth.GoogleAuthProvider();


export { auth, provider  };
