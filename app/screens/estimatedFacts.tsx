import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function EstimatedFacts() {
  const router = useRouter();
  const [gasCost, setGasCost] = useState("");
  const [waterCost, setWaterCost] = useState("");
  const [electricityCost, setElectricityCost] = useState("");
  const [trashCost, setTrashCost] = useState("");

  const handleNext = () => {
    // You can handle the logic for saving or processing the input values here
    router.push("/screens/decidePlan");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      >
        {/* Header with Back Button */}
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center"
          >
            <MaterialIcons name="chevron-left" size={24} color="#000" />
            <Text className="text-lg font ml-2">
              Estimated Monthly Utility Costs

            </Text>
          </TouchableOpacity>
        </View>

        {/* Utility Input Fields */}
        <View className="bg-white p-4 rounded-lg">
          {/* Gas Input */}
          <View className="mb-6">
            {/* Added mb-6 for space below this group */}
            <Text className="text-md text-black-600 mb-2">Gas</Text>
            <TextInput
              value={gasCost}
              onChangeText={setGasCost}
              keyboardType="numeric"
              className="border border-gray-300 rounded-lg p-3 bg-gray-100"
            />
          </View>

          {/* Water Input */}
          <View className="mb-6">
            {/* Added mb-6 for space below this group */}
            <Text className="text-md text-black-600 mb-2">Water</Text>
            <TextInput
              value={waterCost}
              onChangeText={setWaterCost}
              keyboardType="numeric"
              className="border border-gray-300 rounded-lg p-3 bg-gray-100"
            />
          </View>

          {/* Electricity Input */}
          <View className="mb-6">
            {/* Added mb-6 for space below this group */}
            <Text className="text-md text-black-600 mb-2">Electricity</Text>
            <TextInput
              value={electricityCost}
              onChangeText={setElectricityCost}
              keyboardType="numeric"
              className="border border-gray-300 rounded-lg p-3 bg-gray-100"
            />
          </View>

          {/* Trash Input */}
          <View className="mb-6">
            {/* Added mb-6 for space below this group */}
            <Text className="text-md text-black-600 mb-2">Trash</Text>
            <TextInput
              value={trashCost}
              onChangeText={setTrashCost}
              keyboardType="numeric"
              className="border border-gray-300 rounded-lg p-3 bg-gray-100"
            />
          </View>
        </View>
      </ScrollView>

      {/* Next Button - Fixed at bottom */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <TouchableOpacity
          className="bg-[#6ABEEC] rounded-full py-4 items-center shadow-sm"
          onPress={handleNext}
        >
          <Text className="text-white font-semibold text-base">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
