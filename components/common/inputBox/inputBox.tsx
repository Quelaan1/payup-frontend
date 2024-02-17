import {
  TextInput,
  View,
  Text,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Keyboard,
} from "react-native";
import Styles from "./inputBox.style";
import React, { memo, MutableRefObject } from "react";
import { SvgProps } from "react-native-svg";
import _ from "lodash";

interface Props {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onChangeWithPosition?: (value: string, position: number) => void;
  ImagePath?: React.FC<SvgProps>;
  error: string;
  type: "phoneNumber" | "otp";
  otpValue?: string;
  inputRefs?: MutableRefObject<any>[];
  digits?: number;
  setOtp?: React.Dispatch<React.SetStateAction<string>>;
}

const InputBox = memo(function ({
  placeholder,
  ImagePath,
  onChangeText,
  onChangeWithPosition,
  value,
  error,
  type,
  otpValue,
  inputRefs,
  digits,
  setOtp,
}: Props): React.JSX.Element {
  const onKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    position: number
  ) => {
    const prevPosition = position - 1;
    const key = e.nativeEvent.key;

    if (
      otpValue &&
      setOtp &&
      otpValue[position] &&
      key !== "Backspace" &&
      inputRefs
    ) {
      const newOtp =
        otpValue.substring(0, position) +
        key +
        otpValue.substring(position + 1);

      setOtp(newOtp);

      inputRefs[position + 1].current.focus();

      return;
    }

    if (key === "Backspace" && prevPosition >= 0) {
      if (inputRefs) {
        inputRefs[prevPosition].current.focus();
      }
    }

    const newPosition = position;

    // Focus next input if current input is filled
    if (otpValue && newPosition < 6 && key !== "Backspace" && inputRefs) {
      inputRefs[newPosition].current.focus();
    }

    if (newPosition === 6 && key !== "Backspace") {
      Keyboard.dismiss();
    }
  };

  switch (type) {
    case "phoneNumber":
      return (
        <View style={Styles.container}>
          <View style={Styles.InputContainer}>
            <TextInput
              style={error ? Styles.inputError : Styles.input}
              onChangeText={onChangeText}
              value={value}
              placeholder={placeholder}
              keyboardType={"number-pad"}
            />

            {ImagePath && (
              <ImagePath width={26} height={26} style={Styles.image} />
            )}
          </View>

          {error && <Text style={Styles.error}>{error}</Text>}
        </View>
      );
    case "otp":
      return (
        <View style={Styles.otpContainer}>
          {digits &&
            _.times(digits, (index) => {
              // Pass the index argument
              const key = `${index}`; // Generate a unique key for each TextInput
              return (
                <TextInput
                  onKeyPress={(event) => {
                    onKeyPress(event, index);
                  }}
                  maxLength={1}
                  key={key} // Use the generated key
                  style={Styles.otp}
                  onChangeText={(text) => {
                    onChangeWithPosition && onChangeWithPosition(text, index);
                  }}
                  value={otpValue && otpValue[index]}
                  keyboardType={"number-pad"}
                  ref={inputRefs && inputRefs[index]}
                />
              );
            })}
        </View>
      );
  }
});

export default InputBox;
