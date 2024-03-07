import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import React from "react";
import { COLORS } from "../constants";
import commonStyles from "../styles/common";
import { HeaderLeft, HeaderRight } from "../components/home/header/header";
import PayButton from "../components/home/buttons/payButton/payButton";
import Menu from "../components/home/card/menu/menu";

const Home = () => {
  return (
    <View
      style={{
        ...commonStyles.container,
        backgroundColor: COLORS.grayBackground,
      }}
    >
      <Stack.Screen
        options={{
          navigationBarColor: COLORS.White,
          headerTintColor: COLORS.Black,
          headerStyle: {
            backgroundColor: COLORS.grayBackground,
          },
          headerTitle: "",
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <HeaderRight />,
        }}
      />

      <View style={styles.frameContainer}>
        <View>
          <Text style={styles.greeting}>good evening.</Text>
          <Text style={styles.userName}>Samantha</Text>
        </View>

        <PayButton />

        <Menu />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  frameContainer: {
    paddingTop: 30,
    gap: 18,
  },

  greeting: {
    color: COLORS.MediumGray,
    fontSize: 20,
  },

  userName: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
