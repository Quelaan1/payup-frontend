import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const Styles = StyleSheet.create({
  container: {
    marginTop: 36,
    paddingLeft: 20,
    gap: 6,
  },
  title: {
    fontSize: 28,
    fontFamily: "SemiBold",
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Medium",
    color: COLORS.DarkGray,
    textAlign: "left",
    width: 300,
  },
});

export default Styles;
