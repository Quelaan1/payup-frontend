import { Text, View } from "react-native";
import styles from "./header.style";
import React from "react";

interface Props {
  title: string;
  description: string;
}

const Header = ({ title, description }: Props): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default Header;
