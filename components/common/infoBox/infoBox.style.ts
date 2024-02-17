import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

const InfoBoxStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    backgroundColor: COLORS.LightGray,
    borderWidth: 1,
    borderColor: COLORS.Black,
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 8,
    gap: 10,
  },
});

export default InfoBoxStyles;
