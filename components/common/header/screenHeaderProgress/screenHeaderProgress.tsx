import { View } from "react-native";
import { images } from "../../../../constants";

const ScreenHeaderProgress = ({ progress }) => {
  let image;

  switch (progress) {
    case "zero":
      image = <images.progressZero width={160} height={40} />;
      break;
    case "one":
      image = <images.progressOne width={160} height={40} />;
      break;
    case "two":
      image = <images.progressTwo width={160} height={40} />;
      break;
    default:
      image = null;
      break;
  }

  return <View>{image}</View>;
};

export default ScreenHeaderProgress;
