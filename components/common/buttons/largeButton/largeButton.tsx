import React from "react";
import styles from "./largeButton.style";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  text: string;
  onPress: () => void;
  filled?: boolean;
}
const LargeButton = ({
  text,
  onPress,
  filled = false,
}: Props): React.JSX.Element => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={filled ? styles.filledButton : styles.button}
        onPress={onPress}
      >
        <Text
          style={{ ...styles.buttonText, color: filled ? "black" : "white" }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LargeButton;
