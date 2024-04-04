import React, { useRef } from "react";
import {
  Keyboard,
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import OTPInputStyles from "./otpInput.style";
import { COLORS } from "../../../constants";

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  digits: number;
  error: string | null;
};

const OTPInput = ({
  value,
  setValue,
  digits,
  error,
}: Props): React.JSX.Element => {
  const inputRefs: React.RefObject<TextInput>[] = Array(digits)
    .fill(null)
    .map(() => useRef(null));

  const onKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    position: number,
  ) => {
    const key = e.nativeEvent.key;
    let newValue = key;

    if (key === "Backspace") {
      if (position > 0 && value.substring(position) === "") {
        const prevPosition = position - 1;

        inputRefs[prevPosition].current?.focus();

        // Create a new string with the character removed
        const newOtp = value.substring(0, position - 1);

        setValue(newOtp); // Update the state with the new value
        return;
      }

      newValue = ""; // Clear the current field
      const prevPosition = position - 1;
      if (prevPosition >= 0) {
        inputRefs[prevPosition]?.current?.focus();
      }
    } else if (!isNaN(Number(key))) {
      // Only allow numeric input
      const nextPosition = position + 1;
      if (nextPosition < digits) {
        inputRefs[nextPosition]?.current?.focus();
      } else if (nextPosition === digits) {
        Keyboard.dismiss();
      }
    } else {
      return; // Ignore non-numeric and non-backspace keys
    }

    // Update the value
    const newOtp =
      value.substring(0, position) + newValue + value.substring(position + 1);

    setValue(newOtp);
  };

  return (
    <View>
      <View style={OTPInputStyles.otpContainer}>
        {Array(digits)
          .fill(digits)
          .map((val, index) => {
            const key = `${index}`;
            return (
              <TextInput
                testID={`otp-input-${index}`}
                onKeyPress={(event) => {
                  onKeyPress(event, index);
                }}
                autoFocus={index === 0}
                autoCorrect={false}
                autoComplete={
                  Platform.OS === "ios" ? "one-time-code" : "sms-otp"
                }
                aria-label="otp input box"
                selectionColor={COLORS.DarkGray50}
                maxLength={1}
                key={key}
                style={OTPInputStyles.otp}
                value={value[index]}
                keyboardType={"number-pad"}
                ref={inputRefs[index]}
              />
            );
          })}
      </View>

      {error && <Text style={OTPInputStyles.error}>{error}</Text>}
    </View>
  );
};

export default OTPInput;
