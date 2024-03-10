import React from "react";
import { SvgProps } from "react-native-svg";
import { ICONS, IMAGES } from "../index";
import { ImageSourcePropType } from "react-native";

export type MenuItem = {
  id: number;
  icon: React.FC<SvgProps>;
  text: string;
};

export const menuData: MenuItem[] = [
  {
    id: 1,
    icon: ICONS.internet,
    text: "Internet",
  },
  {
    id: 2,
    icon: ICONS.water,
    text: "Water",
  },
  {
    id: 3,
    icon: ICONS.electricity,
    text: "Electricity",
  },
  {
    id: 4,
    icon: ICONS.tv,
    text: "TV Cable",
  },
  {
    id: 5,
    icon: ICONS.vehicle,
    text: "Vehicle",
  },
  {
    id: 6,
    icon: ICONS.house,
    text: "Rent",
  },
  {
    id: 7,
    icon: ICONS.card,
    text: "Credit Card",
  },
  {
    id: 8,
    icon: ICONS.more,
    text: "More",
  },
];

export const promotionalCards: PromotionalCard[] = [
  {
    id: 1,
    discount: "50% OFF",
    title: "Summer special deal",
    description: "Get discount for every transaction",
    image: IMAGES.shopping,
  },
  {
    id: 2,
    discount: "50% OFF",
    title: "Summer special deal",
    description: "Get discount for every transaction",
    image: IMAGES.shopping,
  },
  {
    id: 3,
    discount: "50% OFF",
    title: "Summer special deal",
    description: "Get discount for every transaction",
    image: IMAGES.shopping,
  },
];

export type PromotionalCard = {
  id: number;
  discount: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
};
