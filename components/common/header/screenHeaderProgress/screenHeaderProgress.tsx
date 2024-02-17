import { View } from "react-native";
import { IMAGES } from "../../../../constants";
import { JSX } from "react";

interface Progress {
  progress: "zero" | "one" | "two";
}

const ScreenHeaderProgress = ({ progress }: Progress): JSX.Element => {
  let image: JSX.Element | null;

  switch (progress) {
    case "zero":
      // @ts-ignore
      image = <IMAGES.progressZero width={160} height={40} />;
      break;
    case "one":
      // @ts-ignore
      image = <IMAGES.progressOne width={160} height={40} />;
      break;
    case "two":
      // @ts-ignore
      image = <IMAGES.progressTwo width={160} height={40} />;
      break;
    default:
      image = null;
      break;
  }

  return <View>{image}</View>;
};

export default ScreenHeaderProgress;
