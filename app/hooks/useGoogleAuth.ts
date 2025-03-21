import { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from '../config/firebase';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);

      // Configure Google Sign In
      GoogleSignin.configure({
        webClientId: '1047819931489-lvj8obcif9k82ibth6mvs1kdkf5uckaq.apps.googleusercontent.com', // Get this from your Firebase console
      });

      // Get user ID token
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { accessToken } = await GoogleSignin.getTokens();

      // Create a Google credential with the token
      const credential = GoogleAuthProvider.credential(null, accessToken);

      console.log('credential',credential);
      
      // Sign in with credential
      const userCredential = await signInWithCredential(auth, credential);
      
      return userCredential.user;
    } catch (error: any) {
      setError(error.message);
      console.error('Google Sign-In Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      await auth.signOut();
    } catch (error: any) {
      console.error('Sign Out Error:', error);
      throw error;
    }
  };

  return {
    signInWithGoogle,
    signOut,
    loading,
    error,
  };
}; 