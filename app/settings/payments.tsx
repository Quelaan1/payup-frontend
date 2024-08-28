import { COLORS } from "../../constants";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import Section from "../../components/common/section/Section";
import ActionButton from "../../components/common/buttons/actionButton/actionButton";

const Payments = () => {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
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

      <Section title={"General"}>
        <ActionButton
          onPress={() => router.navigate("/payees/manage")}
          title={"Manage saved payees"}
        />
      </Section>
    </View>
  );
};

export default Payments;
