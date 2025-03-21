import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function Congratulations() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Image
            source={require("../../assets/images/congratulation.png")}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>

        {/* Congratulations Text */}
        <Text style={styles.title}>Congratulations !</Text>
        <Text style={styles.subtitle}>
          Your Property Submitted Successfully
        </Text>

        {/* Preview Property Button */}
        <TouchableOpacity
          style={styles.previewButton}
          //   onPress={() => router.push("/screens/propertyPreview")}
        >
          <Text style={styles.previewButtonText}>Preview Property</Text>
        </TouchableOpacity>

        {/* Back to Home Button */}
        <TouchableOpacity
          onPress={() => router.push("/(root)/(tabs)")}
          style={styles.homeButton}
        >
          <Text style={styles.homeButtonText}>Back to home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 128,
    height: 128,
    marginBottom: 32,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: "#666666",
    marginBottom: 48,
    textAlign: "center",
  },
  previewButton: {
    backgroundColor: "#6ABEEC",
    borderRadius: 9999,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: "100%",
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  previewButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  homeButton: {
    paddingVertical: 16,
  },
  homeButtonText: {
    color: "#1a1a1a",
    fontWeight: "500",
    fontSize: 16,
  },
});
