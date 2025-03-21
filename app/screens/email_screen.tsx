import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const EmailScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isButtonDisabled = !email || !validateEmail(email);

  const handleSubmit = () => {
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    router.push({
      pathname: "/screens/password_screen",
      params: { email }
    });
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

          <Text className="text-2xl font-bold text-gray-800 mb-2">May we have your</Text>
          <Text className="text-2xl font-bold text-[#2B62B4] mb-2">Email?</Text>
          <TextInput
            className="border border-[#E8ECF4] mt-8 rounded-lg px-4 h-[50px] pb-2 text-base bg-[#E8ECF4]"
            placeholder="Enter your email"
            placeholderTextColor="#8391A1"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError("");
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {error ? (
            <Text className="text-red-500 text-sm mt-1">{error}</Text>
          ) : null}
        </View>

        <View className="flex-1 justify-end pb-8">
          <TouchableOpacity
            className={`h-[56px] items-center justify-center rounded-full ${
              isButtonDisabled ? 'bg-[#6ABEEC]' : 'bg-blue-500'
            }`}
            onPress={handleSubmit}
            disabled={isButtonDisabled}
          >
            <Text className='text-center text-base font-semibold text-white '>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmailScreen; 