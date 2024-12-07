import { StyleSheet } from "react-native";
import { COLORS } from "../constants";

export const homeStyles = StyleSheet.create({
  frameContainer: {
    gap: 18,
    backgroundColor: COLORS.grayBackground,
    paddingTop: 30,
    height: "100%",
  },

  greeting: {
    color: COLORS.DarkGray20,
    fontSize: 20,
  },

  userName: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  recentTransactionsContainer: {
    paddingHorizontal: 20,
    gap: 20,
  },

  recentTransactions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  recentTransactionsText: {
    fontSize: 24,
    fontWeight: "700",
  },

  recentTransactionsButton: {
    fontSize: 16,
    fontWeight: "500",
  },
});
