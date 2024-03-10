import React from "react";
import { Image, Text, View } from "react-native";
import { Card } from "../../../../app/home";
import styles from "./carouselItem.style";

const CarouselItem = ({
  id,
  discount,
  description,
  title,
  image,
}: Card): React.JSX.Element => {
  return (
    <View style={styles.cardContainerMain}>
      <View key={id} style={styles.cardContainer}>
        <View style={styles.cardLeftContainer}>
          <Text style={styles.cardDiscount}>{discount}</Text>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>

        <Image source={image} style={{ width: 190, height: 110 }} />
      </View>
    </View>
  );
};

export default CarouselItem;
