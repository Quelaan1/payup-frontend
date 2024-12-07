import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

const slideUpModalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: COLORS.LightGray,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 20,
    gap: 20,
  },
  text: {
    alignSelf: "center",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonContainer: {
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

export default slideUpModalStyles;
