import { Text, View } from "react-native";
import Styles from "./header.style";
import React from "react";

interface Props {
  title: string;
  description: string;
}

const Header = ({ title, description }: Props): React.JSX.Element => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>{title}</Text>
      <Text style={Styles.description}>{description}</Text>
    </View>
  );
};

export default Header;
