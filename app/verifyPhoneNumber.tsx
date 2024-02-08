import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import commonStyles from "../styles/common";
import { router, Stack } from "expo-router";
import { Header, LargeButton, ScreenHeaderProgress } from "../components";
import React, { useRef, useState } from "react";
import { COLORS, icons } from "../constants";
import Footer from "../components/onboarding/footer/footer";
import Loader from "../components/loader/loader";
import InputBox from "../components/onboarding/inputBox/inputBox";

const VerifyPhoneNumber = (): React.JSX.Element => {
  const inputRefs = Array(6)
    .fill(null)
    .map(() => useRef(null));

  const [otp, setOtp] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });

  const [error, setError] = React.useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const onChange = (value: string, position: string) => {
    const newPosition = parseInt(position);

    setOtp({ ...otp, [position]: value });

    // Focus next input if current input is filled
    if (value.length === 1 && newPosition < 6) {
      inputRefs[newPosition].current.focus();
    }
  };

  const handleSend = () => {
    const OTP = Object.values(otp)
      .map((value) => value)
      .join("");

    if (OTP.length !== 6) {
      setError("Please enter a valid OTP");
    }

    if (OTP === "123456") {
      setError(null);
      setIsVerifying(true);

      setTimeout(() => {
        setIsVerifying(false);
        // router.push("/");
      }, 2000);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Stack.Screen
          options={{
            navigationBarColor: COLORS.white,
            headerTitle: () => <ScreenHeaderProgress progress={"one"} />,
          }}
        />

        <View style={commonStyles.container}>
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
          />

          <LargeButton text={"Next"} onPress={handleSend} />

          <Footer />

          {isVerifying && (
            <Loader ImagePath={icons.mobile} Message={"Verifying number"} />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VerifyPhoneNumber;
