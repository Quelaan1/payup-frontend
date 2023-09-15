import {StyleSheet} from "react-native";

// @ts-ignore
const styles = StyleSheet.create({
  // btnContainer: {
  //   width: 40,
  //   height: 40,
  //   backgroundColor: COLORS.white,
  //   borderRadius: SIZES.small / 1.25,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  //
  // btnImg: (dimension) => ({
  //   width: dimension,
  //   height: dimension,
  //   borderRadius: SIZES.small / 1.25,
  // }),

  logo: {
    gap: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logoImage: {
    width: 24,
    height: 24,
  },

  logoTitle: {
    fontFamily: "Bold",
    fontSize: 18,
    lineHeight: 22,
  },
});

export default styles;
