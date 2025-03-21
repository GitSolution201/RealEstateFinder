import React from "react";
import { View, Text } from "react-native";
import CustomSelector from "./CustomSelector";

interface OptionsSelectorProps<T extends Record<string, string[]>> {
  options: T;
  selected: string[]; // Change to array of strings
  onSelect: (value: string) => void; // Update to handle single value
  labels?: Partial<{ [K in keyof T]: string }>;
  rounded?: "xl" | "full";
  fontWeight?: "normal" | "medium" | "bold";
}

export default function OptionsSelector<T extends Record<string, string[]>>({
  options,
  selected,
  onSelect,
  labels = {},
  rounded = "xl",
  fontWeight = "bold",
}: OptionsSelectorProps<T>) {
  const renderSection = (type: keyof T) => {
    const label = labels[type];
    return (
      <View key={String(type)} className="mb-6 px-4">
        {label && <Text className="text-lg font-semibold text-gray-900 mb-2">{label.charAt(0).toUpperCase() + label.slice(1)}</Text>}
        <CustomSelector options={options[type]} selected={selected} onSelect={onSelect} containerClassName={label ? "mt-2" : ""} rounded={rounded} fontWeight={fontWeight} />
      </View>
    );
  };

  return <View>{Object.keys(options).map((key) => renderSection(key as keyof T))}</View>;
}
