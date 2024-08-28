import { COLORS, ICONS } from "../../constants";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Keyboard, View } from "react-native";
import { CommonButton, InfoBox, InputBox } from "../../components";
import {
  validatePAN,
  validatePhoneNumber,
  validateUPI,
} from "../../utils/validators/validators";
import { extractPhoneNumber } from "../../utils/formatters/phoneFormatter";

const AddUpi = () => {
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [pan, setPan] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [upiId, setUpiId] = React.useState("");

  const [phoneNumberError, setPhoneNumberError] = React.useState<string | null>(
    null,
  );
  const [panError, setPanError] = React.useState<string | null>(null);
  const [upiIdError, setUpiIdError] = React.useState<string | null>(null);

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
          placeholder="UPI ID"
          value={upiId}
          onChangeText={setUpiId}
          error={upiIdError}
          setError={setUpiIdError}
          validator={validateUPI}
          keyboardType={"email-address"}
        />

        <InputBox error={""} placeholder="Name" value={name} editable={false} />

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
          value={pan}
          onChangeText={setPan}
          placeholder="GST or PAN"
          ImagePath={ICONS.id}
          keyboardType={"default"}
          error={panError}
          setError={setPanError}
          autoCapitalize="characters"
          validator={validatePAN}
          onValidation={handleOnValidation}
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
        <CommonButton text={"Verify & Continue"} onPress={() => {}} />
      </View>
    </View>
  );
};

export default AddUpi;
