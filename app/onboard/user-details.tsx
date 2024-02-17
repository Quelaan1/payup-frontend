import {
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import commonStyles from "../../styles/common";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Header, LargeButton, ScreenHeaderProgress } from "../../components";
import React from "react";
import { COLORS } from "../../constants";
import Styles from "../../components/common/inputBox/inputBox.style";
import ButtonStyles from "../../components/common/buttons/largeButton/largeButton.style";

const UserDetails = (): React.JSX.Element => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");

  const { userName } = useLocalSearchParams();

  const onChange = (value: string) => {
    setValue(value);
  };

  const handleWrongData = () => {
    router.push("/onboard/tax");
  };

  const handleSend = () => {
    router.push("/onboard/aadhaar");
  };

  const handleOutsidePress = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={commonStyles.container}>
        <View>
          <Stack.Screen
            options={{
              navigationBarColor: COLORS.White,
              headerTitle: () => <ScreenHeaderProgress progress={"two"} />,
            }}
          />

          <View>
            <Header
              title={`Hey ${userName}! Glad to see you here`}
              description={
                "We've fetched the details from the registered PAN. Please confirm or edit the details to proceed"
              }
            />

            <View style={{ ...Styles.container, display: "flex", gap: 16 }}>
              <View style={Styles.InputContainer}>
                <TextInput
                  style={error ? Styles.inputError : Styles.input}
                  value={value}
                  selectTextOnFocus={false}
                  editable={false}
                  placeholder={"Name"}
                />
              </View>

              <View style={Styles.InputContainer}>
                <TextInput
                  style={error ? Styles.inputError : Styles.input}
                  value={value}
                  selectTextOnFocus={false}
                  editable={false}
                  placeholder={"Email address"}
                  keyboardType={"default"}
                />
              </View>

              {error && <Text style={Styles.error}>{error}</Text>}
            </View>
          </View>
        </View>

        <View style={ButtonStyles.buttonParent}>
          <LargeButton
            text={"No that’s not me"}
            onPress={handleWrongData}
            filled={true}
          />

          <LargeButton text={"Next"} onPress={handleSend} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserDetails;
