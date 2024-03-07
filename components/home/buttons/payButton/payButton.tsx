import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, ICONS } from "../../../../constants";

const PayButton = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <ICONS.pay width={24} height={24} />

      <Text style={styles.text}>Send</Text>
    </TouchableOpacity>
  );
};

export default PayButton;

const styles = StyleSheet.create({
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
  },

  text: {
    color: COLORS.White,
    lineHeight: 14,
  },
});
