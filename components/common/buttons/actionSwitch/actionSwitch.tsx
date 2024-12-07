import { COLORS } from "../../../../constants";
import { Text, View } from "react-native";
import React from "react";
import { TouchableOpacityProps } from "react-native/Libraries/Components/Touchable/TouchableOpacity";
import ToggleSwitch from "toggle-switch-react-native";

interface Props extends TouchableOpacityProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  isOn: boolean;
  onPress: () => void;
}

const ActionSwitch = ({ title, description, icon, isOn, onPress }: Props) => {
  return (
    <View
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

      <View style={{ marginRight: 10 }}>
        <ToggleSwitch
          isOn={isOn}
          onColor="green"
          size="small"
          onToggle={() => onPress()}
        />
      </View>
    </View>
  );
};

export default ActionSwitch;
