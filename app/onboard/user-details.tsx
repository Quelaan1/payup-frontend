import { Keyboard, TouchableWithoutFeedback, View, Text } from "react-native";
import commonStyles from "../../styles/common";
import { router, Stack, useLocalSearchParams } from "expo-router";
import {
  Header,
  CommonButton,
  ScreenHeaderProgress,
  InputBox,
} from "../../components";
import React, { useEffect } from "react";
import { COLORS } from "../../constants";
import Styles from "../../components/common/inputBox/inputBox.style";
import ButtonStyles from "../../components/common/buttons/commonButton/commonButton.style";
import { validateEmail } from "../../utils/validators/validators";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUserDetailsError } from "../../redux/slices/userDetailsSlice";
import { UserDetailsConfirmRequest } from "../../redux/slices/profileSlice";

const UserDetails = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = React.useState("");
  const {loading, error} = useAppSelector((state) => state.userDetails);
  const { userName } = useLocalSearchParams();

  const onChange = (value: string) => {
    setEmail(value);
  };

  const handleWrongData = () => {
    setEmail('')
    dispatch(setUserDetailsError(""));
    router.push("/onboard/tax");
  };

  const handleSend = () => {
    if (!validateEmail(email)) {
      dispatch(setUserDetailsError("Please enter a valid email address"));
      return;
    }

    dispatch(UserDetailsConfirmRequest({ email, first_name: userName }))
  };

  const handleOutsidePress = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss;
    }
  };


  useEffect(() => {
    return () => {
      setEmail("")
      dispatch(setUserDetailsError(""));
    }
  }, [])
  


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
                  onChangeText={onChange}
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
