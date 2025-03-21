import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import CustomButton from '../components/CustomButton';
import BackButton from '../components/BackButton';
import GooglePlacesSearch from '../components/GooglePlacesSearch';

export default function SearchScreen() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/screens/HomeDetailsSelection');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackButton />
      <View className="flex-1 px-6">
      <View className="mb-8">
            <Text className="text-2xl font-bold mb-2 text-gray-900">Let's get your</Text>
            <Text className="text-2xl font-bold mb-2 text-gray-900">address..</Text>
          </View>
        <GooglePlacesSearch />
        <View className="absolute bottom-8 left-6 right-6">
          <CustomButton
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            className="mx-0"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
