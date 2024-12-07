import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import commonStyles from "../../../styles/common";
import { Stack } from "expo-router";
import {
  Header,
  CommonButton,
  ScreenHeaderProgress,
  InputBox,
  Loader,
  InfoCard,
} from "../../../components";
import React, { useState } from "react";
import { COLORS, ICONS } from "../../../constants";
import Styles from "../../../components/common/inputBox/inputBox.style";
import { points } from "../../../constants/onboard/GstInfo";
import ButtonStyles from "../../../components/common/buttons/commonButton/commonButton.style";
import { useAppSelector } from "../../../redux/hooks";
import { useDispatch } from "react-redux";
import {
  PanVerifyRequest,
  setError,
  setPanError,
} from "../../../redux/slices/panSlice";
import inputBoxStyles from "../../../components/common/inputBox/inputBox.style";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import footerStyles from "../../../components/common/footer/footer.style";
import { formatDate } from "../../../utils/formatters/dateFormatter";
import ErrorAlert from "../../../components/common/alerts/errorAlerts";
import { validatePAN } from "../../../utils/validators/validators";

const Pan = (): React.JSX.Element => {
  const textColor = Platform.select({
    ios: COLORS.IosPlaceholder,
    android: COLORS.AndroidPlaceholder,
  });

  const dispatch = useDispatch();
  const [pan, setPan] = React.useState("");
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState<String | null>(null);
  const [unFormattedDate, setUnFormattedDate] = React.useState<
    Date | undefined
  >(undefined);
  const [consent, setConsent] = React.useState(false);

  const [showInfoCard, setShowInfoCard] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { panError, nameError, dobError, error, isVerifying, entity_type } =
    useAppSelector((state) => state.pan);

  const handlePanError = (error: string | null) => {
    dispatch(setPanError(error));
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
    if (!consent) {
      return;
    }

    if (pan.length === 0) {
      dispatch(setPanError("Please enter your GSTIN or PAN"));
      return;
    }

    dispatch(
      PanVerifyRequest({
        entity_id: pan,
        entity_type,
        name,
        dob: date,
        consent: consent ? "y" : "n",
      })
    );
  };

  const showDatePicker = () => {
    Keyboard.dismiss();
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(formatDate(date));
    setUnFormattedDate(date);
    hideDatePicker();
  };

  const handleNoConsent = () => {
    dispatch(setError("You need to consent to continue"));
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={commonStyles.container}>
        <Stack.Screen
          options={{
            headerTitle: () => <ScreenHeaderProgress progress={"two"} />,
            headerStyle: {
              backgroundColor: error ? "rgba(0, 0, 0, 0.2)" : "white",
            },
            headerBackVisible: false,
          }}
        />

        <View>
          <Header
            title={"Enter your GSTIN or PAN"}
            description={"We require your GSTIN or PAN to open your account"}
          />

          <View style={{ gap: 20, marginTop: 34 }}>
            <View style={Styles.InputContainer}>
              <InputBox
                value={pan}
                placeholder={"GSTIN or PAN"}
                keyboardType={"default"}
                error={panError}
                setError={handlePanError}
                onChangeText={setPan}
                autoCapitalize="characters"
                validator={validatePAN}
                ImagePath={ICONS.info}
                ImagePress={handleInfoPress}
                autoFocus
              />
            </View>

            <InputBox
              value={name}
              placeholder={"Name as per PAN"}
              keyboardType={"default"}
              autoCapitalize="characters"
              error={nameError}
              onChangeText={setName}
            />

            <View style={inputBoxStyles.container}>
              <TouchableOpacity
                style={inputBoxStyles.input}
                onPress={showDatePicker}
              >
                <Text style={{ color: !date ? textColor : COLORS.Black }}>
                  {date ? date : "Date of birth"}
                </Text>
              </TouchableOpacity>

              {dobError && <Text style={inputBoxStyles.error}>{dobError}</Text>}
            </View>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              date={unFormattedDate}
              themeVariant="light"
              display="inline"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              maximumDate={
                new Date(new Date().setFullYear(new Date().getFullYear() - 18))
              }
            />
          </View>
        </View>

        <View>
          <BouncyCheckbox
            size={18}
            fillColor="black"
            unFillColor="#FFFFFF"
            text="I consent to the use of my PAN for identity verification as required by law."
            textStyle={{
              ...footerStyles.text,
              fontSize: 12,
              lineHeight: 14,
              textDecorationLine: "none",
            }}
            iconStyle={{ borderColor: "red" }}
            innerIconStyle={{ borderWidth: 2, borderRadius: 4 }}
            onPress={(isChecked: boolean) => {
              setConsent(isChecked);
            }}
            textContainerStyle={{
              marginLeft: 10,
            }}
            style={{
              marginRight: 20,
              alignItems: "center",
              marginBottom: 12,
            }}
          />

          <View style={ButtonStyles.buttonParent}>
            <CommonButton
              text={"Next"}
              onPress={consent ? handleNext : handleNoConsent}
            />
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

        {error && (
          <ErrorAlert
            errorMessage={error}
            setErrorMessage={() => {
              dispatch(setError(""));
            }}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Pan;
