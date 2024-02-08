import { SafeAreaView, View } from "react-native";
import React, { useState } from "react";
import GetStarted from "./getStarted";
import Home from "./home";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync().then((r) => {});

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return <View>{isLoggedIn ? <Home /> : <GetStarted />}</View>;
};

export default Index;
