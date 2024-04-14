import { getApps, initializeApp } from 'firebase/app';
import {getAuth, initializeAuth} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as firebaseAuth from 'firebase/auth';
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAiBSYxtyqaK8uTmAFUeVESkdkSKv5r_tY",
    authDomain: "travel-go-75d80.firebaseapp.com",
    projectId: "travel-go-75d80",
    storageBucket: "travel-go-75d80.appspot.com",
    messagingSenderId: "207520597979",
    appId: "1:207520597979:web:e5329d419cad98cca309fe",
    measurementId: "G-2ZMHXQRYN8"
};

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence:reactNativePersistence(AsyncStorage),
});
const firestore_db=getFirestore(app);

export{auth ,firestore_db,app}
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
