import React from "react";
import { View, Text, Platform } from "react-native";
import styles from "./loader.style";
import { COLORS } from "../../constants";
import LoadingSpinner from "./loadingSpinner";
import * as Progress from "react-native-progress";

interface Props {
  ImagePath: any;
  Message: string;
}
const Loader = ({ ImagePath, Message }: Props): React.JSX.Element => {
  return (
    <View style={styles.loader}>
      <ImagePath width={20} height={20} />

      <View style={styles.spinnerContainer}>
        {Platform.OS === "ios" ? (
          <LoadingSpinner color={COLORS.DarkGray} />
        ) : (
          <Progress.CircleSnail size={40} color={[COLORS.DarkGray]} />
        )}
      </View>

      <Text style={styles.text}>{Message}</Text>
    </View>
  );
};

export default Loader;
