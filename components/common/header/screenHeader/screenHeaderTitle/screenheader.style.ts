import { StyleSheet } from "react-native";

const screenHeaderStyles = StyleSheet.create({
  logo: {
    gap: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logoImage: {
    width: 24,
    height: 24,
  },

  logoTitle: {
    fontFamily: "Bold",
    fontSize: 18,
    lineHeight: 22,
  },
});

export default screenHeaderStyles;
