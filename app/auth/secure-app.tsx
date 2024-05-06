import { Stack, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { CommonButton } from '../../components';
import commonStyles from '../../styles/common';
import ButtonStyles from '../../components/common/buttons/commonButton/commonButton.style';
import React, { useEffect } from 'react';
import ErrorAlert from '../../components/common/alerts/errorAlerts';
import { useAppDispatch } from '../../redux/hooks';
import { setAppLocked } from '../../redux/slices/profileSlice';
import { handleBiometricAuthentication } from '../../utils/auth/auth';
import * as LocalAuthentication from 'expo-local-authentication';
import { IMAGES } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setUnlocked } from '../../redux/slices/auth';

const AuthenticationTypes = {
	[LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION]: {
		Image: (
			<IMAGES.faceId
				width={94}
				height={94}
			/>
		),
		Text: 'Face ID',
	},

	[LocalAuthentication.AuthenticationType.FINGERPRINT]: {
		Image: (
			<IMAGES.fingerprint
				width={94}
				height={94}
			/>
		),
		Text: 'Fingerprint',
	},

	[LocalAuthentication.AuthenticationType.IRIS]: {
		Image: (
			<IMAGES.iris
				width={94}
				height={94}
			/>
		),
		Text: 'IRIS',
	},
};

const SecureApp = (): React.JSX.Element => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const [authenticationType, setAuthenticationType] = React.useState<
		LocalAuthentication.AuthenticationType[] | null
	>(null);
	const [error, setError] = React.useState<string | undefined>(undefined);

	const handleContinue = async () => {
		await handleBiometricAuthentication({
			dispatch,
			setAppLocked: (locked: boolean) => dispatch(setAppLocked(locked)),
			setUnlocked: (locked: boolean) => dispatch(setUnlocked(locked)),
			setError,
			router,
			successRoute: '/',
			failureRoute: {
				securityLevelZero: '/auth/login-failed?securityLevel=0',
				default: '/auth/login-failed',
			},
			errorMessages: {
				noSecurity:
					'Your device has no screen-lock, Please use screen-lock to continue using the app.',
				authenticationFailed:
					"Authentication failed, To protect your data you can only access the app when it's unlocked",
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
		<SafeAreaView style={{ ...commonStyles.container }}>
			<Stack.Screen
				options={{
					headerShown: false,
				}}
			/>

			<View style={{ paddingTop: 50, paddingLeft: 20 }}>
				<Text style={{ fontSize: 38, fontWeight: '500' }}>
					{'Protect your account privacy'}
				</Text>
			</View>

			<View
				style={{
					gap: 14,
					alignItems: 'center',
				}}>
				<View
					style={{
						alignItems: 'center',
						gap: 16,
					}}>
					{authenticationType &&
						AuthenticationTypes[authenticationType[0]].Image}

					<Text style={{ fontSize: 23, fontWeight: '500', letterSpacing: 0.5 }}>
						Login with{' '}
						{authenticationType &&
							AuthenticationTypes[authenticationType[0]].Text}
					</Text>
				</View>

				<Text
					style={{ fontSize: 16, fontWeight: '300', paddingHorizontal: 30 }}>
					We've enabled login via{' '}
					{authenticationType &&
						AuthenticationTypes[authenticationType[0]].Text}{' '}
					for you to access PayUp app the same way you unlock your phone
				</Text>
			</View>

			<View style={{ ...ButtonStyles.buttonParent }}>
				<CommonButton
					text={'Okay'}
					onPress={handleContinue}
				/>
			</View>

			{error && (
				<ErrorAlert
					errorMessage={error}
					setErrorMessage={setError}
				/>
			)}
		</SafeAreaView>
	);
};

export default SecureApp;
