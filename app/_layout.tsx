import { SplashScreen, Stack } from "expo-router";
import "./global.css";

import { useFonts } from "expo-font";
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  // useEffect(() => {
  //   if (fontsLoaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="screens/UserTypeSelection" />
      <Stack.Screen name="screens/HomeFlooringFeatures" />
      <Stack.Screen name="screens/HomeKitchenFeatures" />
      <Stack.Screen name="screens/HomePictureFeatures" />
      <Stack.Screen name="screens/HomeQualityFeatures" />
      <Stack.Screen name="screens/changeAddress" />
      <Stack.Screen name="screens/estimatedFacts" />
      <Stack.Screen name="screens/decidePlan" />
      <Stack.Screen name="screens/congratulation" />
      <Stack.Screen name="screens/HomeExteriorFeatures" />
      <Stack.Screen name="screens/registration_steps_screen" />
      <Stack.Screen name="screens/homeScreen" />
      <Stack.Screen name="screens/profileScreen" />
    </Stack>
  );
}
