import { StyleSheet } from "react-native";

const commonButtonStyles = StyleSheet.create({
  buttonParent: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    paddingBottom: 50,
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 4,
  },
  filledButton: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "Medium",
    fontSize: 18,
  },
});

export default commonButtonStyles;
