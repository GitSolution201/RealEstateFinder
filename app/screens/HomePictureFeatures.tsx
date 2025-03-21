import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CustomButton from "../components/CustomButton";
import * as ImagePicker from 'expo-image-picker';

interface Feature {
  id: number;
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  image?: string;
}

const propertyFeatures: Feature[] = [
  { id: 1, title: "Front House", icon: "home" },
  { id: 2, title: "Walk in Front", icon: "directions-walk" },
  { id: 3, title: "Living Room", icon: "weekend" },
  { id: 4, title: "Dining", icon: "restaurant" },
  { id: 5, title: "Background", icon: "landscape" },
  { id: 6, title: "Back house", icon: "house" },
  { id: 7, title: "Garden", icon: "local-florist" },
  { id: 8, title: "Fire place", icon: "local-fire-department" },
  { id: 9, title: "Garage", icon: "garage" },
  { id: 10, title: "More", icon: "add" },
];

export default function PicturesScreen() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newFeatureName, setNewFeatureName] = useState("");
  const [customFeatures, setCustomFeatures] = useState<Feature[]>([]);
  const [features, setFeatures] = useState<Feature[]>(propertyFeatures);

  const pickImage = async (feature: Feature) => {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Show action sheet for camera/gallery choice
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        {
          text: 'Take Photo',
          onPress: () => launchCamera(feature),
        },
        {
          text: 'Choose from Gallery',
          onPress: () => launchGallery(feature),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const launchCamera = async (feature: Feature) => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    handleImageResult(result, feature);
  };

  const launchGallery = async (feature: Feature) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    handleImageResult(result, feature);
  };

  const handleImageResult = (result: ImagePicker.ImagePickerResult, feature: Feature) => {
    if (!result.canceled && result.assets && result.assets[0]) {
      const updatedFeatures = features.map(f => 
        f.id === feature.id 
          ? { ...f, image: result.assets[0].uri }
          : f
      );
      setFeatures(updatedFeatures);
    }
  };

  const handleFeaturePress = (feature: Feature) => {
    if (feature.title === "More") {
      setIsModalVisible(true);
    } else {
      pickImage(feature);
    }
  };

  const handleAddFeature = () => {
    if (newFeatureName.trim()) {
      const newFeature: Feature = {
        id: features.length + 1,
        title: newFeatureName.trim(),
        icon: "photo-camera",
      };
      setFeatures([...features, newFeature]);
      setNewFeatureName("");
      setIsModalVisible(false);
    }
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
            <Text className="text-lg font ml-2">Seller Listing Property</Text>
          </TouchableOpacity>
        </View>

        {/* Grid of Features */}
        <View className="flex-row flex-wrap justify-between">
          {features.map((feature) => (
            <TouchableOpacity
              key={feature.id}
              onPress={() => handleFeaturePress(feature)}
              className="w-[30%] aspect-square bg-gray-50 rounded-xl mb-4 items-center justify-center overflow-hidden"
            >
              {feature.image ? (
                <Image
                  source={{ uri: feature.image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <>
                  <MaterialIcons
                    name={feature.icon}
                    size={32}
                    color="#666"
                    className="mb-2"
                  />
                  <Text className="text-sm text-gray-600 mt-2 text-center px-2">
                    {feature.title}
                  </Text>
                </>
              )}
              {feature.image && (
                <View className="absolute bottom-0 left-0 right-0 bg-black/50 py-1">
                  <Text className="text-white text-xs text-center">
                    {feature.title}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Add Feature Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-end">
          <View className="bg-white p-4 rounded-t-3xl shadow-lg">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-semibold">Add New Feature</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <TextInput
              value={newFeatureName}
              onChangeText={setNewFeatureName}
              placeholder="Enter feature name"
              className="border border-gray-300 rounded-lg p-3 mb-4"
            />
            <TouchableOpacity
              onPress={handleAddFeature}
              className="bg-[#6ABEEC] rounded-full py-4 items-center"
            >
              <Text className="text-white font-semibold">Add Feature</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Continue Button */}
      <View className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-white border-t border-gray-200">
        <CustomButton
          title="Continue"
          onPress={() => router.push("/screens/changeAddress")}
          variant="primary"
          className="mx-0"
        />
      </View>
    </SafeAreaView>
  );
}