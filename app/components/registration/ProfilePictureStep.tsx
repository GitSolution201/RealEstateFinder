import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface ProfilePictureStepProps {
  onPhotoUpload: (photoUri: string) => void;
  photo: string | null;
}

const ProfilePictureStep: React.FC<ProfilePictureStepProps> = ({ onPhotoUpload, photo }) => {
  return (
    <View className="mt-8">
      <View className="items-center">
        <TouchableOpacity
          onPress={() => onPhotoUpload("dummy-photo-uri")}
          className="w-32 h-32 rounded-full bg-gray-100 items-center justify-center border-2 border-dashed border-gray-300"
        >
          {photo ? (
            <MaterialIcons name="photo" size={48} color="#2B62B4" />
          ) : (
            <MaterialIcons name="camera-alt" size={48} color="#2B62B4" />
          )}
        </TouchableOpacity>
        <Text className="text-gray-500 text-base mt-4">Upload your profile picture</Text>
      </View>

      <View className="flex-row items-center justify-between bg-[#F8F9FA] p-4 rounded-lg mt-8">
        <View className="flex-row items-center">
          <MaterialIcons name="info-outline" size={24} color="#2B62B4" />
          <Text className="text-gray-600 ml-2">Your photo will be visible to other users</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="arrow-forward-ios" size={16} color="#2B62B4" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfilePictureStep; 