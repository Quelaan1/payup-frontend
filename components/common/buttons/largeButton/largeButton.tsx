import React from "react";
import styles from "./largeButton.style";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  text: string;
  onPress: () => void;
}
const LargeButton = ({ text, onPress }: Props): React.JSX.Element => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LargeButton;
