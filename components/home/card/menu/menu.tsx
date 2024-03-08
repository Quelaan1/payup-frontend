import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, ICONS } from "../../../../constants";
import React from "react";
import { SvgProps } from "react-native-svg";

type Item = {
  id: number;
  icon: React.FC<SvgProps>;
  text: string;
};

const itemData: Item[] = [
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

const ItemComponent = ({ item }: ListRenderItemInfo<Item>) => {
  return (
    <TouchableOpacity style={styles.button}>
      {<item.icon width={26} height={26} />}
      <Text style={styles.buttonText}>{item.text}</Text>
    </TouchableOpacity>
  );
};

const Menu = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={itemData}
        numColumns={4}
        renderItem={ItemComponent}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          display: "flex",
          rowGap: 18,
        }}
        columnWrapperStyle={{
          display: "flex",
          justifyContent: "space-between",
        }}
      />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.White,
    borderRadius: 4,
    shadowColor: COLORS.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
    marginHorizontal: 20,
  },

  button: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    width: 70,
  },

  buttonText: {
    color: COLORS.DarGray20,
    fontSize: 13,
    fontWeight: "bold",
  },
});
