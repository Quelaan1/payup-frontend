import { ImageSourcePropType, SafeAreaView, Text, View } from "react-native";
import { Stack } from "expo-router";
import React from "react";
import { COLORS, IMAGES } from "../constants";
import commonStyles from "../styles/common";
import { HeaderLeft, HeaderRight } from "../components/home/header/header";
import PayButton from "../components/home/buttons/payButton/payButton";
import Menu from "../components/home/card/menu/menu";
import CustomCarousel from "carousel-with-pagination-rn";
import { homeStyles } from "../styles/home.style";
import CarouselItem from "../components/home/card/carousel/carouselItem";
import { pad } from "lodash";

const cards: Card[] = [
  {
    id: 1,
    discount: "50% OFF",
    title: "Summer special deal",
    description: "Get discount for every transaction",
    image: IMAGES.shopping,
  },
  {
    id: 2,
    discount: "50% OFF",
    title: "Summer special deal",
    description: "Get discount for every transaction",
    image: IMAGES.shopping,
  },
  {
    id: 3,
    discount: "50% OFF",
    title: "Summer special deal",
    description: "Get discount for every transaction",
    image: IMAGES.shopping,
  },
];

export type Card = {
  id: number;
  discount: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
};

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

        <CustomCarousel
          disablePagination={true}
          data={cards}
          renderItem={({ item }) => {
            return <CarouselItem {...item} />;
          }}
          isEndReached={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
