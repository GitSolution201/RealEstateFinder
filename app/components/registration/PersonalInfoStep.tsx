import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const PersonalInfoStep = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <View className="mt-8">
      <View className="mb-6">
        <Text className="text-gray-500 text-sm mb-2">Full Name</Text>
        <TextInput
          className="border border-[#E8ECF4] rounded-lg px-4 h-[50px] text-base bg-[#E8ECF4]"
          placeholder="Enter your full name"
          placeholderTextColor="#8391A1"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View className="mb-6">
        <Text className="text-gray-500 text-sm mb-2">Phone Number</Text>
        <TextInput
          className="border border-[#E8ECF4] rounded-lg px-4 h-[50px] text-base bg-[#E8ECF4]"
          placeholder="Enter your phone number"
          placeholderTextColor="#8391A1"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <View className="flex-row items-center justify-between bg-[#F8F9FA] p-4 rounded-lg">
        <View className="flex-row items-center">
          <MaterialIcons name="info-outline" size={24} color="#2B62B4" />
          <Text className="text-gray-600 ml-2">Your information is secure</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="arrow-forward-ios" size={16} color="#2B62B4" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PersonalInfoStep; 