import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  cardContainer: {
    paddingHorizontal: 30,
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'SemiBold',
  },
  cardDescription: {
    textAlign: 'center',
    color: COLORS.gray,
    fontFamily: 'Regular',
    fontSize: 14,
    lineHeight: 18,
  },
});

export default styles;
