import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { auth } from "../config/firebase";
import { sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { getUserData } from "../utils/storage";

const VerificationCheckScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email || "");
        setIsVerified(user.emailVerified);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleResendVerification = async () => {
    if (!auth.currentUser) {
      Alert.alert("Error", "No user found. Please try signing up again.");
      router.push("/screens/signin");
      return;
    }

    setIsLoading(true);
    try {
      await sendEmailVerification(auth.currentUser);
      Alert.alert("Verification Email Sent", "Please check your email for the verification link.");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push("/screens/signin");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex-1 px-6">
        <View className="py-8">
          <TouchableOpacity onPress={handleSignOut} className="mb-6">
            <MaterialIcons name="arrow-back" size={24} color="#3B82F6" />
          </TouchableOpacity>

          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Verify your <Text className="text-2xl font-bold text-[#2B62B4]">email</Text>
          </Text>

          <Text className="text-gray-600 mt-4">We've sent a verification email to:</Text>
          <Text className="text-gray-800 font-medium mt-1">{userEmail}</Text>

          <Text className="text-gray-600 mt-4">Please check your email and click the verification link to continue.</Text>

          <View className="mt-8">
            <TouchableOpacity
              className={`h-[56px] items-center justify-center rounded-full ${isLoading ? "bg-[#6ABEEC]" : "bg-blue-500"}`}
              onPress={handleResendVerification}
              disabled={isLoading}
            >
              <Text className="text-center text-base font-semibold text-white">{isLoading ? "Sending..." : "Resend Verification Email"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1 justify-end pb-8">
          <TouchableOpacity className="h-[56px] items-center justify-center rounded-full bg-gray-100" onPress={() => router.push("/screens/signin")}>
            <Text className="text-center text-base font-semibold text-gray-600">Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerificationCheckScreen;
