import { View } from "react-native";
import { COLORS } from "../../constants";
import { Stack, useRouter } from "expo-router";
import React from "react";
import Section from "../../components/common/section/Section";
import ActionButton from "../../components/common/buttons/actionButton/actionButton";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Settings = () => {
  const router = useRouter();

  return (
    <View>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.grayBackground,
          },
          headerTitle: "App Settings",
          headerTitleStyle: {
            fontWeight: "500",
          },
          headerShown: true,
          headerTintColor: COLORS.Black,
        }}
      />

      <Section title={"PERMISSIONS"}>
        <ActionButton
          onPress={() => router.navigate("/settings/notifications")}
          title={"Notification preferences"}
          icon={<Entypo name="notification" size={20} color="black" />}
        />
      </Section>

      <Section title={"ACCOUNT CLOSURE"}>
        <ActionButton
          title={"Close my account"}
          icon={
            <MaterialCommunityIcons name="account" size={20} color="black" />
          }
        />
      </Section>
    </View>
  );
};

export default Settings;
