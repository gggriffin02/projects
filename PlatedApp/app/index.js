import { Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";

export default function App() {
  //my attempt at getting the custom fonts loaded in, got this from A2.
  const [fontsLoaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    Prata: require("../assets/fonts/Prata-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) return null;

  return <Redirect href="/home" onLayout={onLayoutRootView} />;
}

//font export lines from A2
