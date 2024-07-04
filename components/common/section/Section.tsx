import { Text, View, ViewStyle } from "react-native";
import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
  style?: ViewStyle;
};

const Section = ({ children, title, style }: Props) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 8,
          backgroundColor: "rgba(208, 211, 216, 0.3)",
          width: "100%",
          marginBottom: 20,
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
      </View>

      {children}
    </View>
  );
};

export default Section;
