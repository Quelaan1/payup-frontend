import {
  TextInput,
  View,
  Text,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Keyboard,
} from "react-native";
import Styles from "./inputBox.style";
import { KeyboardType } from "react-native/Libraries/Components/TextInput/TextInput";
import React, { MutableRefObject } from "react";
import * as events from "events";

interface Props {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onChangeWithPosition?: (text: string, position: string) => void;
  ImagePath?: any;
  error: string;
  type: "phoneNumber" | "otp";
  otpValue?: object;
  inputRefs?: MutableRefObject<any>[];
}

const InputBox = ({
  placeholder,
  ImagePath,
  onChangeText,
  onChangeWithPosition,
  value,
  error,
  type,
  otpValue,
  inputRefs,
}: Props): React.JSX.Element => {
  const onKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    position: string,
  ) => {
    const prevPosition = parseInt(position) - 2;

    if (e.nativeEvent.key === "Backspace" && prevPosition >= 0) {
      inputRefs[prevPosition].current.focus();
    }

    const newPosition = parseInt(position);

    // Focus next input if current input is filled
    if (
      otpValue[position].length === 1 &&
      newPosition < 6 &&
      e.nativeEvent.key !== "Backspace"
    ) {
      inputRefs[newPosition].current.focus();
    }

    if (newPosition === 6 && e.nativeEvent.key !== "Backspace") {
      Keyboard.dismiss();
    }
  };

  if (type === "phoneNumber") {
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

          <ImagePath width={30} height={30} style={Styles.image} />
        </View>

        {error && <Text style={Styles.error}>{error}</Text>}
      </View>
    );
  } else if (type === "otp") {
    return (
      <View style={Styles.otpContainer}>
        {Object.keys(otpValue).map((key) => {
          return (
            <TextInput
              onKeyPress={(event) => {
                onKeyPress(event, key);
              }}
              maxLength={1}
              key={key}
              style={Styles.otp}
              onChangeText={(text) => {
                onChangeWithPosition(text, key);
              }}
              value={otpValue[key]}
              keyboardType={"number-pad"}
              ref={inputRefs[parseInt(key) - 1]}
            />
          );
        })}
      </View>
    );
  }
};

export default InputBox;
