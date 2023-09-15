import React from "react";
import { Image, Text, View } from "react-native";

import styles from "../screenheader.style";
import { images } from "../../../../constants";

const ScreenHeaderTitle = () => {
  return (
    <View style={styles.logo}>
      <Image source={images.logo} style={styles.logoImage} />
      <Text style={styles.logoTitle}>PayUp</Text>
    </View>
  );
};

export default ScreenHeaderTitle;
