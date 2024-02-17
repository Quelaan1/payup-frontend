import { Stack } from "expo-router";
import { View } from "react-native";
import { Header, LargeButton } from "../../components";
import { COLORS, IMAGES, ICONS } from "../../constants";
import commonStyles from "../../styles/common";
import ButtonStyles from "../../components/common/buttons/largeButton/largeButton.style";

const SecureApp = (): React.JSX.Element => {
  const handleSkip = () => {};

  const handleContinue = () => {};

  return (
    <View style={commonStyles.container}>
      <Stack.Screen
        options={{
          navigationBarColor: COLORS.White,
          headerTitle: "",
        }}
      />

      <View>
        <Header
          title={`Secure your app so only you can access it`}
          description={""}
        />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            width: "100%",
            marginTop: 20,
            marginBottom: 50,
          }}
        >
          <IMAGES.securityImage width={160} height={160} />
        </View>
      </View>

      <View style={ButtonStyles.buttonParent}>
        <LargeButton text={"Not now"} filled onPress={handleSkip} />

        <LargeButton text={"Continue"} onPress={handleContinue} />
      </View>
    </View>
  );
};

export default SecureApp;
