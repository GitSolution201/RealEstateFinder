import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TextInput } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";

export default function ChangeAddress() {
  const router = useRouter();
  const [description, setDescription] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <BackButton />

        {/* Header */}
        <Text className="text-2xl font-bold mb-2 text-gray-900">Write something</Text>
        <Text className="text-2xl font-bold mb-2 text-gray-900 pb-8">about the house...</Text>

        {/* Description Input */}
        <View className="mt-6">
          <Text className="text-black text-base mb-5">Description</Text>
          <TextInput
            multiline
            value={description}
            onChangeText={setDescription}
            placeholder="Add a note..."
            placeholderTextColor="#A0A0A0"
            className="border border-[#E8ECF4] rounded-lg p-4 min-h-[200] text-base bg-[#E8ECF4]"
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={{ marginBottom: 40 }} className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-white border-t border-gray-200">
        <CustomButton
          title="Continue"
          onPress={() => {
            // if (description.trim()) {
            router.push("/screens/estimatedFacts");
            // }
          }}
          variant="primary"
          className="mx-0"
        />
      </View>
    </SafeAreaView>
  );
}
