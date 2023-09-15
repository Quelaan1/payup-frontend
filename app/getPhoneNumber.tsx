import { View } from "react-native";
import { Stack } from "expo-router";
import React from "react";
import ScreenHeaderProgress from "../components/common/header/screenHeaderProgress/screenHeaderProgress";
import commonStyles from "../styles/common";
import Header from "../components/onboarding/header";

const GetPhoneNumber = () => {
  return (
    <View style={commonStyles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => <ScreenHeaderProgress progress={"zero"} />,
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />

      <Header Title={""} Description={""} />
    </View>
  );
};

export default GetPhoneNumber;
