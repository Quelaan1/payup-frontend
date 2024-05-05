import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import {
	Header,
	ScreenHeaderProgress,
	Footer,
	Loader,
	CommonButton,
	InputBox,
} from '../../components';
import commonStyles from '../../styles/common';
import { COLORS, ICONS } from '../../constants';
import ButtonStyles from '../../components/common/buttons/commonButton/commonButton.style';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
	loginOtpRequest,
	loginOtpRequestSetError,
} from '../../redux/slices/otpSlice';
import ErrorAlert from '../../components/common/alerts/errorAlerts';
import { validatePhoneNumber } from '../../utils/validators/validators';

const phoneNumber = (): React.JSX.Element => {
	const [phoneNumber, setPhoneNumber] = React.useState('');
	const [phoneNumberError, setPhoneNumberError] = React.useState<string | null>(
		null
	);
	const { isSendingSMS, loginOtpRequestError } = useAppSelector(
		(state) => state.loginOtp
	);
	const dispatch = useAppDispatch();

	const onChange = (value: string) => {
		if (typeof value === 'string' && !isNaN(Number(value))) {
			setPhoneNumber(value);
		}
	};

	const handleSend = () => {
		if (phoneNumber.length !== 10) {
			setPhoneNumberError('Please enter a valid phone number');
		} else {
			setPhoneNumberError('');
			dispatch(loginOtpRequest({ phoneNumber }));
		}
	};

	const handleClearError = () => {
		dispatch(loginOtpRequestSetError(null));
	};

	const handleOnValidation = () => {
		Keyboard.dismiss();
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={commonStyles.container}>
				<Stack.Screen
					options={{
						navigationBarColor: COLORS.White,
						headerTitle: () => <ScreenHeaderProgress progress={'zero'} />,
						headerStyle: {
							backgroundColor: loginOtpRequestError
								? 'rgba(0, 0, 0, 0.2)'
								: 'white',
						},
					}}
				/>

				<View>
					<Header
						title={"Welcome to PayUp.\nLet's get you started"}
						description={
							'Enter the phone number where you would like to receive OTP on'
						}
					/>

					<View style={{ marginTop: 34 }}>
						<InputBox
							placeholder={'Phone Number'}
							ImagePath={ICONS.phone}
							onChangeText={onChange}
							value={phoneNumber}
							error={phoneNumberError}
							setError={setPhoneNumberError}
							keyboardType={'number-pad'}
							maxLength={10}
							autoComplete='tel'
							onKeyPress={(e) => {
								const sanitizedValue = e.nativeEvent.key.replace(/[- ]/g, '');

								if (
									!isNaN(Number(sanitizedValue)) &&
									sanitizedValue.length === 10
								) {
									setPhoneNumber(sanitizedValue);
								}
							}}
							validator={validatePhoneNumber}
							onValidation={handleOnValidation}
							autoFocus
						/>
					</View>
				</View>

				<View>
					<View style={ButtonStyles.buttonParent}>
						<CommonButton
							id={'sign-in-button'}
							text={'Next'}
							onPress={handleSend}
						/>
					</View>

					<Footer />

					{isSendingSMS && (
						<Loader
							ImagePath={ICONS.phone}
							Message={'Sending SMS'}
						/>
					)}
				</View>

				{loginOtpRequestError && (
					<ErrorAlert
						errorMessage={loginOtpRequestError}
						setErrorMessage={handleClearError}
					/>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
};

export default phoneNumber;
