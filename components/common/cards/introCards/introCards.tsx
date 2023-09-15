import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './introCards.style';

const IntroCards = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </View>
  );
};

export default IntroCards;
