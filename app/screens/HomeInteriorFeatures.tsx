import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";
import OptionsSelector from "../components/OptionsSelector";

type InteriorFeatures = {
  features: string[];
};

export default function HomeInteriorFeatures() {
  const router = useRouter();

  const options: InteriorFeatures = {
    features: [
      // Basic Amenities
      "AC",
      "TV",
      "WiFi",
      "Cable",
      "Internet",
      "Heating",
      "Fan",

      // Kitchen
      "Fridge",
      "Stove",
      "Oven",
      "Microwave",
      "Dishwasher",
      "Coffee Maker",

      // Laundry
      "Washer",
      "Dryer",
      "Iron",
      "Vacuum",

      // Bathroom
      "Shower",
      "Bathtub",
      "Hair Dryer",
      "Towels",

      // Furniture
      "Sofa",
      "Bed",
      "Desk",
      "Dining Table",
      "Wardrobe",
      "Dresser",

      // Entertainment
      "Gaming",
      "DVD",
      "Sound System",
      "Books",

      // Building Features
      "Elevator",
      "Parking",
      "Security",
      "Storage",

      // Comfort
      "AC Remote",
      "Blackout",
      "Curtains",
      "Cushions",
    ],
  };

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
      <ScrollView className="flex-1 px-6">
        {/* Header */}
        <Text className="text-2xl font-bold mb-2 text-gray-900">Interior Features</Text>
        <Text className="text-lg text-gray-600 mb-8">Select all that apply to your home</Text>

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
