import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import commonStyles from "../../styles/common";
import { router, Stack, useLocalSearchParams } from "expo-router";
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
import { verifyOTP } from "../../utils/apis/auth/auth";

const otpVerification = (): React.JSX.Element => {
  const { phoneNumber } = useLocalSearchParams();

  const [otp, setOtp] = useState("");

  const [error, setError] = React.useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSend = async () => {
    if (phoneNumber) {
      const OTP = Object.values(otp)
        .map((value) => value)
        .join("");

      if (OTP.length !== 6) {
        setError("Please enter a valid OTP");
      } else {
        setIsVerifying(true);
        try {
          await verifyOTP(phoneNumber as unknown as string, OTP);

          setIsVerifying(false);

          router.push("/onboard/tax");
        } catch (error) {
          setIsVerifying(false);

          setError(
            "An error occurred while verifying the OTP. Please try again later.",
          );
        }
      }
    } else {
      setError("An error occurred. Going back.");

      setTimeout(() => {
        router.push("/auth/phone-number");
      }, 500);
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

          <OTPInput error={error} value={otp} digits={6} setValue={setOtp} />
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
