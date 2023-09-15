import { View } from "react-native";
import { Stack } from "expo-router";
import React from "react";
import { Header, ScreenHeaderProgress } from "../components/";
import commonStyles from "../styles/common";

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
