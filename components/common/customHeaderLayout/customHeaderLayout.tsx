import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBarStyle } from "expo-status-bar/src/StatusBar.types";
import { styles } from "./customHeaderLayout.style";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { TextStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type Props = {
  children: React.ReactNode;
  title?: string;
  backgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
  backShown?: boolean;
  backColor?: string;
  headerTitleStyles?: StyleProp<TextStyle>;
};

const CustomHeaderLayout = ({
  children,
  title,
  backgroundColor = "black",
  statusBarStyle = "light",
  backShown = true,
  backColor = "white",
  headerTitleStyles,
}: Props) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <StatusBar
        translucent
        backgroundColor="transparent"
        style={statusBarStyle}
      />

      <View
        style={{
          backgroundColor: backgroundColor,
          paddingBottom: 18,
        }}
      >
        {backShown && (
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              ...styles.backButton,
              paddingTop: insets.top,
            }}
          >
            <Ionicons name="chevron-back" size={24} color={backColor} />
          </TouchableOpacity>
        )}

        {title && <Text style={headerTitleStyles}>{title}</Text>}
      </View>

      <View style={styles.body}>{children}</View>
    </View>
  );
};

export default CustomHeaderLayout;
