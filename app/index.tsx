import { View } from "react-native";
import React, { useEffect, useState } from "react";
import GetStarted from "./get-started";
import Home from "./home";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync().then((r) => {});

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return <View>{isLoggedIn ? <Home /> : <GetStarted />}</View>;
};

export default Index;
