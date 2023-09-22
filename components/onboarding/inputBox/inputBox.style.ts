import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

const Styles = StyleSheet.create({
  container: {
    marginTop: 34,
    paddingHorizontal: 20,
    position: "relative",
    width: "100%",
  },
  input: {
    padding: 14,
    borderRadius: 4,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.6)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderColor: "#d0d3d8",
    borderWidth: 1,
  },

  Image: {
    position: "absolute",
    top: 14,
    right: 30,
  },
});

export default Styles;
