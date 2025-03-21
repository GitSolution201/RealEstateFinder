import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function BackButton() {
  const router = useRouter();

  return (
    <TouchableOpacity 
      onPress={() => router.back()}
      className="px-4 py-4"
    >
      <Ionicons name="chevron-back" size={28} color="#6ABEEC" />
    </TouchableOpacity>
  );
} 