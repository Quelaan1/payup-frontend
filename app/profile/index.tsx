import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CustomHeaderLayout from "../../components/common/customHeaderLayout/customHeaderLayout";
import Section from "../../components/common/section/Section";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ActionButton from "../../components/common/buttons/actionButton/actionButton";
import {
  fetchProfile,
  logoutUser,
  setIsEmailModalVisible,
  setIsPhoneNumberModalVisible,
  updateEmailFailure,
  updatePhoneNumberFailure,
} from "../../redux/slices/profileSlice";
import { reloadAppAsync } from "expo";
import SlideUpModal from "../../components/common/slideUpModal/slideUpModal";
import {
  validateEmail,
  validatePhoneNumber,
} from "../../utils/validators/validators";
import {
  updateEmail,
  updatePhoneNumber,
} from "../../redux/slices/profileSlice";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Profile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    name,
    email: initialEmail,
    phone_number,
    error,
    loading,
    isEmailModalVisible,
    isPhoneNumberModalVisible,
  } = useAppSelector((state) => state.profile);

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const updateEmailHandler = (newEmail: string) => {
    dispatch(updateEmail(newEmail));
  };
  const updatePhoneNumberHandler = (newPhoneNumber: string) => {
    dispatch(updatePhoneNumber(newPhoneNumber));
  };

  const data = [
    {
      column1: "Name",
      column2: (
        <Text
          numberOfLines={1}
          style={[
            styles.cell,
            { textAlign: "right", textTransform: "capitalize" },
          ]}
        >
          {name}
        </Text>
      ),
    },
    {
      column1: "Email Address",
      column2: (
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Text numberOfLines={1} style={[styles.cell, { textAlign: "right" }]}>
            {initialEmail}
          </Text>

          <TouchableOpacity
            onPress={() => dispatch(setIsEmailModalVisible(true))}
          >
            <Feather name="edit-2" size={16} color="black" />
          </TouchableOpacity>
        </View>
      ),
    },
    {
      column1: "Mobile Number",
      column2: (
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Text numberOfLines={1} style={[styles.cell, { textAlign: "right" }]}>
            {phone_number}
          </Text>

          <TouchableOpacity
            onPress={() => dispatch(setIsPhoneNumberModalVisible(true))}
          >
            <Feather name="edit-2" size={16} color="black" />
          </TouchableOpacity>
        </View>
      ),
    },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    reloadAppAsync();
  };

  const emailValidationHandler = (text: string) => {
    const isValid = validateEmail(text);
    if (typeof isValid === "string") {
      dispatch(updateEmailFailure(isValid));
    } else {
      dispatch(updateEmailFailure(null));
    }
    return isValid;
  };

  const phoneNumberValidationHandler = (text: string) => {
    const isValid = validatePhoneNumber(text);
    if (typeof isValid === "string") {
      dispatch(updatePhoneNumberFailure(isValid));
    } else {
      dispatch(updatePhoneNumberFailure(null));
    }
    return isValid;
  };

  useEffect(() => {
    dispatch(fetchProfile());

    return () => {
      dispatch(updateEmailFailure(null));
      dispatch(updatePhoneNumberFailure(null));
    };
  }, []);

  return (
    <CustomHeaderLayout handleOutsidePress={Keyboard.dismiss}>
      <View>
        <View
          style={{
            backgroundColor: COLORS.Black,
            paddingLeft: 20,
          }}
        >
          <Text
            style={{
              color: COLORS.White,
              fontSize: 18,
              fontWeight: "bold",
              paddingBottom: 10,
              textTransform: "capitalize",
            }}
          >
            {name}
          </Text>
        </View>

        <ScrollView alwaysBounceVertical={false}>
          <Section title={"PROFILE DETAILS"}>
            <View style={styles.table}>
              {data.map((row, index) => (
                <View key={index} style={styles.row}>
                  <Text
                    style={[
                      styles.cell,
                      { textAlign: "left", color: COLORS.DarkGray },
                    ]}
                  >
                    {row.column1}
                  </Text>

                  {row.column2}
                </View>
              ))}
            </View>
          </Section>

          <Section title={"MORE ACTIONS"} style={{ gap: 12 }}>
            <View
              style={{
                gap: 12,
              }}
            >
              <ActionButton
                onPress={() => router.navigate("/settings")}
                title={"App settings"}
                description={"Manage notifications, and more"}
                icon={
                  <Ionicons name="settings-outline" size={20} color="black" />
                }
              />

              <ActionButton
                onPress={() => router.navigate("/cards/manage")}
                title={"Your cards"}
                description={"Manage your cards"}
                icon={
                  <Ionicons name="settings-outline" size={20} color="black" />
                }
              />

              <ActionButton
                onPress={() => router.navigate("/settings/payments")}
                title={"Payments"}
                description={"Manage payees, and Bill Payments"}
                icon={
                  <Ionicons name="settings-outline" size={20} color="black" />
                }
              />
            </View>
          </Section>

          <Section title={"ABOUT US"} style={{ gap: 12 }}>
            <View
              style={{
                gap: 12,
              }}
            >
              <ActionButton
                title={"About PayUp"}
                icon={
                  <Ionicons
                    name="information-circle-outline"
                    size={20}
                    color="black"
                  />
                }
              />

              <ActionButton
                title={"Help center"}
                icon={
                  <Ionicons
                    name="help-circle-outline"
                    size={20}
                    color="black"
                  />
                }
              />

              <ActionButton
                title={"Logout"}
                onPress={handleLogout}
                icon={
                  <Ionicons name="log-out-outline" size={20} color="black" />
                }
              />
            </View>
          </Section>
        </ScrollView>
      </View>

      <SlideUpModal
        visible={isEmailModalVisible}
        onClose={() => dispatch(setIsEmailModalVisible(false))}
        onSubmit={updateEmailHandler}
        Title={"Update Email"}
        Placeholder={"Enter your new email"}
        ButtonText={"Update"}
        error={error}
        loading={loading}
        inputValue={email}
        setInputValue={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        validator={emailValidationHandler}
        disabled={typeof error === "string" || loading}
        editable={!loading}
      />

      <SlideUpModal
        visible={isPhoneNumberModalVisible}
        onClose={() => dispatch(setIsPhoneNumberModalVisible(false))}
        onSubmit={updatePhoneNumberHandler}
        Title={"Update Phone Number"}
        Placeholder={"Enter your new phone number"}
        ButtonText={"Update"}
        error={error}
        loading={loading}
        inputValue={phoneNumber}
        setInputValue={setPhoneNumber}
        validator={phoneNumberValidationHandler}
        disabled={typeof error === "string" || loading}
        keyboardType="number-pad"
        editable={!loading}
      />
    </CustomHeaderLayout>
  );
};

const styles = StyleSheet.create({
  table: {
    backgroundColor: COLORS.White,
    marginHorizontal: 20,
    borderRadius: 4,
    shadowColor: COLORS.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
    padding: 8,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    padding: 8,
  },
});

export default Profile;
