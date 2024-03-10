import { SafeAreaView, Text, View } from "react-native";
import { Stack } from "expo-router";
import React from "react";
import { COLORS } from "../constants";
import commonStyles from "../styles/common";
import {
  HeaderLeft,
  HeaderRight,
  PayButton,
  Menu,
  CarouselItem,
} from "../components";
import { homeStyles } from "../styles/home.style";
import CustomCarousel from "carousel-with-pagination-rn";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { promotionalCards } from "../constants/home/menu";

const Home = () => {
  return (
    <SafeAreaView
      style={{
        ...commonStyles.container,
        backgroundColor: COLORS.grayBackground,
        paddingHorizontal: 0,
      }}
    >
      <Stack.Screen
        options={{
          navigationBarColor: COLORS.White,
          headerTintColor: COLORS.Black,
          headerStyle: {
            backgroundColor: COLORS.grayBackground,
          },
          headerTitle: "",
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <View style={{ ...homeStyles.frameContainer }}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={homeStyles.greeting}>good evening.</Text>
          <Text style={homeStyles.userName}>Samantha</Text>
        </View>

        <PayButton />

        <Menu />

        <GestureHandlerRootView>
          <CustomCarousel
            disablePagination={true}
            data={promotionalCards}
            renderItem={({ item }) => {
              return <CarouselItem {...item} />;
            }}
            isEndReached={() => {}}
          />
        </GestureHandlerRootView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
