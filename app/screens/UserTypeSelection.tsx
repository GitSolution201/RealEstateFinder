import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import CustomButton from '../components/CustomButton';
import BackButton from '../components/BackButton';

type UserType = 'buyer' | 'seller';

export default function UserTypeSelection() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<UserType>('buyer');

  const handleContinue = () => {
    if (selectedType === 'buyer') {
      router.push('/screens/registration_steps_screen');
    } else {
      router.push('/screens/search');
    }
  };

  const Option = ({ type, label }: { type: UserType; label: string }) => {
    const isSelected = selectedType === type;
    return (
      <TouchableOpacity 
        onPress={() => setSelectedType(type)}
        className={`flex-row py-4 rounded-xl`}
      >
        <View className={`h-6 w-6 rounded-full ${isSelected ? 'bg-[#6ABEEC]' : 'bg-gray-100'}`} />
        <Text className={`text-lg font-[Rubik-Medium] ml-4`}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackButton />
      <View className="flex-1 px-6">
        {/* Header */}
        <Text className="text-2xl font-bold mb-4 text-gray-900">
          Are you a <Text className="text-[#6ABEEC]">Buyer</Text> or <Text className="text-[#6ABEEC]">Seller</Text>?
        </Text>

        {/* Options and Continue Button */}
        <View className="w-full ">
          <Option type="buyer" label="I'm a Buyer" />
          <Option type="seller" label="I'm a Seller" />
          <View className="mt-4">
            <CustomButton
              title="Continue"
              onPress={handleContinue}
              variant="primary"
              className="mx-0"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
} 