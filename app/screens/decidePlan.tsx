import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function DecidePlan() {
  const router = useRouter();
  const [price, setPrice] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        {/* Header with Back Button */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => router.back()} className="flex-row items-center">
            <MaterialIcons name="chevron-left" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View className="px-4 mb-4">
          <Text className="text-2xl font-semibold text-gray-900">Decide a Price</Text>
        </View>

        {/* Price Input */}
        <View className="mx-4 mb-4">
          <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3">
            <Text className="text-2xl text-gray-400 mr-2">$</Text>
            <TextInput value={price} onChangeText={setPrice} keyboardType="numeric" placeholder="" className="flex-1 text-2xl" placeholderTextColor="#A0A0A0" />
          </View>
        </View>

        {/* Cloud Suggestion */}
        <View className="mx-4">
          <Text className="text-base text-gray-600">
            See what <Text className="text-[#6ABEEC] font-medium">Cloud</Text> believes your house is worth
          </Text>
        </View>

        {/* Post Button - Fixed at bottom */}
        <View className="absolute bottom-8 left-8 right-8">
          <TouchableOpacity
            className="bg-[#6ABEEC] rounded-full py-4 items-center shadow-sm"
            onPress={() => {
              // if (price.trim()) {
              router.push("/screens/congratulation");
              // }
            }}
          >
            <Text className="text-white font-semibold text-base">Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
