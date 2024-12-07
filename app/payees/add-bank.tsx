import { COLORS, ICONS } from "../../constants";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Keyboard, View } from "react-native";
import { CommonButton, InfoBox, InputBox, Loader } from "../../components";
import {
  validateIFSC,
  validatePAN,
  validatePhoneNumber,
} from "../../utils/validators/validators";
import { extractPhoneNumber } from "../../utils/formatters/phoneFormatter";
import ErrorAlert from "../../components/common/alerts/errorAlerts";
import { addPayee } from "../../utils/apis/payees/payees";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addPayeeFailure, addPayeeStart } from "../../redux/slices/payeeSlice";

const AddBank = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [pan, setPan] = React.useState("");
  const [panError, setPanError] = React.useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");
  const [accountNumberConfirmation, setAccountNumberConfirmation] =
    React.useState("");
  const [IFSC, setIFSC] = React.useState("");
  const [phoneNumberError, setPhoneNumberError] = React.useState<string | null>(
    null
  );
  const [accountNumberConfirmationError, setAccountNumberConfirmationError] =
    React.useState<string | null>(null);
  const [IFSCError, setIFSCError] = React.useState<string | null>(null);
  const { error, loading } = useAppSelector((state) => state.payee);

  const handleOnValidation = () => {
    Keyboard.dismiss();
  };

  const onChange = (value: string) => {
    let temp = value;

    if (/\D/.test(value)) temp = extractPhoneNumber(value);

    if (temp.length <= 10) {
      setPhoneNumber(temp);
    }
  };

  const validateAccountNumber = (value: string) => {
    if (value !== accountNumber) {
      setAccountNumberConfirmationError("Account number does not match");
      return false;
    }

    setAccountNumberConfirmationError(null);
    return true;
  };

  const handleSubmit = async () => {
    if (
      phoneNumberError ||
      panError ||
      !accountNumber ||
      !accountNumberConfirmation ||
      !phoneNumber ||
      !pan ||
      !IFSC
    ) {
      return;
    }

    dispatch(
      addPayeeStart({
        phone_number: phoneNumber,
        ifsc: IFSC,
        account_number: accountNumber,
        pan_number: pan,
      })
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.grayBackground,
          },
          headerTitle: "Enter Payee Details",
          headerTitleStyle: {
            fontWeight: "500",
          },
          headerShown: true,
          headerTintColor: COLORS.Black,
        }}
      />

      <View
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          gap: 20,
        }}
      >
        <InputBox
          placeholder={"Phone Number"}
          ImagePath={ICONS.phone}
          onChangeText={onChange}
          value={phoneNumber}
          error={phoneNumberError}
          setError={setPhoneNumberError}
          keyboardType={"number-pad"}
          autoComplete="tel"
          importantForAutofill="yes"
          onKeyPress={(e) => {
            const sanitizedValue = extractPhoneNumber(e.nativeEvent.key);

            if (
              !isNaN(Number(sanitizedValue)) &&
              sanitizedValue.length === 10
            ) {
              setPhoneNumber(sanitizedValue);
            }
          }}
          validator={validatePhoneNumber}
          onValidation={handleOnValidation}
          debounce
        />

        <InputBox
          placeholder="IFSC Code"
          value={IFSC}
          onChangeText={setIFSC}
          error={IFSCError}
          setError={setIFSCError}
          keyboardType={"default"}
          validator={validateIFSC}
          onValidation={handleOnValidation}
          autoCapitalize={"characters"}
        />

        <InputBox
          placeholder={"Account Number"}
          onChangeText={setAccountNumber}
          value={accountNumber}
          error={""}
          keyboardType={"number-pad"}
        />

        <InputBox
          placeholder={"Re-enter Account Number"}
          onChangeText={setAccountNumberConfirmation}
          value={accountNumberConfirmation}
          error={accountNumberConfirmationError}
          setError={setAccountNumberConfirmationError}
          keyboardType={"number-pad"}
          validator={validateAccountNumber}
          onValidation={handleOnValidation}
        />

        <InputBox
          error={panError}
          value={pan}
          placeholder="GST or PAN"
          ImagePath={ICONS.id}
          keyboardType={"default"}
          setError={setPanError}
          onChangeText={setPan}
          autoCapitalize="characters"
          validator={validatePAN}
        />
      </View>

      <View
        style={{
          marginHorizontal: 20,
          marginTop: 50,
          gap: 20,
        }}
      >
        <InfoBox
          info={"Payee name will be auto fetched \n" + "from the UPI ID"}
        />

        <InfoBox info={"Payee GST/PAN is mandatory as per RBI Guidelines"} />
      </View>

      <View
        style={{
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 50,
        }}
      >
        <CommonButton text={"Verify & Continue"} onPress={handleSubmit} />
      </View>

      {loading && <Loader ImagePath={ICONS.phone} Message={"Adding Payee"} />}

      {error && (
        <ErrorAlert
          errorMessage={error}
          setErrorMessage={() => dispatch(addPayeeFailure(null))}
        />
      )}
    </View>
  );
};

export default AddBank;
