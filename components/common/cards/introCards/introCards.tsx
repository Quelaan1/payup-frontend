import React from "react";
import { Text, View } from "react-native";
import styles from "./introCards.style";
import { Card } from "../../../../app/get-started";

const IntroCards = ({ id, description, title }: Card): React.JSX.Element => {
  return (
    <View key={id} style={styles.container}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
};

export default IntroCards;
