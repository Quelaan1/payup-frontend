import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ICONS, IMAGES } from "../../../constants";
import React from "react";

export const HeaderLeft = () => {
  return (
    <View style={styles.logoContainer}>
      <Image source={IMAGES.logo} style={styles.logo} />

      <Text style={styles.logoText}>PayUp</Text>
    </View>
  );
};

export const HeaderRight = () => {
  return (
    <TouchableOpacity style={{ paddingTop: 20 }}>
      <ICONS.notification width={28} height={28} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingTop: 20,
    alignItems: "center",
  },

  logo: { width: 28, height: 28 },

  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
  },
});
