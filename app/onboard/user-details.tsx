import { Keyboard, TouchableWithoutFeedback, View, Text } from "react-native";
import commonStyles from "../../styles/common";
import { router, Stack, useLocalSearchParams } from "expo-router";
import {
  Header,
  CommonButton,
  ScreenHeaderProgress,
  InputBox,
} from "../../components";
import React from "react";
import { COLORS } from "../../constants";
import Styles from "../../components/common/inputBox/inputBox.style";
import ButtonStyles from "../../components/common/buttons/commonButton/commonButton.style";
import { validateEmail } from "../../utils/validators/validators";

const UserDetails = (): React.JSX.Element => {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  const { userName } = useLocalSearchParams();

  const onChange = (value: string) => {
    setEmail(value);
  };

  const handleWrongData = () => {
    router.push("/onboard/tax");
  };

  const handleSend = () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

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
              <View style={{ marginTop: 34 }}>
                <InputBox
                  value={userName as unknown as string}
                  selectTextOnFocus={false}
                  editable={false}
                  error={error}
                />
              </View>

              <View style={Styles.InputContainer}>
                <InputBox
                  value={email}
                  placeholder={"Email address"}
                  keyboardType={"default"}
                  autoFocus
                  error={error}
                />
              </View>

              {error && <Text style={Styles.error}>{error}</Text>}
            </View>
          </View>
        </View>

        <View style={ButtonStyles.buttonParent}>
          <CommonButton
            text={"No that’s not me"}
            onPress={handleWrongData}
            type="Secondary"
          />

          <CommonButton text={"Next"} onPress={handleSend} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserDetails;
