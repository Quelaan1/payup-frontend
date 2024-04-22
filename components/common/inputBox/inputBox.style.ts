import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

const inputBoxStyles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 16,
  },

  InputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },

  input: {
    width: "100%",
    padding: 14,
    borderRadius: 4,
    backgroundColor: COLORS.White,
    shadowColor: "rgba(0, 0, 0, 0.6)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    color: COLORS.Black,
    shadowOpacity: 0.3,
    borderStyle: "solid",
    borderColor: "#d0d3d8",
    borderWidth: 1,
  },

  image: {
    right: 40,
  },

  inputError: {
    width: "100%",
    padding: 14,
    borderRadius: 4,
    backgroundColor: COLORS.LightRed,
    borderStyle: "solid",
    borderColor: COLORS.Red,
    borderWidth: 1,
  },

  error: {
    position: "absolute",
    paddingTop: 4,
    paddingLeft: 4,
    color: COLORS.Red,
    fontSize: 14,
    bottom: -35,
  },
});

export default inputBoxStyles;
