import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCHldjLEBK4KCj7mMCDR3tb1ZMpQc-MUmA",
  authDomain: "realestatefinder-8d707.firebaseapp.com",
  projectId: "realestatefinder-8d707",
  storageBucket: "realestatefinder-8d707.firebasestorage.app",
  messagingSenderId: "1047819931489",
  appId: "1:1047819931489:ios:07484ec5a390933e04ff20"
};

// Initialize Firebase
let app;
try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

// Initialize Auth with AsyncStorage persistence
export const auth = app ? initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
}) : null;

export default app;