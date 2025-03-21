import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useGoogleAuth } from '../hooks/useGoogleAuth';

import images from "@/constants/images";
import icons from "@/constants/icons"

const SignIn = () => {
  const { signInWithGoogle, loading, error } = useGoogleAuth();
  const router = useRouter();

  const handleContinueWithEmail = () => {
    router.push('/screens/email_screen');
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.replace('/screens/UserTypeSelection');
    } catch (error) {
      console.error('Google Sign In Error:', error);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full" >
        <ScrollView contentContainerClassName="h-full">
      {/* Image Collage */}
        <Image source={images.onboarding} className="w-full h-1/2 " resizeMode="cover" />
          {/* Small Image before "A PLACE TO CALL" */}
          <View className="flex items-center mt-5">
            <Image 
              source={images.icon} 
              className="w-20 h-20" 
              resizeMode="contain"
            />
          </View>
        <View className="py-6 px-10"> 
        <Text className="text-2xl font-bold text-gray-800 text-center">A PLACE TO CALL</Text>
        <Text className="text-4xl font-bold text-blue-500 text-center my-2">HOME</Text>
        <Text className="text-sm text-gray-600 text-center px-5 mb-6">
        From 'For Sale' to 'For Lease', discover the seamless way to property fulfillment.
      </Text>
      {/* Buttons */}
      <TouchableOpacity className="bg-blue-500 py-3 px-10 rounded-full mb-3"
      onPress={handleContinueWithEmail}
      >
        <View className="flex flex-row items-center justify-center">
             <MaterialIcons name="email" size={15} className="w-5 h-5" color="white"></MaterialIcons>
        <Text className="text-white text-base font-semibold ml-2">Continue with Email</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full py-4 px-6 mb-4"
        onPress={handleGoogleSignIn}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#6ABEEC" />
        ) : (
          <>
            <Image source={icons.google} className="w-5 h-5" resizeMode="contain" />
            <Text className="text-gray-800 text-base font-semibold ml-2">
              Continue with Google
            </Text>
          </>
        )}
      </TouchableOpacity>
      {error && (
        <Text className="text-red-500 text-center mb-4">{error}</Text>
      )}
    </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn



