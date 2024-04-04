import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import commonStyles from "../../styles/common";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  Header,
  CommonButton,
  ScreenHeaderProgress,
  OTPInput,
  Footer,
  Loader,
} from "../../components";
import React, { useState } from "react";
import { COLORS, ICONS } from "../../constants";
import ButtonStyles from "../../components/common/buttons/commonButton/commonButton.style";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  loginOtpVerify,
  loginOtpVerifySetError,
} from "../../redux/slices/otpSlice";

const otpVerification = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { phoneNumber } = useLocalSearchParams();
  const [otp, setOtp] = useState("");
  const { isVerifying, loginOtpVerifyError } = useAppSelector(
    (state) => state.loginOtp,
  );

  const handleSend = async () => {
    if (phoneNumber) {
      const OTP = Object.values(otp)
        .map((value) => value)
        .join("");

      if (OTP.length !== 6) {
        dispatch(loginOtpVerifySetError("Please enter a valid OTP"));
      } else {
        dispatch(
          loginOtpVerify({
            phoneNumber: phoneNumber as unknown as string,
            otp: OTP,
          }),
        );
      }
    }
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

          <OTPInput
            error={loginOtpVerifyError}
            value={otp}
            digits={6}
            setValue={setOtp}
          />
        </View>

        <View>
          <View style={ButtonStyles.buttonParent}>
            <CommonButton text={"Next"} onPress={handleSend} />
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
