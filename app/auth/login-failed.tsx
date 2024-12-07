import { Text, View } from "react-native";
import { CommonButton } from "../../components";
import { useAppDispatch } from "../../redux/hooks";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { handleBiometricAuthentication } from "../../utils/auth/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyles from "../../styles/common";
import * as LocalAuthentication from "expo-local-authentication";
import { IMAGES } from "../../constants";
import { useEffect, useState } from "react";
import ButtonStyles from "../../components/common/buttons/commonButton/commonButton.style";
import { setUnlocked } from "../../redux/slices/auth";

const AuthenticationTypes = {
  [LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION]: {
    Image: <IMAGES.faceId width={94} height={94} />,
    Text: "Face ID",
  },

  [LocalAuthentication.AuthenticationType.FINGERPRINT]: {
    Image: <IMAGES.fingerprint width={94} height={94} />,
    Text: "Fingerprint",
  },

  [LocalAuthentication.AuthenticationType.IRIS]: {
    Image: <IMAGES.iris width={94} height={94} />,
    Text: "IRIS",
  },
};

const LoginFailed = () => {
  const { callbackUrl } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [authenticationType, setAuthenticationType] = useState<
    LocalAuthentication.AuthenticationType[] | null
  >(null);

  const handleAuthenticate = async () => {
    await handleBiometricAuthentication({
      dispatch,
      setUnlocked: (unlocked: boolean) => dispatch(setUnlocked(unlocked)),
      router,
      checkSecurityLevel: false,
      successRoute: callbackUrl as string,
      errorMessages: {
        noSecurity:
          "Your device has no screen-lock, Please use screen-lock to continue using the app.",
        authenticationFailed: "Authentication failed. Please try again.",
      },
    });
  };

  const detectSupportedAuthenticationType = async () => {
    const supportedTypes =
      await LocalAuthentication.supportedAuthenticationTypesAsync();

    setAuthenticationType(supportedTypes);
  };

  useEffect(() => {
    detectSupportedAuthenticationType();
  }, []);

  return (
    <SafeAreaView style={commonStyles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={{ paddingTop: 50, gap: 10 }}>
        <Text style={{ fontSize: 38, fontWeight: "500" }}>
          {"Access your account securely"}
        </Text>

        <Text>
          To protect your data you can only access the app when it's unlocked
        </Text>
      </View>

      <View
        style={{
          gap: 14,
          alignItems: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
            gap: 16,
          }}
        >
          {authenticationType &&
            AuthenticationTypes[authenticationType[0]].Image}
        </View>
      </View>

      <View style={{ ...ButtonStyles.buttonParent }}>
        <CommonButton
          text={`Unlock with ${
            authenticationType &&
            AuthenticationTypes[authenticationType[0]].Text
          }`}
          onPress={handleAuthenticate}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginFailed;
