import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

const payButtonStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: COLORS.Black,
    borderRadius: 4,
    paddingTop: 13,
    paddingBottom: 13,
    marginHorizontal: 20,
  },

  text: {
    color: COLORS.White,
    lineHeight: 14,
  },
});

export default payButtonStyles;
