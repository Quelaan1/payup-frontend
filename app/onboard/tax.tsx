import {
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import commonStyles from "../../styles/common";
import { router, Stack } from "expo-router";
import { Header, LargeButton, ScreenHeaderProgress } from "../../components";
import React, { useState } from "react";
import { COLORS, icons } from "../../constants";
import Loader from "../../components/common/loader/loader";
import Styles from "../../components/common/inputBox/inputBox.style";
import InfoCard from "../../components/common/infoCard/infoCard";
import { points } from "../../constants/onboard/GstInfo";

const Tax = (): React.JSX.Element => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const onChange = (value: string) => {
    setValue(value);
  };

  const handleSend = () => {
    // setIsVerifying(true);

    router.push("/onboard/user-details");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Stack.Screen
          options={{
            navigationBarColor: COLORS.white,
            headerTitle: () => <ScreenHeaderProgress progress={"two"} />,
          }}
        />

        <View style={commonStyles.container}>
          <Header
            title={"Enter your GSTIN or PAN"}
            description={"We require your GSTIN or PAN to open your account"}
          />
          <View style={Styles.container}>
            <View style={Styles.InputContainer}>
              <TextInput
                style={error ? Styles.inputError : Styles.input}
                onChangeText={onChange}
                value={value}
                placeholder={"GST or PAN"}
                keyboardType={"default"}
              />

              <icons.info style={Styles.image} width={26} height={26} />
            </View>

            {error && <Text style={Styles.error}>{error}</Text>}
          </View>

          <InfoCard
            ImagePath={icons.infoFilled}
            Title="Why GST/PAN is required?"
            Points={points}
          />

          <LargeButton text={"Next"} onPress={handleSend} />
          {isVerifying && (
            <Loader ImagePath={icons.mobile} Message={"Verifying number"} />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Tax;
