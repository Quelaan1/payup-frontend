import React from "react";
import { Image, Text, View } from "react-native";
import { homeStyles } from "../../../../styles/home.style";
import { Card } from "../../../../app/home";

const CarouselItem = ({
  id,
  discount,
  description,
  title,
  image,
}: Card): React.JSX.Element => {
  return (
    <View style={homeStyles.cardContainerMain}>
      <View key={id} style={homeStyles.cardContainer}>
        <View style={homeStyles.cardLeftContainer}>
          <Text style={homeStyles.cardDiscount}>{discount}</Text>
          <Text style={homeStyles.cardTitle}>{title}</Text>
          <Text style={homeStyles.cardDescription}>{description}</Text>
        </View>

        <Image source={image} style={{ width: 190, height: 110 }} />
      </View>
    </View>
  );
};

export default CarouselItem;
