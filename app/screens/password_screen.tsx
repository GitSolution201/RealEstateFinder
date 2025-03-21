import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { storeUserData } from "../utils/storage";

const PasswordScreen = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    return "";
  };

  const isButtonDisabled = !password || !!validatePassword(password) || isLoading;

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!auth) {
      setError("Authentication is not initialized");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Try to sign in first
      const userCredential = await signInWithEmailAndPassword(auth, email as string, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        Alert.alert(
          "Email Not Verified",
          "Please verify your email before signing in. Check your inbox for the verification link.",
          [
            {
              text: "OK",
              onPress: () => {
                // Sign out the unverified user
                if (auth) auth.signOut();
              }
            }
          ]
        );
        return;
      }

      // If email is verified, proceed to user type selection
      router.replace("/screens/UserTypeSelection");

    } catch (error: any) {
      // Handle specific Firebase Auth errors
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/invalid-credential':
          // If user doesn't exist or invalid credentials, create new account
          try {
            const userCredential = await createUserWithEmailAndPassword(auth, email as string, password);
            const user = userCredential.user;

            // Send verification email
            await sendEmailVerification(user);

            // Store user data
            const userData = {
              uid: user.uid,
              email: user.email,
              createdAt: new Date().toISOString(),
              isVerified: false
            };
            await storeUserData(userData);

            Alert.alert(
              "Welcome!",
              "We've sent a verification email to your inbox. Please verify your email to continue.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    // Sign out the unverified user
                    if (auth) auth.signOut();
                    // Navigate to verification check screen
                    router.push("/screens/verification_check_screen");
                  }
                }
              ]
            );
          } catch (createError: any) {
            setError(createError.message);
          }
          break;

        case 'auth/wrong-password':
          setError("Incorrect password");
          break;

        case 'auth/invalid-email':
          setError("Invalid email address");
          break;

        case 'auth/too-many-requests':
          setError("Too many attempts. Please try again later");
          break;

        default:
          setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Handle forgot password navigation
    console.log("Forgot password clicked");
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex-1 px-6">
        <View className="py-8">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mb-6"
          >
            <MaterialIcons name="arrow-back" size={24} color="#3B82F6" />
          </TouchableOpacity>

          <Text className="text-2xl font-bold text-gray-800 mb-2">Enter your <Text className="text-2xl font-bold text-[#2B62B4] mb-2">pass-key!</Text> </Text>
          
          <View className="relative mt-7">
            <TextInput
              className="border border-[#E8ECF4] rounded-lg px-4  h-[50px] pb-2 text-base bg-[#E8ECF4]"
              placeholder="Enter your password"
              placeholderTextColor="#8391A1"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError("");
              }}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3"
            >
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={24}
                color="#8391A1"
              />
            </TouchableOpacity>
          </View>
          {error ? (
            <Text className="text-red-500 text-sm mt-1">{error}</Text>
          ) : null}
          
          <TouchableOpacity 
            onPress={handleForgotPassword}
            className="self-end mt-2"
          >
            <Text className="text-[#2B62B4] text-sm font-medium">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 justify-end pb-8">
          <TouchableOpacity
            className={`h-[56px] items-center justify-center rounded-full ${
              isButtonDisabled ? 'bg-[#6ABEEC]' : 'bg-blue-500'
            }`}
            onPress={handleSubmit}
            disabled={isButtonDisabled}
          >
            <Text className="text-center text-base font-semibold text-white">
              {isLoading ? "Loading..." : "Sign In"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PasswordScreen; 