// PersonalizeExperienceStep1.js
import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, TextInput, Pressable } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Slider from "@react-native-community/slider";
import OptionsSelector from "../components/OptionsSelector";

interface Options {
  members: string[];
  neighbourhood: string[];
  living: string[];
  aesthetic: string[];
}

interface SelectedOptions {
  members: string;
  neighbourhood: string;
  living: string;
  aesthetic: string;
}

const options: Options = {
  members: ["1", "2", "3", "4", "5+"],
  neighbourhood: ["HillSide", "City", "Suburbs", "Coast", "Countryside"],
  living: ["Quite", "Lively", "Family", "School", "GAted"],
  aesthetic: ["Modern", "European", "Victorian", "Ranch", "Bungalow", "Mediterranean"],
};

export default function RegistrationStepsScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  // const [selected, setSelected] = useState<SelectedOptions>({
  //   members: '4',
  //   neighbourhood: 'HillSide',
  //   living: 'Quite',
  //   aesthetic: 'Modern'
  // });
  const [selected, setSelected] = useState<string[]>([]);

  // Location step states
  const [distance, setDistance] = useState(10);
  const [zip, setZip] = useState("");
  const [region, setRegion] = useState({
    latitude: 51.5079,
    longitude: -0.0877,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  });

  const handleSelect = (type: keyof SelectedOptions, value: string) => {
    setSelected((prev) => ({ ...prev, [type]: value }));
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
  const renderStep1 = () => (
    <View className="flex-1">
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }} className="bg-white flex-1">
        {/* Progress Indicator */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-1 bg-[#2B62B4] rounded-full" />
          <Text className="mx-2 text-[#2B62B4]">🔒</Text>
          <View className="flex-1 h-1 bg-gray-200 rounded-full" />
        </View>

        <Text className="text-3xl font-bold mb-2 text-gray-900">Personalize your experience</Text>
        <Text className="text-base text-gray-600 mb-6">Please fill your information to help us find furnished house for you</Text>

        <OptionsSelector options={options} selected={selected} onSelect={toggleItem} />
      </ScrollView>

      {/* Next Button - Fixed at bottom */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <Pressable onPress={() => setStep(2)} className="bg-[#6ABEEC] rounded-full py-4 items-center shadow-sm">
          <Text className="text-white font-semibold text-base">Next</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View className="flex-1">
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }} className="bg-white flex-1">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-2">
          <Pressable onPress={() => setStep(1)}>
            <MaterialIcons name="arrow-back" size={24} color="#2B62B4" />
          </Pressable>
          <View className="flex-1 mx-2">
            <View className="h-1 bg-gray-200 rounded-full">
              <View className="h-1 w-[50%] bg-[#2B62B4] rounded-full" />
            </View>
          </View>
          <Pressable onPress={() => router.push("/(root)/(tabs)")}>
            <Text className="text-[#2B62B4] font-medium">Skip</Text>
          </Pressable>
        </View>

        {/* Title */}
        <Text className="text-2xl font-bold mt-2 text-gray-900">LOCATION PREFERENCE?</Text>

        {/* Zip input */}
        <TextInput
          placeholder="Zip/Postal code"
          value={zip}
          onChangeText={setZip}
          className="border border-[#E8ECF4] rounded-lg px-4 h-[50px] text-base bg-[#E8ECF4] text-center text-gray-500 font-semibold text-lg mt-4 mb-4"
          placeholderTextColor="#8391A1"
        />

        {/* Map Section */}
        <View className="relative overflow-hidden rounded-2xl h-80 mb-6">
          <MapView style={{ flex: 1 }} region={region} onRegionChangeComplete={setRegion}>
            <Marker coordinate={region} title="Location" />
            <Circle center={region} radius={distance * 1609.34} strokeColor="rgba(43, 98, 180, 0.5)" fillColor="rgba(43, 98, 180, 0.1)" />
          </MapView>
          <Pressable className="absolute top-2 right-2 p-2 rounded-xl bg-white shadow">
            <MaterialIcons name="navigation" size={24} color="#2B62B4" />
          </Pressable>
        </View>

        {/* Distance Slider */}
        <View className="mb-6 px-1">
          <View className="flex-row justify-between mb-2">
            <Text className="text-lg font-medium text-gray-900">Distance</Text>
            <Text className="text-gray-500 text-lg">{distance} mi</Text>
          </View>
          <Slider
            value={distance}
            onValueChange={setDistance}
            minimumValue={10}
            maximumValue={100}
            step={1}
            minimumTrackTintColor="#2B62B4"
            maximumTrackTintColor="#E8ECF4"
            thumbTintColor="#2B62B4"
          />
          <View className="flex-row justify-between mt-1">
            <Text className="text-sm text-gray-500">10 mi</Text>
            <Text className="text-sm text-gray-500">100 mi</Text>
          </View>
        </View>
      </ScrollView>

      {/* Next Button - Fixed at bottom */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <Pressable className="bg-[#6ABEEC] rounded-full py-4 items-center shadow-sm" onPress={() => router.push("/screens/profileScreen")}>
          <Text className="text-white text-lg font-semibold">Next</Text>
        </Pressable>
      </View>
    </View>
  );

  return <SafeAreaView className="flex-1 bg-white">{step === 1 ? renderStep1() : renderStep2()}</SafeAreaView>;
}
