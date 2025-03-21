import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";
import OptionsSelector from "../components/OptionsSelector";

type ExteriorFeatures = {
  features: string[];
};

export default function HomeExteriorFeatures() {
  const router = useRouter();

  const options: ExteriorFeatures = {
    features: [
      // Outdoor Spaces
      "Garden",
      "Patio",
      "Balcony",
      "Terrace",
      "Deck",
      "Porch",
      "Yard",
      "Lawn",
      "Courtyard",
      "Rooftop",

      // Parking & Access
      "Garage",
      "Carport",
      "Driveway",
      "Street Parking",
      "Covered Parking",
      "EV Charging",
      "Gated Entry",
      "Ramp Access",

      // Recreation
      "Pool",
      "Hot Tub",
      "BBQ Area",
      "Fire Pit",
      "Playground",
      "Tennis Court",
      "Basketball Court",
      "Dog Park",
      "Walking Trail",
      "Bike Rack",

      // Building Features
      "Security Gate",
      "Intercom",
      "Mail Box",
      "Package Room",
      "Storage Shed",
      "Workshop",
      "Guest Parking",

      // Landscaping
      "Trees",
      "Flowers",
      "Vegetable Garden",
      "Irrigation",
      "Fountain",
      "Pond",
      "Rock Garden",

      // Outdoor Amenities
      "Outdoor Kitchen",
      "Dining Area",
      "Lounge Area",
      "Hammock",
      "Swing Set",
      "Gazebo",
      "Pergola",
      "Awning",

      // Lighting & Security
      "Path Lights",
      "Motion Sensors",
      "Security Cameras",
      "Flood Lights",
      "Garden Lights",
      "Address Light",

      // Maintenance
      "Sprinklers",
      "Drainage",
      "Gutters",
      "Pest Control",
      "Snow Removal",
      "Leaf Guard",

      // Views
      "City View",
      "Mountain View",
      "Water View",
      "Park View",
      "Garden View",
      "Sunset View",
    ],
  };

  // const [selected, setSelected] = useState<Record<keyof ExteriorFeatures, string>>({
  //   features: "",
  // });
  const [selected, setSelected] = useState<string[]>([]);

  const handleContinue = () => {
    router.push("/screens/HomeFlooringFeatures");
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
        <Text className="text-2xl font-bold mb-2 text-gray-900">Exterior Features</Text>
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
