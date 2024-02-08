import { Stack, SplashScreen } from "expo-router";
import {
  IBMPlexSans_100Thin,
  IBMPlexSans_100Thin_Italic,
  IBMPlexSans_200ExtraLight,
  IBMPlexSans_200ExtraLight_Italic,
  IBMPlexSans_300Light,
  IBMPlexSans_300Light_Italic,
  IBMPlexSans_400Regular,
  IBMPlexSans_400Regular_Italic,
  IBMPlexSans_500Medium,
  IBMPlexSans_500Medium_Italic,
  IBMPlexSans_600SemiBold,
  IBMPlexSans_600SemiBold_Italic,
  IBMPlexSans_700Bold,
  IBMPlexSans_700Bold_Italic,
  useFonts,
} from "@expo-google-fonts/ibm-plex-sans";
import { useCallback } from "react";

export default function Layout() {
  let [fontsLoaded] = useFonts({
    Thin: IBMPlexSans_100Thin,
    ThinItalic: IBMPlexSans_100Thin_Italic,
    ExtraLight: IBMPlexSans_200ExtraLight,
    ExtraLightItalic: IBMPlexSans_200ExtraLight_Italic,
    Light: IBMPlexSans_300Light,
    LightItalic: IBMPlexSans_300Light_Italic,
    Regular: IBMPlexSans_400Regular,
    RegularItalic: IBMPlexSans_400Regular_Italic,
    Medium: IBMPlexSans_500Medium,
    MediumItalic: IBMPlexSans_500Medium_Italic,
    SemiBold: IBMPlexSans_600SemiBold,
    SemiBoldItalic: IBMPlexSans_600SemiBold_Italic,
    Bold: IBMPlexSans_700Bold,
    BoldItalic: IBMPlexSans_700Bold_Italic,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        autoHideHomeIndicator: true,
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTintColor: "black",
      }}
      /*//@ts-ignore*/
      onLayout={onLayoutRootView}
    />
  );
}
