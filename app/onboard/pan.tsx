import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import commonStyles from "../../styles/common";
import {  Stack } from "expo-router";
import {
  Header,
  CommonButton,
  ScreenHeaderProgress,
  InputBox,
  Loader,
  InfoCard,
} from "../../components";
import React, { useEffect, useState } from "react";
import { COLORS, ICONS } from "../../constants";
import Styles from "../../components/common/inputBox/inputBox.style";
import { points } from "../../constants/onboard/GstInfo";
import ButtonStyles from "../../components/common/buttons/commonButton/commonButton.style";
import { useAppSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { PanVerifyRequest, setIsVerifying, setPanError } from "../../redux/slices/panSlice";

const Pan = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const [pan, setPan] = React.useState("");
  const [showInfoCard, setShowInfoCard] = useState(false);
  const { error, isVerifying, entity_type } = useAppSelector(
    (state) => state.pan,
  );

  const onChangePan = (value: string) => {
    setPan(value);
  };

  const handleInfoPress = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }

    setShowInfoCard(!showInfoCard);
  };

  const handleOutsidePress = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }

    if (showInfoCard) {
      setShowInfoCard(false);
    }
  };

  const handleNext = () => {
    if (pan.length === 0) {
      dispatch(setPanError("Please enter your GSTIN or PAN"));
      return;
    }

    dispatch(PanVerifyRequest({ entity_id: pan, entity_type }));
  };

  useEffect(() => {
    return () => {
      setPan("")
      dispatch(setIsVerifying(""));
      dispatch(setPanError(""));
    }
  }, [])

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={commonStyles.container}>
        <Stack.Screen
          options={{
            navigationBarColor: COLORS.White,
            headerTitle: () => <ScreenHeaderProgress progress={"two"} />,
          }}
        />

        <View>
          <Header
            title={"Enter your GSTIN or PAN"}
            description={"We require your GSTIN or PAN to open your account"}
          />

          <View style={{ ...Styles.container, marginTop: 34 }}>
            <View style={Styles.InputContainer}>
              <InputBox
                value={pan}
                placeholder={"GST or PAN"}
                keyboardType={"default"}
                error={error}
                onChangeText={onChangePan}
              />

              <TouchableOpacity style={Styles.image} onPress={handleInfoPress}>
                <ICONS.info width={26} height={26} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <View style={ButtonStyles.buttonParent}>
            <CommonButton text={"Next"} onPress={handleNext} />
          </View>

          {isVerifying && (
            <Loader ImagePath={ICONS.mobile} Message={"Verifying GST/PAN"} />
          )}
        </View>

        {showInfoCard && (
          <InfoCard
            ImagePath={ICONS.infoFilled}
            Title="Why GST/PAN is required?"
            Points={points}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Pan;
