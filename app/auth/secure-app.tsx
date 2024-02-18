import { Stack } from "expo-router";
import { View } from "react-native";
import { Header, LargeButton } from "../../components";
import { COLORS, IMAGES, ICONS } from "../../constants";
import commonStyles from "../../styles/common";
import ButtonStyles from "../../components/common/buttons/largeButton/largeButton.style";
import {
  CheckCircleIcon,
  CircleIcon,
  FormControl,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  VStack,
} from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import Icons from "../../constants/icons";

const SecureApp = (): React.JSX.Element => {
  const [selection, setSelection] = useState("screen-lock");

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

        <View>
          <FormControl>
            <RadioGroup value={selection} onChange={setSelection}>
              <VStack
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <View>
                  <Radio
                    value="screen-lock"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderWidth: 1,
                      borderRadius: 4,
                      padding: 12,
                      justifyContent: "space-between",
                      borderColor:
                        selection === "screen-lock"
                          ? COLORS.Black
                          : COLORS.LightGray,
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      <RadioLabel
                        style={{ fontSize: 16, fontFamily: "Medium" }}
                      >
                        Use your screen lock
                      </RadioLabel>

                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 4,
                          alignContent: "center",
                        }}
                      >
                        <Icons.keypad width={22} height={22} />

                        <RadioLabel>
                          {`Use your existing PIN, pattern, face ID,\nor fingerprint`}
                        </RadioLabel>
                      </View>

                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 4,
                          alignContent: "center",
                        }}
                      >
                        <Icons.offline width={22} height={22} />

                        <RadioLabel>Works offline</RadioLabel>
                      </View>
                    </View>

                    <RadioIndicator>
                      <RadioIcon
                        color={selection === "screen-lock" ? "black" : "white"}
                        as={CheckCircleIcon}
                        width={14}
                        height={14}
                      />
                    </RadioIndicator>
                  </Radio>
                </View>

                <Radio
                  value="payup-lock"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    borderColor:
                      selection === "payup-lock"
                        ? COLORS.Black
                        : COLORS.LightGray,
                    borderWidth: 1,
                    borderRadius: 4,
                    padding: 12,
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <RadioLabel style={{ fontSize: 16, fontFamily: "Medium" }}>
                      Use a 4-digit PayUp PIN
                    </RadioLabel>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 4,
                        alignContent: "center",
                      }}
                    >
                      <Icons.lock width={22} height={22} />

                      <RadioLabel>Create a PayUp PIN</RadioLabel>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 4,
                        alignContent: "center",
                      }}
                    >
                      <Icons.online width={22} height={22} />

                      <RadioLabel>Needs internet connection</RadioLabel>
                    </View>
                  </View>

                  <RadioIndicator>
                    <RadioIcon
                      color="white"
                      as={CheckCircleIcon}
                      width={22}
                      height={22}
                    />
                  </RadioIndicator>
                </Radio>
              </VStack>
            </RadioGroup>
          </FormControl>
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
