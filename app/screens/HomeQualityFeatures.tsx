import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";
import OptionsSelector from "../components/OptionsSelector";

type QualityFeatures = {
  quality: string[];
  condition: string[];
  updates: string[];
};

export default function HomeQualityFeatures() {
  const router = useRouter();

  const options: QualityFeatures = {
    quality: ["Luxury", "High-End", "Mid-Range", "Budget-Friendly"],
    condition: ["New Construction", "Recently Renovated", "Well Maintained", "Needs Updates"],
    updates: ["Recently Updated", "Partially Updated", "Original Condition", "Needs Renovation"],
  };

  // Change selected to an array of strings
  const [selected, setSelected] = useState<string[]>([]);

  const handleContinue = () => {
    router.push("/screens/HomeExteriorFeatures");
  };

  const toggleItem = (item: string) => {
    setSelected((prev) => {
      if (prev.includes(item)) {
        // If the item is already selected, remove it
        return prev.filter((i) => i !== item);
      } else {
        // If the item is not selected, add it
        return [...prev, item];
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackButton />
      <View className="flex-1">
        <ScrollView className="flex-1 px-6">
          <Text className="text-2xl font-bold mb-6">Home Quality & Condition</Text>
          <OptionsSelector
            options={options}
            selected={selected}
            onSelect={toggleItem} // Pass the toggleItem function
            labels={{
              quality: "Overall Quality",
              condition: "Current Condition",
              updates: "Update Status",
            }}
          />
        </ScrollView>
        <View className="px-6 py-4 bg-white">
          <CustomButton title="Continue" onPress={handleContinue} variant="primary" className="mx-0" />
        </View>
      </View>
    </SafeAreaView>
  );
}
