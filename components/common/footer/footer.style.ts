import { StyleSheet } from "react-native";

const footerStyles = StyleSheet.create({
  container: {
    lineHeight: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingBottom: 24,
    paddingHorizontal: 14,
  },
  text: {
    fontSize: 8.5,
    textAlign: "left",
    fontFamily: "SemiBold",
  },
  subtext: {
    fontFamily: "Bold",
  },
});

export default footerStyles;
