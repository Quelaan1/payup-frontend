import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import { Image } from "expo-image";

type Props = {
  children: React.ReactNode;
  title: string;
  style?: ViewStyle;
  actionButtonTitle?: string;
  actionButtonOnPress?: () => void;
  actionButtonWithLogo?: ReactNode;
  actionButtonWithLogoOnPress?: () => void;
};

const Section = ({
  children,
  title,
  style,
  actionButtonTitle,
  actionButtonOnPress,
  actionButtonWithLogo,
  actionButtonWithLogoOnPress,
}: Props) => {
  return (
    <View style={{ marginBottom: 10, ...style }}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 8,
          backgroundColor: "rgba(208, 211, 216, 0.3)",
          width: "100%",
          marginBottom: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "rgba(0, 0, 0, 0.8)",
          }}
        >
          {title}
        </Text>

        {actionButtonTitle && actionButtonOnPress && (
          <TouchableOpacity>
            <Text
              style={{
                color: "rgba(0, 0, 0, 0.6)",
                fontSize: 14,
                fontWeight: "400",
                textDecorationLine: "underline",
              }}
              onPress={actionButtonOnPress}
            >
              {actionButtonTitle}
            </Text>
          </TouchableOpacity>
        )}

        {actionButtonWithLogo && actionButtonWithLogoOnPress && (
          <TouchableOpacity onPress={actionButtonWithLogoOnPress}>
            {actionButtonWithLogo}
          </TouchableOpacity>
        )}
      </View>

      {children}
    </View>
  );
};

export default Section;
