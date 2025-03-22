import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";
import OptionsSelector from "../components/OptionsSelector";

type HomeFeatures = {
  features: string[];
};

export default function HomeFeatures() {
  const router = useRouter();

  const options: HomeFeatures = {
    features: ["Pool", "Gym", "Garden", "Balcony", "Parking", "Security"],
  };

  // const [selected, setSelected] = useState<Record<keyof HomeFeatures, string>>({
  //   features: "Pool",
  // });
  const [selected, setSelected] = useState<string[]>([]);

  const handleContinue = () => {
    router.push("/screens/HomeInteriorFeatures");
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
      <ScrollView className="flex-1 px-6">
        {/* Header */}
        <Text className="text-2xl  font-bold mb-2 text-gray-900">Which best describes</Text>
        <Text className="text-2xl  font-bold mb-8 text-gray-900">your home...</Text>

        {/* Options */}
        <OptionsSelector options={options} selected={selected} onSelect={toggleItem} rounded="full" />
      </ScrollView>

      {/* Continue Button */}
      <View className="px-6 py-4 bg-white">
        <CustomButton title="Continue" onPress={handleContinue} variant="primary" className="mx-0" />
      </View>
    </SafeAreaView>
  );
}
