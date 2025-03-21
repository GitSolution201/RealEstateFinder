import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView } from "react-native";
import Swiper from "react-native-swiper";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const Walkthrough = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableOpacity style={styles.skipButton} onPress={() => router.push("/screens/HomeFlooringFeatures")}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <Swiper loop={false} activeDotColor="#007AFF" style={styles.wrapper}>
        {/* Page 1 */}
        <View style={styles.slide}>
          <Image source={require("../../assets/images/Walkthrough_Light_01.png")} style={styles.image} />
          <Text style={styles.title}>
            FIND BEST PLACE TO STAY IN <Text style={styles.highlight}>GOOD PRICE</Text>
          </Text>
          <Text style={styles.description}>With thousands of properties available, your dream home may be just a few touches away.</Text>
        </View>

        {/* Page 2 */}
        <View style={styles.slide}>
          <Image source={require("../../assets/images/Walkthrough_Light_02.png")} style={styles.image} />
          <Text style={styles.title}>
            FAST AND EASY <Text style={styles.highlight}>SEARCH</Text>
          </Text>
          <Text style={styles.description}>Use our advanced search features to filter properties, save time, and find the best option for you.</Text>
        </View>

        {/* Page 3 */}
        <View style={styles.slide}>
          <Image source={require("../../assets/images/Walkthrough_Light_03.png")} style={styles.image} />
          <Text style={styles.title}>
            SELL OR RENT <Text style={styles.highlight}>PROPERTY</Text>
          </Text>
          <Text style={styles.description}>From 'For Sale' to 'For Lease,' discover the seamless way to property fulfillment.</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/screens/sign_in")}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: { backgroundColor: "#fff" },
  skipButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
  },
  highlight: {
    color: "#007AFF",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginTop: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Walkthrough;
