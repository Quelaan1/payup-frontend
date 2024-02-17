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
}: Props): React.JSX.Element {
  const onKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    position: string,
  ) => {
    const prevPosition = parseInt(position) - 2;

    if (e.nativeEvent.key === "Backspace" && prevPosition >= 0) {
      if (inputRefs) {
        inputRefs[prevPosition].current.focus();
      }
    }

    const newPosition = parseInt(position);

    // Focus next input if current input is filled
    if (
      otpValue &&
      newPosition < 6 &&
      e.nativeEvent.key !== "Backspace" &&
      inputRefs
    ) {
      inputRefs[newPosition].current.focus();
    }

    if (newPosition === 6 && e.nativeEvent.key !== "Backspace") {
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
          {otpValue &&
            Object.keys(otpValue).map((key) => {
              return (
                <TextInput
                  onKeyPress={(event) => {
                    onKeyPress(event, key);
                  }}
                  maxLength={1}
                  key={key}
                  style={Styles.otp}
                  onChangeText={(text) => {
                    onChangeWithPosition &&
                      onChangeWithPosition(text, parseInt(key));
                  }}
                  value={otpValue}
                  keyboardType={"number-pad"}
                  ref={inputRefs && inputRefs[parseInt(key) - 1]}
                />
              );
            })}
        </View>
      );
  }
});

export default InputBox;
