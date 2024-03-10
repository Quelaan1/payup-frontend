import { StyleSheet } from "react-native";
import { COLORS } from "../constants";

export const homeStyles = StyleSheet.create({
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
