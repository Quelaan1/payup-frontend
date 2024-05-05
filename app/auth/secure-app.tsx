import { Stack, useNavigation, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { CommonButton } from '../../components';
import { COLORS, IMAGES } from '../../constants';
import commonStyles from '../../styles/common';
import ButtonStyles from '../../components/common/buttons/commonButton/commonButton.style';
import React, { useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import ErrorAlert from '../../components/common/alerts/errorAlerts';
import { useAppDispatch } from '../../redux/hooks';
import { setAppLocked } from '../../redux/slices/profileSlice';

const SecureApp = (): React.JSX.Element => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const [error, setError] = React.useState<string | undefined>(undefined);

	const handleContinue = async () => {
		const securityLevel = await LocalAuthentication.getEnrolledLevelAsync();

		if (securityLevel === 0) {
			setError(
				'Your device has no screen-lock, Please use screen-lock to continue using the app.'
			);
			return;
		}

		const result = await LocalAuthentication.authenticateAsync({
			promptMessage: 'Login with Biometrics',
		});

		if (result.success) {
			dispatch(setAppLocked(true));
			router.push('/home');
		} else {
			setError(
				"Authentication failed, To protect your data you can only access the app when it's unlocked"
			);
		}
	};

	const navigation = useNavigation();

	useEffect(() => {
		navigation.addListener('beforeRemove', (e) => {
			e.preventDefault();
		});
	}, []);

	return (
		<View style={{ ...commonStyles.container, paddingTop: 50 }}>
			<Stack.Screen
				options={{
					headerShown: false,
				}}
			/>

			<View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignContent: 'center',
						width: '100%',
						marginTop: 90,
						marginBottom: 50,
					}}>
					<IMAGES.securityImage
						width={160}
						height={160}
					/>
				</View>

				<View>
					<Text style={{ fontSize: 38, fontWeight: '700' }}>
						{'Protect your\nprivacy'}
					</Text>
				</View>
			</View>

			<View style={ButtonStyles.buttonParent}>
				<CommonButton
					text={'Continue'}
					onPress={handleContinue}
				/>
			</View>

			{error && (
				<ErrorAlert
					errorMessage={error}
					setErrorMessage={setError}
				/>
			)}
		</View>
	);
};

export default SecureApp;

const SecureAppStyles = StyleSheet.create({
	radio: {
		display: 'flex',
		flexDirection: 'row',
		borderWidth: 1,
		borderRadius: 4,
		padding: 12,
		justifyContent: 'space-between',
	},

	radioBlackBorder: {
		borderColor: COLORS.Black,
	},

	radioGreyBorder: {
		borderColor: COLORS.LightGray,
	},
});
