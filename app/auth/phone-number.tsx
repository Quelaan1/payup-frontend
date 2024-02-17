import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { router, Stack } from "expo-router";
import React from "react";
import { Header, ScreenHeaderProgress } from "../../components";
import commonStyles from "../../styles/common";
import InputBox from "../../components/common/inputBox/inputBox";
import { COLORS, icons } from "../../constants";
import { LargeButton } from "../../components";
import Footer from "../../components/common/footer/footer";
import Loader from "../../components/common/loader/loader";

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

  const handleSend = () => {
    if (phoneNumber.length !== 10) {
      setError("Please enter a valid phone number");
    }

    // if (phoneNumber.length === 10) {
    // setIsVerifying(true);
    // }

    router.push("/auth/otp-verification");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Stack.Screen
          options={{
            navigationBarColor: COLORS.white,
            headerTitle: () => <ScreenHeaderProgress progress={"zero"} />,
          }}
        />

        <View style={commonStyles.container}>
          <Header
            title={"Welcome to PayUp.\nLet's get you started"}
            description={
              "Enter the phone number where you would like to receive OTP on"
            }
          />

          <InputBox
            placeholder={"Phone Number"}
            ImagePath={icons.phone}
            onChangeText={onChange}
            value={phoneNumber}
            error={error}
            type={"phoneNumber"}
          />

          <LargeButton text={"Next"} onPress={handleSend} />

          <Footer />

          {isSendingSMS && (
            <Loader ImagePath={icons.phone} Message={"Sending SMS"} />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default phoneNumber;
