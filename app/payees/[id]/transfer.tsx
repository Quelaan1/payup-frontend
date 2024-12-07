import CustomHeaderLayout from "../../../components/common/customHeaderLayout/customHeaderLayout";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../constants";
import React, { useEffect, useState } from "react";
import { Avatar } from "@kolking/react-native-avatar";
import { Ionicons } from "@expo/vector-icons";
import { CommonButton } from "../../../components";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
//@ts-ignore
import EasebuzzCheckout from "react-native-easebuzz-kit";
import { initiatePayment } from "../../../utils/apis/easebuzz/easebuzz";
import ErrorAlert from "../../../components/common/alerts/errorAlerts";
import { addTransaction } from "../../../redux/slices/transactionSlice";

const Transfer = () => {
  const dispatch = useAppDispatch();

  const payee_id = useLocalSearchParams().id;

  const payee: Payee = useAppSelector((state) => state.payee.payees).filter(
    (payee) => payee.payee_id === payee_id
  )[0];
  const user = useAppSelector((state) => state.profile);

  const router = useRouter();

  const [amount, setAmount] = useState("₹0.00");
  const [error, setError] = useState<string | null>(null);

  const handlePress = (value: string) => {
    if (amount === "₹0.00" && value === "backspace") {
      return;
    }

    if (value === "backspace") {
      setAmount((prev) => {
        if (prev.length > 2) {
          return prev.slice(0, -1);
        } else {
          return "₹0.00";
        }
      });
    } else {
      setAmount((prev) => {
        if (prev === "₹0.00") {
          return "₹" + value;
        } else {
          return prev + value;
        }
      });
    }
  };

  const renderButton = (value: string) => {
    if (value === "backspace") {
      return (
        <TouchableOpacity
          style={[styles.button, getBorderStyle(value)]}
          onPress={() => handlePress(value)}
          onLongPress={() => setAmount("₹0.00")}
        >
          <Ionicons name="backspace" size={36} color="black" />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={[styles.button, getBorderStyle(value)]}
          onPress={() => handlePress(value)}
        >
          <Text style={styles.buttonText}>{value}</Text>
        </TouchableOpacity>
      );
    }
  };

  const getBorderStyle = (value: string) => {
    switch (value) {
      case "1":
        return { borderRightWidth: 0.5 };
      case "2":
        return {};
      case "3":
        return { borderLeftWidth: 0.5 };
      case "4":
        return { borderTopWidth: 0.5, borderRightWidth: 0.5 };
      case "5":
        return { borderTopWidth: 0.5 };
      case "6":
        return { borderTopWidth: 0.5, borderLeftWidth: 0.5 };
      case "7":
        return { borderTopWidth: 0.5, borderRightWidth: 0.5 };
      case "8":
        return { borderTopWidth: 0.5 };
      case "9":
        return { borderTopWidth: 0.5, borderLeftWidth: 0.5 };
      case "0":
        return { borderTopWidth: 0.5, borderRightWidth: 0.5 };
      case ".":
        return { borderTopWidth: 0.5, borderRightWidth: 0.5 };
      case "backspace":
        return { borderTopWidth: 0.5 };
      default:
        return {};
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");

    return `${day}-${month}-${year} ${formattedHours}:${minutes} ${ampm}`;
  };

  const callPaymentGateway = (access_key: string) => {
    var options = {
      access_key: access_key,
      pay_mode: "test",
    };

    EasebuzzCheckout.open(options)
      .then((data: any) => {
        console.log("Payment Response:", data);

        switch (data.result) {
          case "payment_successfull":
            dispatch(
              addTransaction({
                name: payee.name,
                amount: parseFloat(amount.replace("₹", "")),
                transaction_id: data.payment_response.txnid,
                date: formatDate(data.payment_response.addedon),
              })
            );

            router.push(`/transactions/${data.payment_response.txnid}/receipt`);
            break;
          case "payment_failed":
            setError(data.payment_response.error_Message);
            break;
          case "txn_session_timeout":
            setError("Transaction session timed out. Please try again.");
            break;
          case "back_pressed":
            setError("User pressed back, try again when ready");
            // User pressed back, no error needed
            break;
          case "user_cancelled":
            setError("User cancelled the transaction. Please try again.");
            // User cancelled the transaction, no error needed
            break;
          case "error_server_error":
            setError("Server error occurred. Please try again later.");
            break;
          case "error_noretry":
            setError("An error occurred. Please try again.");
            break;
          case "invalid_input_data":
            setError(
              "Invalid input data. Please check your details and try again."
            );
            break;
          case "retry_fail_error":
            setError("Transaction retry failed. Please try again.");
            break;
          case "trxn_not_allowed":
            setError("Transaction not allowed. Please try again.");
            break;
          case "bank_back_pressed":
            setError(
              "User pressed back on the bank page, try again when ready"
            );
            break;
          default:
            setError("An unexpected error occurred. Please try again.");
        }
      })
      .catch((error: any) => {
        console.log("SDK Error:", error);

        setError(
          "An error occurred while processing the payment. Please try again."
        );
      });
  };

  const handleSend = async () => {
    const paymentDetails: InitiatePaymentRequest = {
      amount: parseFloat(amount.replace("₹", "")),
      productinfo: "Payment for " + payee.name,
      payment_mode:
        payee.account_number && payee.account_number.length > 0 ? "CC" : "UPI",
    };

    try {
      const initiatePaymentResponse = await initiatePayment(paymentDetails);

      console.log(initiatePaymentResponse);

      if (initiatePaymentResponse.status === 1) {
        callPaymentGateway(initiatePaymentResponse.data);
      }
    } catch (error) {
      setError(error as string);
    }
  };

  return (
    <CustomHeaderLayout
      title={"Send Money"}
      headerTitleStyles={{
        color: COLORS.Black,
        fontSize: 18,
        fontWeight: "bold",
      }}
      backgroundColor={COLORS.skinBackground}
      backColor={COLORS.Black}
      statusBarStyle={"dark"}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Avatar
            name={payee.name}
            radius={55}
            size={108}
            color={"white"}
            textStyle={{ color: COLORS.Black }}
          />

          <Text style={styles.nameText}>{payee.name}</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>{amount}</Text>
          </View>

          <View style={styles.keypad}>
            {[
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              ".",
              "0",
              "backspace",
            ].map((value) => (
              <View key={value} style={styles.key}>
                {renderButton(value)}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <CommonButton text={"Send"} onPress={handleSend} />
        </View>

        {error && (
          <ErrorAlert
            errorMessage={error}
            setErrorMessage={() => setError(null)}
          />
        )}
      </View>
    </CustomHeaderLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.skinBackground,
    paddingVertical: 20,
    gap: 10,
    alignItems: "center",
  },
  nameText: {
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.Black,
  },
  container: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: COLORS.White,
  },
  amountContainer: {
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
    width: "70%",
    alignItems: "center",
    marginBottom: 20,
  },
  amountText: {
    fontSize: 32,
    marginBottom: 10,
  },
  keypad: {
    justifyContent: "center",
    width: "80%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  key: {
    width: "30%",
    aspectRatio: 1,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "600",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.White,
  },
});

export default Transfer;
