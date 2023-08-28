import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
} from 'react-native';
import React, { useCallback } from 'react';

import Logo from '../images/logo.png';
import Frame from '../images/frame.png';

import {
  useFonts,
  IBMPlexSans_100Thin,
  IBMPlexSans_100Thin_Italic,
  IBMPlexSans_200ExtraLight,
  IBMPlexSans_200ExtraLight_Italic,
  IBMPlexSans_300Light,
  IBMPlexSans_300Light_Italic,
  IBMPlexSans_400Regular,
  IBMPlexSans_400Regular_Italic,
  IBMPlexSans_500Medium,
  IBMPlexSans_500Medium_Italic,
  IBMPlexSans_600SemiBold,
  IBMPlexSans_600SemiBold_Italic,
  IBMPlexSans_700Bold,
  IBMPlexSans_700Bold_Italic,
} from '@expo-google-fonts/ibm-plex-sans';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

const screenHeight = Dimensions.get('window').height;

const GetStarted = () => {
  let [fontsLoaded] = useFonts({
    IBMPlexSans_100Thin,
    IBMPlexSans_100Thin_Italic,
    IBMPlexSans_200ExtraLight,
    IBMPlexSans_200ExtraLight_Italic,
    IBMPlexSans_300Light,
    IBMPlexSans_300Light_Italic,
    IBMPlexSans_400Regular,
    IBMPlexSans_400Regular_Italic,
    IBMPlexSans_500Medium,
    IBMPlexSans_500Medium_Italic,
    IBMPlexSans_600SemiBold,
    IBMPlexSans_600SemiBold_Italic,
    IBMPlexSans_700Bold,
    IBMPlexSans_700Bold_Italic,
  });

  const router = useRouter();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleNext = async () => {
    router.push('/home');
  };

  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={Frame} style={styles.frame} />
        <View style={styles.logo}>
          <Image source={Logo} style={styles.logoImage} />
          <Text style={styles.logoTitle}>PayUp</Text>
        </View>
      </View>

      <View style={styles.pagination}></View>

      <View style={styles.slogansContainer}>
        <Text style={styles.slogansTitle}>Easy Credit Transfers</Text>
        <Text style={styles.slogansSlogan}>
          Transfer credit card funds to your bank account with ease. Enjoy a
          secure, fast, and hassle-free experience.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  logo: {
    gap: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoTitle: {
    color: 'black',
    fontFamily: 'IBMPlexSans_700Bold',
    fontSize: 18,
  },
  logoImage: {
    width: 24,
    height: 24,
  },
  frame: {
    top: -150,
    position: 'absolute',
    width: '100%',
    height: screenHeight / 1.25,
    resizeMode: 'contain',
    alignSelf: 'baseline',
  },
  pagination: {
    paddingTop: screenHeight / 1.55,
  },
  slogansContainer: { gap: 6, paddingHorizontal: 30 },
  slogansTitle: {
    textAlign: 'center',
    fontSize: 34,
    fontFamily: 'IBMPlexSans_700Bold',
  },
  slogansSlogan: {
    textAlign: 'center',
    color: '#595F67',
    fontSize: 12,
    lineHeight: 20,
  },
  buttonContainer: {
    paddingTop: 40,
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'IBMPlexSans_700Bold',
    fontSize: 18,
  },
});
