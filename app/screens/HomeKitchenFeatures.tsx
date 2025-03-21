import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";
import OptionsSelector from "../components/OptionsSelector";

type KitchenFeatures = {
  countertops: string[];
  backsplash: string[];
  cabinets: string[];
};

export default function HomeKitchenFeatures() {
  const router = useRouter();

  const options: KitchenFeatures = {
    countertops: ["Granite", "Marble", "Quartz", "Concrete", "Butcher Block", "Stainless Steel", "Laminate", "Corian"],
    backsplash: ["Ceramic", "Glass", "Stone", "Marble", "Subway Tile", "Mosaic", "Metal", "Painted"],
    cabinets: ["Wood", "Laminate", "Painted", "Shaker", "Modern", "Glass Front", "Custom", "Two-Tone"],
  };

  const [selectedcountertops, setSelectedcountertops] = useState<string[]>([]);
  const [selectedbacksplash, setSelectedbacksplash] = useState<string[]>([]);
  const [selectedcabinets, setSelectedcabinets] = useState<string[]>([]);

  const handleContinue = () => {
    router.push("/screens/HomePictureFeatures");
  };
  const toggleItemtops = (item: string) => {
    setSelectedcountertops((prev) => {
      if (prev.includes(item)) {
        // If the item is already selected, remove it
        return prev.filter((i) => i !== item);
      } else {
        // If the item is not selected, add it
        return [...prev, item];
      }
    });
  };
  const toggleItemsplash = (item: string) => {
    setSelectedbacksplash((prev) => {
      if (prev.includes(item)) {
        // If the item is already selected, remove it
        return prev.filter((i) => i !== item);
      } else {
        // If the item is not selected, add it
        return [...prev, item];
      }
    });
  };
  const toggleItemcabinets = (item: string) => {
    setSelectedcabinets((prev) => {
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
          <Text className="text-2xl font-bold mb-2 text-gray-900">Kitchen Features</Text>
          <Text className="text-lg text-gray-600 mb-6">Which materials do we find in your kitchen?</Text>

          <View className="space-y-6">
            <View>
              <View className="h-[1px] bg-gray-300 mb-6" />
              <OptionsSelector
                options={{ features: options.countertops }}
                selected={selectedcountertops}
                onSelect={toggleItemtops}
                labels={{
                  features: "Counter-tops",
                }}
                rounded="full"
              />
            </View>

            <View>
              <View className="h-[1px] bg-gray-300 mb-6" />
              <OptionsSelector
                options={{ features: options.backsplash }}
                selected={selectedbacksplash}
                onSelect={toggleItemsplash}
                labels={{
                  features: "Backsplash",
                }}
                rounded="full"
              />
            </View>

            <View>
              <View className="h-[1px] bg-gray-300 mb-6" />
              <OptionsSelector
                options={{ features: options.cabinets }}
                selected={selectedcabinets}
                onSelect={toggleItemcabinets}
                labels={{
                  features: "Cabinets",
                }}
                rounded="full"
              />
            </View>
          </View>
        </ScrollView>
        <View className="px-6 py-4 bg-white">
          <CustomButton title="Continue" onPress={handleContinue} variant="primary" className="mx-0" />
        </View>
      </View>
    </SafeAreaView>
  );
}
