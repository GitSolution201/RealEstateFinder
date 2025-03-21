import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";
import OptionsSelector from "../components/OptionsSelector";

type FlooringFeatures = {
  kitchen: string[];
  bedrooms: string[];
  bathrooms: string[];
  livingRoom: string[];
};

const SectionTitle = ({ title }: { title: string }) => (
  <View className="mb-4">
    <Text className="text-xl font-[Rubik-Medium] text-gray-900 mb-4">{title}</Text>
    <View className="h-[1px] bg-gray-200" />
  </View>
);

export default function HomeFlooringFeatures() {
  const router = useRouter();

  const options: FlooringFeatures = {
    kitchen: ["Tile", "Hardwood", "Vinyl", "Laminate", "Stone", "Cork", "Bamboo", "Concrete"],
    bedrooms: ["Carpet", "Hardwood", "Laminate", "Vinyl", "Bamboo", "Cork", "Area Rugs", "Engineered Wood"],
    bathrooms: ["Tile", "Vinyl", "Stone", "Marble", "Porcelain", "Ceramic", "Non-Slip Tile", "Luxury Vinyl"],
    livingRoom: ["Hardwood", "Carpet", "Laminate", "Tile", "Vinyl", "Stone", "Bamboo", "Area Rugs"],
  };

  // const [selected, setSelected] = useState<Record<keyof FlooringFeatures, string>>({
  //   kitchen: "",
  //   bedrooms: "",
  //   bathrooms: "",
  //   livingRoom: "",
  // });
  const [selectedBathRoom, setSelectedBathroom] = useState<string[]>([]);
  const [selectedKitchen, setSelectedKitchen] = useState<string[]>([]);
  const [selectedBedRoom, setSelectedBedRoom] = useState<string[]>([]);
  const [selectedLivingRoom, setSelectedLivingRoom] = useState<string[]>([]);

  const handleContinue = () => {
    router.push("/screens/HomeKitchenFeatures");
  };
  const toggleItemKitchen = (item: string) => {
    setSelectedKitchen((prev) => {
      if (prev.includes(item)) {
        // If the item is already selected, remove it
        return prev.filter((i) => i !== item);
      } else {
        // If the item is not selected, add it
        return [...prev, item];
      }
    });
  };
  const toggleItemBathroom = (item: string) => {
    setSelectedBathroom((prev) => {
      if (prev.includes(item)) {
        // If the item is already selected, remove it
        return prev.filter((i) => i !== item);
      } else {
        // If the item is not selected, add it
        return [...prev, item];
      }
    });
  };
  const toggleItemBedroom = (item: string) => {
    setSelectedBedRoom((prev) => {
      if (prev.includes(item)) {
        // If the item is already selected, remove it
        return prev.filter((i) => i !== item);
      } else {
        // If the item is not selected, add it
        return [...prev, item];
      }
    });
  };
  const toggleItemLivingRoom = (item: string) => {
    setSelectedLivingRoom((prev) => {
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
          <Text className="text-2xl font-bold mb-2 text-gray-900">Flooring Types</Text>
          <Text className="text-lg text-gray-600 mb-6">What flooring do we find in your home?</Text>

          <View className="space-y-6">
            <View>
              <View className="h-[1px] bg-gray-300 mb-6" />

              <OptionsSelector
                options={{ features: options.kitchen }}
                selected={selectedKitchen}
                onSelect={toggleItemKitchen}
                labels={{
                  features: "Kitchen",
                }}
                rounded="full"
              />
            </View>

            <View>
              <View className="h-[1px] bg-gray-300 mb-6" />

              <OptionsSelector
                options={{ features: options.bedrooms }}
                selected={selectedBedRoom}
                onSelect={toggleItemBedroom}
                labels={{
                  features: "Bedrooms",
                }}
                rounded="full"
              />
            </View>

            <View>
              <View className="h-[1px] bg-gray-300 mb-6" />

              <OptionsSelector
                options={{ features: options.bathrooms }}
                selected={selectedBathRoom}
                onSelect={toggleItemBathroom}
                labels={{
                  features: "Bathrooms",
                }}
                rounded="full"
              />
            </View>

            <View>
              <View className="h-[1px] bg-gray-300 mb-6" />
              <OptionsSelector
                options={{ features: options.livingRoom }}
                selected={selectedLivingRoom}
                onSelect={toggleItemLivingRoom}
                labels={{
                  features: "Living Room",
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
