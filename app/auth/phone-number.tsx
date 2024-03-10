import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { router, Stack } from "expo-router";
import React from "react";
import {
  Header,
  ScreenHeaderProgress,
  Footer,
  Loader,
  CommonButton,
  InputBox,
} from "../../components";
import commonStyles from "../../styles/common";
import { COLORS, ICONS } from "../../constants";
import ButtonStyles from "../../components/common/buttons/commonButton/commonButton.style";
import { sendOTP } from "../../utils/apis/auth/auth";

const phoneNumber = (): React.JSX.Element => {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [isSendingSMS, setIsSendingSMS] = React.useState(false);
  const [error, setError] = React.useState("");

  const onChange = (value: string) => {
    if (value.length !== 10) {
      setError("Please enter a valid phone number");
    }

    if (value.length === 10) {
      setError("");
      Keyboard.dismiss();
    }

    setPhoneNumber(value);
  };

  const handleSend = async () => {
    if (phoneNumber.length !== 10) {
      setError("Please enter a valid phone number");
    } else {
      setIsSendingSMS(true);

      try {
        await sendOTP(phoneNumber);

        setIsSendingSMS(false);

        router.push("/auth/otp-verification?phoneNumber=" + phoneNumber);
      } catch (error) {
        setIsSendingSMS(false);

        setError(
          "An error occurred while sending the OTP. Please try again later.",
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
            headerTitle: () => <ScreenHeaderProgress progress={"zero"} />,
          }}
        />

        <View>
          <Header
            title={"Welcome to PayUp.\nLet's get you started"}
            description={
              "Enter the phone number where you would like to receive OTP on"
            }
          />

          <View style={{ marginTop: 34 }}>
            <InputBox
              placeholder={"Phone Number"}
              ImagePath={ICONS.phone}
              onChangeText={onChange}
              value={phoneNumber}
              error={error}
              keyboardType={"number-pad"}
              autoFocus
            />
          </View>
        </View>

        <View>
          <View style={ButtonStyles.buttonParent}>
            <CommonButton
              id={"sign-in-button"}
              text={"Next"}
              onPress={handleSend}
            />
          </View>

          <Footer />

          {isSendingSMS && (
            <Loader ImagePath={ICONS.phone} Message={"Sending SMS"} />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default phoneNumber;
