import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface CustomSelectorProps<T extends string> {
  options: T[];
  selected: string[]; // Change to array of strings
  onSelect: (value: T) => void;
  label?: string;
  containerClassName?: string;
  className?: string;
  rounded?: "xl" | "full";
  fontWeight?: "normal" | "medium" | "bold";
}

export default function CustomSelector<T extends string>({
  options,
  selected,
  onSelect,
  label,
  containerClassName = "",
  className = "",
  rounded = "xl",
  fontWeight = "bold",
}: CustomSelectorProps<T>) {
  const roundedStyle = rounded === "full" ? "rounded-full" : "rounded-xl";
  const fontWeightStyle = fontWeight === "bold" ? "font-[Rubik-Bold]" : fontWeight === "medium" ? "font-[Rubik-Medium]" : "font-[Rubik-Regular]";

  return (
    <View className={`${containerClassName}`}>
      {label && <Text className="text-base font-[Rubik-Medium] text-gray-900 mb-2">{label}</Text>}
      <View className="flex flex-row flex-wrap gap-4">
        {options.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => onSelect(item)}
            className={`h-[45px] min-w-[45px] px-5 items-center justify-center ${roundedStyle} ${selected.includes(item) ? "bg-[#6ABEEC]" : "bg-[#F5F5F5]"} ${className}`}
          >
            <Text className={`text-sm ${fontWeightStyle} ${selected.includes(item) ? "text-white" : "text-gray-500"}`}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
