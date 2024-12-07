import { ImageSourcePropType } from "react-native";

export interface Promotion {
  id: number;
  discount: string;
  title: string;
  description: string;
  image_url: ImageSourcePropType;
}
