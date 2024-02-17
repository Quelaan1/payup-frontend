import { Stack } from "expo-router";
import { Image, Text, View } from "react-native";
import { Header, LargeButton, ScreenHeaderProgress } from "../../components";
import { COLORS, IMAGES, ICONS } from "../../constants";
import commonStyles from "../../styles/common";
import InfoBox from "../../components/common/infoBox/infoBox";
import ButtonStyles from "../../components/common/buttons/largeButton/largeButton.style";

const Aadhaar = (): React.JSX.Element => {
  const handleSkip = () => {};

  const handleContinue = () => {};

  return (
    <View style={commonStyles.container}>
      <Stack.Screen
        options={{
          navigationBarColor: COLORS.White,
          headerTitle: () => <ScreenHeaderProgress progress={"two"} />,
        }}
      />

      <View>
        <Header
          title={`Complete your Aadhaar based KYC`}
          description={
            "You need to complete your KYC to start making payments on PayUp."
          }
        />

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginTop: 20,
            marginBottom: 50,
          }}
        >
          <Image
            source={IMAGES.aadhaarProcess}
            style={{
              width: 380,
              height: 220,
              resizeMode: "contain",
            }}
          />
        </View>

        <InfoBox />
      </View>

      <View style={ButtonStyles.buttonParent}>
        <LargeButton text={"Next"} onPress={handleContinue} />
      </View>
    </View>
  );
};

export default Aadhaar;
