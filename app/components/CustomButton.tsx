import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'outline';
  className?: string;
  textClassName?: string;
}

export default function CustomButton({ 
  onPress, 
  title, 
  variant = 'primary',
  className = '',
  textClassName = ''
}: CustomButtonProps) {
  const baseStyle = "h-[55px] rounded-full justify-center items-center";
  const variantStyle = variant === 'primary' 
    ? 'bg-[#6ABEEC] shadow-lg shadow-primary/20' 
    : 'border border-gray-300 bg-white';
  const textStyle = variant === 'primary' 
    ? 'text-white' 
    : 'text-gray-600';

  return (
    <TouchableOpacity 
      className={`${baseStyle} ${variantStyle} ${className}`}
      onPress={onPress}
    >
      <Text className={`text-base font-[Rubik-Medium] ${textStyle} ${textClassName}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
} 