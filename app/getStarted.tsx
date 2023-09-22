import { StyleSheet, View } from "react-native";
import React from "react";
import CustomCarousel from "carousel-with-pagination-rn";
import { Stack, useRouter } from "expo-router";
import {
  IntroCards,
  LargeButton,
  ScreenHeaderTitle,
} from "../components/index";
import { COLORS, images } from "../constants";
import commonStyles from "../styles/common";

export interface Card {
  id: number;
  title: string;
  description: string;
}

const cards: Card[] = [
  {
    id: 1,
    title: "Easy Credit Transfers",
    description:
      "Transfer credit card funds to your bank account with ease. Enjoy a secure, fast, and, hassle-free experience",
  },
  {
    id: 2,
    title: "Instant Notifications",
    description:
      "Stay up-to-date with real-time alerts for every transaction. Get instant notifications on your phone or email, so you're always in the loop.",
  },
  {
    id: 3,
    title: "Built for India",
    description:
      "Tailored for the Indian market, PayUp ensures compatibility with all major Indian banks and credit card providers for a seamless experience.",
  },
];

const GetStarted = (): React.JSX.Element => {
  const router = useRouter();

  const handleNext = async () => {
    router.push("/getPhoneNumber");
  };

  return (
    <View style={commonStyles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => <ScreenHeaderTitle />,
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: COLORS.skinBackground },
        }}
      />

      <View style={styles.frameContainer}>
        <images.frame width={"100%"} />
      </View>

      <CustomCarousel
        data={cards}
        indicatorWidth={[12, 18, 12]}
        indicatorHeight={[8, 12, 8]}
        inidicatorBorderRadius={4}
        indicatorHorizontalPadding={5}
        paginationContainerStyle={{ paddingTop: 15 }}
        renderItem={({ item }) => {
          return (
            <IntroCards
              id={item}
              description={item.description}
              title={item.title}
            />
          );
        }}
      />

      <LargeButton text={"Next"} onPress={handleNext} />
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  frameContainer: {
    backgroundColor: COLORS.skinBackground,
    paddingTop: 50,
    paddingBottom: 100,
  },
});
