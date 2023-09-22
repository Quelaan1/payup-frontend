import { View } from "react-native";
import { Stack } from "expo-router";
import React from "react";
import { Header, ScreenHeaderProgress } from "../components/";
import commonStyles from "../styles/common";
import InputBox from "../components/onboarding/inputBox/inputBox";
import { icons } from "../constants";
import { LargeButton } from "../components";
import Footer from "../components/onboarding/footer/footer";

const GetPhoneNumber = (): React.JSX.Element => {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [isSendingSMS, setIsSendingSMS] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const onChange = (value: string) => {
    setPhoneNumber(value);
  };

  const handleSend = () => {
    setIsSendingSMS(true);
  };

  return (
    <View style={commonStyles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => <ScreenHeaderProgress progress={"zero"} />,
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />

      <Header
        title={"Welcome to PayUp.\nLet's get you started"}
        description={
          "Enter the phone number where you would like to receive OTP on"
        }
      />

      <InputBox
        placeholder={"Phone Number"}
        ImagePath={icons.phone}
        keyboardType={"number-pad"}
        onChange={onChange}
        value={phoneNumber}
      />

      <LargeButton text={"Next"} onPress={handleSend} />

      <Footer />
    </View>
  );
};

export default GetPhoneNumber;
