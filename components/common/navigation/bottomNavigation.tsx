import { useRouter, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity, View } from "react-native";
import { COLORS, ICONS } from "../../../constants";

const BottomNavigation = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 30,
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: COLORS.White,
        position: "absolute",
        bottom: insets.bottom,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (pathname !== "/") {
            router.push("/");
          }
        }}
      >
        <ICONS.houseOutline width={28} height={28} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (pathname !== "/transactions") {
            router.push("/transactions");
          }
        }}
      >
        <ICONS.transaction width={28} height={28} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (pathname !== "/payees/select") {
            router.push("/payees/select");
          }
        }}
      >
        <ICONS.payCircle width={54} height={54} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (pathname !== "/cards/manage") {
            router.push("/cards/manage");
          }
        }}
      >
        <ICONS.cardBlack width={36} height={36} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (pathname !== "/profile") {
            router.push("/profile");
          }
        }}
      >
        <ICONS.profile width={28} height={28} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigation;
