import { Text, View } from "react-native";
import { COLORS, ICONS } from "../../../constants";
import InfoBoxStyles from "./infoBox.style";

const InfoBox = () => {
  return (
    <View style={InfoBoxStyles.container}>
      <ICONS.infoSquare width={32} height={32} />

      <Text>
        {`Keep your Aadhaar number handy. \nThis will take only two minutes.`}
      </Text>
    </View>
  );
};

export default InfoBox;
