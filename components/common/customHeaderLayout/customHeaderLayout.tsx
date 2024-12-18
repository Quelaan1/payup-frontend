import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
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
  handleOutsidePress?: () => void;
};

const CustomHeaderLayout = ({
  children,
  title,
  backgroundColor = "black",
  statusBarStyle = "light",
  backShown = true,
  backColor = "white",
  headerTitleStyles = {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  handleOutsidePress,
}: Props) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
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
            flexDirection: "row",
            paddingTop: insets.top,
            alignItems: "center",
            gap: 10,
            width: "100%",
          }}
        >
          {backShown && (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                ...styles.backButton,
              }}
            >
              <Ionicons name="chevron-back" size={24} color={backColor} />
            </TouchableOpacity>
          )}

          {title && <Text style={headerTitleStyles}>{title}</Text>}
        </View>

        <View style={styles.body}>{children}</View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomHeaderLayout;
