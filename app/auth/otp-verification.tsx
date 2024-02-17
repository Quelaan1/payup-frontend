import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import commonStyles from "../../styles/common";
import { router, Stack } from "expo-router";
import { Header, LargeButton, ScreenHeaderProgress } from "../../components";
import React, { useRef, useState } from "react";
import { COLORS, ICONS } from "../../constants";
import Footer from "../../components/common/footer/footer";
import Loader from "../../components/common/loader/loader";
import InputBox from "../../components/common/inputBox/inputBox";
import ButtonStyles from "../../components/common/buttons/largeButton/largeButton.style";

const otpVerification = (): React.JSX.Element => {
  const inputRefs: React.RefObject<HTMLInputElement>[] = Array(6)
    .fill(null)
    .map(() => useRef(null));

  const [otp, setOtp] = useState("");

  const [error, setError] = React.useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const onChange = (value: string, position: number) => {
    // Ensure only numeric characters are added to OTP
    if (!isNaN(Number(value))) {
      const newOtp =
        otp.substring(0, position) + value + otp.substring(position + 1);

      setOtp(newOtp);

      // Focus next input if current input is filled
      if (value.length === 1 && position < 5) {
        inputRefs[position + 1]?.current?.focus();
      }
    }
  };

  const handleSend = () => {
    const OTP = Object.values(otp)
      .map((value) => value)
      .join("");

    if (OTP.length !== 6) {
      setError("Please enter a valid OTP");
    }

    // if (OTP.length === 6) {
    setError("");
    setIsVerifying(true);

    // setTimeout(() => {
    setIsVerifying(false);
    router.push("/onboard/tax");
    // }, 2000);
    // }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={commonStyles.container}>
        <Stack.Screen
          options={{
            navigationBarColor: COLORS.White,
            headerTitle: () => <ScreenHeaderProgress progress={"one"} />,
          }}
        />

        <View>
          <Header
            title={"Verify your phone number"}
            description={"Enter the OTP you received"}
          />

          <InputBox
            onChangeWithPosition={onChange}
            error={error}
            type={"otp"}
            otpValue={otp}
            inputRefs={inputRefs}
            digits={6}
            setOtp={setOtp}
          />
        </View>

        <View>
          <View style={ButtonStyles.buttonParent}>
            <LargeButton text={"Next"} onPress={handleSend} />
          </View>

          <Footer />

          {isVerifying && (
            <Loader ImagePath={ICONS.mobile} Message={"Verifying number"} />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default otpVerification;
