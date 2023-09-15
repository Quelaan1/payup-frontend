import { SafeAreaView } from "react-native";
import React, { useState } from "react";
import GetStarted from "./getStarted";
import Home from "./home";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();



const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SafeAreaView>
      {isLoggedIn ? <Home /> : <GetStarted />}
    </SafeAreaView>
  );
};

export default Index;
