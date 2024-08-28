import { Stack, SplashScreen, useRouter, usePathname } from 'expo-router';
import * as IBMPlexSans from '@expo-google-fonts/ibm-plex-sans';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import layoutStyles from '../styles/layout';
import { Provider } from 'react-redux';
import { persistor, store } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { COLORS } from '../constants';
import ReactNativeInactivity from 'react-native-inactivity';
import { handleBiometricAuthentication } from '../utils/auth/auth';
import { setUnlocked } from '../redux/slices/auth';
import { PaperProvider } from 'react-native-paper';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
	const dispatch = store.dispatch;
	const router = useRouter();
	const pathname = usePathname();

	let [fontsLoaded, fontError] = IBMPlexSans.useFonts({
		Thin: IBMPlexSans.IBMPlexSans_100Thin,
		ThinItalic: IBMPlexSans.IBMPlexSans_100Thin_Italic,
		ExtraLight: IBMPlexSans.IBMPlexSans_200ExtraLight,
		ExtraLightItalic: IBMPlexSans.IBMPlexSans_200ExtraLight_Italic,
		Light: IBMPlexSans.IBMPlexSans_300Light,
		LightItalic: IBMPlexSans.IBMPlexSans_300Light_Italic,
		Regular: IBMPlexSans.IBMPlexSans_400Regular,
		RegularItalic: IBMPlexSans.IBMPlexSans_400Regular_Italic,
		Medium: IBMPlexSans.IBMPlexSans_500Medium,
		MediumItalic: IBMPlexSans.IBMPlexSans_500Medium_Italic,
		SemiBold: IBMPlexSans.IBMPlexSans_600SemiBold,
		SemiBoldItalic: IBMPlexSans.IBMPlexSans_600SemiBold_Italic,
		Bold: IBMPlexSans.IBMPlexSans_700Bold,
		BoldItalic: IBMPlexSans.IBMPlexSans_700Bold_Italic,
	});

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	const handleAuthenticate = async () => {
		await handleBiometricAuthentication({
			dispatch,
			setUnlocked: (unlocked: boolean) => dispatch(setUnlocked(unlocked)),
			router,
			checkSecurityLevel: false,
			failureRoute: {
				securityLevelZero: '/auth/login-failed?securityLevel=0',
				default: '/auth/login-failed',
			},
			errorMessages: {
				noSecurity:
					'Your device has no screen-lock, Please use screen-lock to continue using the app.',
				authenticationFailed: 'Authentication failed. Please try again.',
			},
		});
	};

	if (!fontsLoaded && !fontError) {
		return null;
	}

	if (fontError) {
		return (
			<View style={layoutStyles.errorContainer}>
				<Text style={layoutStyles.errorText}>
					Error loading fonts: {fontError.message}
				</Text>
			</View>
		);
	}

	return (
		<Provider store={store}>
			<PersistGate
				loading={null}
				persistor={persistor}>
				<ReactNativeInactivity
					onInactive={async () => {
						if (
							!store.getState().auth.unlocked &&
							!pathname.includes('/auth') &&
							!pathname.includes('/onboard')
						) {
							dispatch(setUnlocked(false));
							await handleAuthenticate();
						}
					}}
					timeForInactivity={30000}
					restartTimerOnActivityAfterExpiration={true}
					loop={false}>
					<PaperProvider>
						<Stack
							screenOptions={{
								navigationBarColor: COLORS.White,
								autoHideHomeIndicator: true,
								headerTitleAlign: 'center',
								headerShadowVisible: false,
								headerBackTitleVisible: false,
								gestureEnabled: false,
							}}
						/>
					</PaperProvider>
				</ReactNativeInactivity>
			</PersistGate>
		</Provider>
	);
}
