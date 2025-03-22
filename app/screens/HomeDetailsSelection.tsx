import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TextInput } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "../components/CustomButton";
import OptionsSelector from "../components/OptionsSelector";
import BackButton from "../components/BackButton";

interface Options {
  bedrooms: string[];
  bathrooms: string[];
}

interface SelectedOptions {
  bedrooms: string;
  bathrooms: string;
}

const options: Options = {
  bedrooms: ["1", "2", "3", "4+"],
  bathrooms: ["1 ", "2 ", "3 ", "4 ", "5 "],
};

export default function HomeDetailsSelection() {
  const router = useRouter();
  // const [selected, setSelected] = useState<SelectedOptions>({
  //   bedrooms: "2",
  //   bathrooms: "2",
  // });
  const [selectedBath, setSelectedBath] = useState<string[]>([]);

  const [selectedKitchen, setSelectedKitchen] = useState<string[]>([]);
  const [inputValues, setInputValues] = useState({
    input1: "",
    input2: "",
    input3: "",
  });
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (type: keyof SelectedOptions, value: string) => {
    setSelected((prev) => ({ ...prev, [type]: value }));
  };

  const handleInputChange = (field: keyof typeof inputValues, value: string) => {
    setInputValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    router.push("/screens/HomeFeatures");
  };
  const toggleItem = (item: string) => {
    setSelectedBath((prev) => {
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
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        {/* Header */}
        <Text className="text-2xl font-bold mb-2 text-gray-900">Lets get the facts</Text>
        <Text className="text-2xl font-bold mb-2 text-gray-900 pb-8 pt-0">straight...</Text>

        {/* Options */}

        <OptionsSelector
          options={options}
          selected={selectedBath}
          onSelect={toggleItem}
          labels={{
            bedrooms: "Bedrooms",
            bathrooms: "Bathrooms",
          }}
        />

        {/* Input Fields */}
        <View className="mt-6 space-y-4">
          <View>
            <Text className="text-black text-base mb-5">Square Footage</Text>
            <TextInput
              className="border border-[#E8ECF4] rounded-lg px-4 h-[50px] text-base bg-[#E8ECF4]"
              value={inputValues.input1}
              onChangeText={(value) => handleInputChange("input1", value)}
            />
          </View>

          <View>
            <Text className="text-black text-base my-5">Parking</Text>
            <TextInput
              className="border border-[#E8ECF4] rounded-lg px-4 h-[50px] text-base bg-[#E8ECF4]"
              value={inputValues.input2}
              onChangeText={(value) => handleInputChange("input2", value)}
            />
          </View>

          <View>
            <Text className="text-black text-base my-5">Year Built</Text>
            <TextInput
              className="border border-[#E8ECF4] rounded-lg px-4 h-[50px] text-base bg-[#E8ECF4]"
              value={inputValues.input3}
              onChangeText={(value) => handleInputChange("input3", value)}
            />
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View className="absolute bottom-0 left-0 right-0 p-8 bg-white">
        <CustomButton title="Next" onPress={handleContinue} variant="primary" className="mx-0" />
      </View>
    </SafeAreaView>
  );
}
