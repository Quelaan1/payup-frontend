import { Text, TextInputProps, View } from "react-native";
import { ICONS } from "../../../constants";
import infoBoxStyles from "./infoBox.style";

interface Props extends TextInputProps {
  info: string;
}

const InfoBox = ({ info }: Props) => {
  return (
    <View style={infoBoxStyles.container}>
      <ICONS.infoSquare width={32} height={32} />

      <Text>{info}</Text>
    </View>
  );
};

export default InfoBox;
