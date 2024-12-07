import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

const menuStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.White,
    borderRadius: 4,
    shadowColor: COLORS.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
    marginHorizontal: 20,
  },

  button: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    width: 75,
  },

  buttonText: {
    color: COLORS.DarkGray20,
    fontSize: 13,
    fontWeight: "bold",
  },
});

export default menuStyles;
