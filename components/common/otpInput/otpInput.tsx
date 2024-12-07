import React, { useEffect, useRef } from "react";
import { Keyboard, Text, View } from "react-native";
import { COLORS } from "../../../constants";
import OTPTextView from "./index";

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
  useEffect(() => {
    if (value.length === digits) {
      Keyboard.dismiss();
    }
  }, [value]);

  return (
    <View style={{ gap: 10 }}>
      <OTPTextView
        defaultValue={value}
        inputCount={digits}
        handleTextChange={setValue}
        tintColor={COLORS.DarkGray}
        containerStyle={{
          justifyContent: "flex-start",
          gap: 2,
        }}
        textInputStyle={{
          borderBottomWidth: 2,
        }}
        autoFocus
      />

      {error && typeof error === "string" && (
        <Text
          style={{
            paddingTop: 4,
            paddingLeft: 4,
            color: COLORS.Red,
            fontSize: 14,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default OTPInput;
