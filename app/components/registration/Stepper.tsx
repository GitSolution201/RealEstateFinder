import React from "react";
import { View, Text } from "react-native";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps }) => {
  return (
    <View className="flex-row items-center justify-between mb-8">
      {[...Array(totalSteps)].map((_, index) => (
        <React.Fragment key={index}>
          <View className="items-center">
            <View className={`w-8 h-8 rounded-full items-center justify-center ${
              index + 1 <= currentStep ? 'bg-[#2B62B4]' : 'bg-gray-200'
            }`}>
              <Text className={`font-bold ${
                index + 1 <= currentStep ? 'text-white' : 'text-gray-500'
              }`}>
                {index + 1}
              </Text>
            </View>
            <Text className={`text-sm mt-2 ${
              index + 1 <= currentStep ? 'text-[#2B62B4] font-medium' : 'text-gray-500'
            }`}>
              {index === 0 ? 'Personal Info' : 'Profile Picture'}
            </Text>
          </View>
          {index < totalSteps - 1 && (
            <View className="flex-1 h-0.5 mx-2 bg-gray-200" />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

export default Stepper; 