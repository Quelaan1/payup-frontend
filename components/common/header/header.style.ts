import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

const Styles = StyleSheet.create({
  container: {
    marginTop: 36,
    gap: 6,
  },
  title: {
    fontSize: 28,
    fontFamily: "SemiBold",
    lineHeight: 32,
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Medium",
    color: COLORS.DarkGray,
    textAlign: "left",
    width: 400,
  },
});

export default Styles;
