import { View } from "react-native";
import React, { useState } from "react";
import GetStarted from "./get-started";
import Home from "./home";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return <View>{isLoggedIn ? <Home /> : <GetStarted />}</View>;
};

export default Index;
