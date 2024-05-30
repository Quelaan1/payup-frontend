import { Text, View } from "react-native";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { COLORS } from "../constants";
import commonStyles from "../styles/common";
import {
  HeaderLeft,
  HeaderRight,
  PayButton,
  Menu,
  CarouselItem,
  BottomNavigation,
} from "../components";
import { homeStyles } from "../styles/home.style";
import CustomCarousel from "carousel-with-pagination-rn";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAppSelector } from "../redux/hooks";
import { getPromotions } from "../utils/apis/promotions/promotions";
import { Promotion } from "../types/components/promotions/promotions";
import SkeletonLoading from "expo-skeleton-loading";

const getGreeting = () => {
  const hrs = new Date().getHours();
  if (hrs < 12) return "good morning";
  if (hrs <= 17) return "good afternoon";
  return "good evening";
};

const Home = () => {
  const { name } = useAppSelector((state) => state.profile);

  const [greet, setGreet] = useState(getGreeting());
  const [promotionalCards, setPromotionalCards] = useState<Promotion[]>();

  const fetchPromotionalCards = async () => {
    const response = await getPromotions();

    setPromotionalCards(response.promotions);
  };

  useEffect(() => {
    setGreet(getGreeting());

    fetchPromotionalCards();
  }, []);

  // @ts-ignore
  // @ts-ignore
  return (
    <View
      style={{
        ...commonStyles.container,
        backgroundColor: COLORS.White,
        paddingHorizontal: 0,
      }}
    >
      <Stack.Screen
        options={{
          headerTintColor: COLORS.Black,
          headerStyle: {
            backgroundColor: COLORS.grayBackground,
          },
          headerTitle: "",
          headerShown: true,
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <HeaderRight />,
        }}
      />

      <View style={homeStyles.frameContainer}>
        <View style={{ paddingHorizontal: 20, gap: 4 }}>
          <Text style={homeStyles.greeting}>{greet}.</Text>
          <Text style={homeStyles.userName}>{name}</Text>
        </View>

        <PayButton />

        <View>
          <View
            style={{
              paddingVertical: 6,
              backgroundColor: COLORS.DarGray20,
              marginHorizontal: 20,
              borderTopEndRadius: 4,
              borderTopStartRadius: 4,
              alignItems: "center",
            }}
          >
            <Text style={{ color: COLORS.White }}>Coming soon</Text>
          </View>

          <Menu />
        </View>

        {!promotionalCards && (
          <SkeletonLoading background={"#adadad"} highlight={"#ffffff"}>
            <View
              style={{
                backgroundColor: "rgba(173, 173, 173, 0.2)",
                flexDirection: "row",
                justifyContent: "space-between",
                borderRadius: 4,
                padding: 25,
                marginHorizontal: 20,
              }}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    backgroundColor: "#adadad",
                    width: "15%",
                    height: 8,
                    borderRadius: 5,
                    marginBottom: 3,
                  }}
                />
                <View
                  style={{
                    backgroundColor: "#adadad",
                    width: "20%",
                    height: 8,
                    borderRadius: 5,
                    marginBottom: 3,
                  }}
                />
                <View
                  style={{
                    backgroundColor: "#adadad",
                    width: "30%",
                    height: 10,
                    borderRadius: 5,
                  }}
                />
              </View>

              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: "#adadad",
                  borderRadius: 10,
                }}
              />
            </View>
          </SkeletonLoading>
        )}

        {promotionalCards && (
          <GestureHandlerRootView>
            <CustomCarousel
              disablePagination={true}
              data={promotionalCards as any}
              renderItem={({ item }) => {
                return <CarouselItem {...item} />;
              }}
            />
          </GestureHandlerRootView>
        )}
      </View>

      <BottomNavigation />
    </View>
  );
};

export default Home;
