import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import commonStyles from "../../styles/common";
import { router, Stack } from "expo-router";
import { Header, CommonButton, Loader, OTPInput } from "../../components";
import React, { useState } from "react";
import { COLORS, ICONS } from "../../constants";
import ButtonStyles from "../../components/common/buttons/commonButton/commonButton.style";

const createPin = (): React.JSX.Element => {
  const [pin, setPin] = useState("");
  const [error, setError] = React.useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSend = async () => {
    const OTP = Object.values(pin)
      .map((value) => value)
      .join("");

    if (OTP.length !== 4) {
      setError("Please enter a valid PIN");
    }

    if (OTP.length === 4) {
      setError("");
      setIsVerifying(true);

      setIsVerifying(false);
      router.push("/home");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={commonStyles.container}>
        <Stack.Screen
          options={{
            navigationBarColor: COLORS.White,
            headerTitle: "",
          }}
        />

        <View>
          <Header title={"Create a 4-digit PayUp PIN"} description={""} />

          <OTPInput error={error} value={pin} digits={4} setValue={setPin} />
        </View>

        <View>
          <View style={ButtonStyles.buttonParent}>
            <CommonButton text={"Next"} onPress={handleSend} />
          </View>

          {isVerifying && (
            <Loader ImagePath={ICONS.mobile} Message={"Setting your pin"} />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default createPin;
