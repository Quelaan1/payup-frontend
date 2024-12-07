import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";
import InfoCardStyles from "../infoCard/infoCard.style";

const { width } = Dimensions.get("screen");

const infoCardStyles = StyleSheet.create({
  container: {
    width,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  cardTitle: {
    textAlign: "center",
    fontSize: 32,
    fontFamily: "SemiBold",
  },
  cardDescription: {
    textAlign: "center",
    color: COLORS.DarkGray,
    fontFamily: "Regular",
    fontSize: 14,
    lineHeight: 18,
  },
});

export default infoCardStyles;
