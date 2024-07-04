import { COLORS } from "../../../../constants";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacityProps } from "react-native/Libraries/Components/Touchable/TouchableOpacity";

interface Props extends TouchableOpacityProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

const ActionButton = ({ title, description, icon, ...buttonProps }: Props) => {
  return (
    <TouchableOpacity
      {...buttonProps}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        backgroundColor: COLORS.White,
        paddingVertical: 14,
        borderRadius: 4,
      }}
    >
      <View
        style={{
          marginLeft: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        {icon && icon}

        <View>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.Black,
            }}
          >
            {title}
          </Text>

          {description && (
            <Text style={{ fontSize: 12, color: COLORS.DarkGray }}>
              {description}
            </Text>
          )}
        </View>
      </View>

      <Feather
        style={{
          marginRight: 10,
        }}
        name="chevron-right"
        size={24}
        color="black"
      />
    </TouchableOpacity>
  );
};

export default ActionButton;
