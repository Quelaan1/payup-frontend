import {
	Keyboard,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import commonStyles from '../../styles/common';
import { Stack, useLocalSearchParams } from 'expo-router';
import {
	Header,
	CommonButton,
	ScreenHeaderProgress,
	OTPInput,
	Footer,
	Loader,
} from '../../components';
import React, { useState } from 'react';
import { COLORS, ICONS } from '../../constants';
import ButtonStyles from '../../components/common/buttons/commonButton/commonButton.style';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
	loginOtpVerify,
	loginOtpVerifySetError,
} from '../../redux/slices/otpSlice';
import ErrorAlert from '../../components/common/alerts/errorAlerts';

const otpVerification = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const { phoneNumber } = useLocalSearchParams();
	const [otp, setOtp] = useState('');
	const [otpError, setOtpError] = useState('');
	const { isVerifying, loginOtpVerifyError } = useAppSelector(
		(state) => state.loginOtp
	);

	const handleSend = async () => {
		if (phoneNumber) {
			if (otp.length !== 6) {
				setOtpError('Please enter a valid OTP');
			} else {
				dispatch(
					loginOtpVerify({
						phoneNumber: phoneNumber as unknown as string,
						otp,
					})
				);
			}
		}
	};

	const handleClearError = () => {
		dispatch(loginOtpVerifySetError(null));
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={commonStyles.container}>
				<Stack.Screen
					options={{
						navigationBarColor: COLORS.White,
						headerTitle: () => <ScreenHeaderProgress progress={'one'} />,
						headerStyle: {
							backgroundColor: loginOtpVerifyError
								? 'rgba(0, 0, 0, 0.2)'
								: 'white',
						},
					}}
				/>

				<View
					style={{
						gap: 30,
					}}>
					<Header
						title={'Verify your phone number'}
						description={'Enter the OTP you received'}
					/>

					<View style={{ gap: 10 }}>
						<OTPInput
							value={otp}
							setValue={setOtp}
							digits={6}
							error={otpError}
						/>

						{/* <View style={styles.container}>
							<Text style={{ ...styles.buttonText, marginLeft: 8 }}>
								{isButtonDisabled && `Time Remaining ${formatTime(timer)}`}
							</Text>

							<TouchableOpacity
								onPress={handleResendClick}
								disabled={isButtonDisabled}
								style={styles.button}>
								<Text
									style={{
										...styles.buttonText,
										marginRight: 10,
										color: isButtonDisabled ? COLORS.LightGray : '#31363F',
									}}>
									Resend OTP
								</Text>
							</TouchableOpacity>
						</View> */}
					</View>
				</View>

				<View>
					<View style={ButtonStyles.buttonParent}>
						<CommonButton
							text={'Next'}
							onPress={handleSend}
						/>
					</View>

					<Footer />

					{isVerifying && (
						<Loader
							ImagePath={ICONS.mobile}
							Message={'Verifying number'}
						/>
					)}
				</View>

				{loginOtpVerifyError && (
					<ErrorAlert
						errorMessage={loginOtpVerifyError}
						setErrorMessage={handleClearError}
					/>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	button: {
		padding: 10,
		borderRadius: 5,
	},
	buttonText: {
		color: '#31363F',
		fontSize: 15,
	},
});

export default otpVerification;
