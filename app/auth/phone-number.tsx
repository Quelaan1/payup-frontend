import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { Stack } from 'expo-router';
import React from 'react';
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

const phoneNumber = (): React.JSX.Element => {
	const [phoneNumber, setPhoneNumber] = React.useState('');
	const { isSendingSMS, loginOtpRequestError } = useAppSelector(
		(state) => state.loginOtp
	);
	const dispatch = useAppDispatch();

	const onChange = (value: string) => {
		if (value.length !== 10) {
			dispatch(loginOtpRequestSetError('Please enter a valid phone number'));
		}

		if (value.length === 10) {
			dispatch(loginOtpRequestSetError(''));
			Keyboard.dismiss();
		}

		setPhoneNumber(value);
	};

	const handleSend = () => {
		if (phoneNumber.length !== 10) {
			loginOtpRequestSetError('Please enter a valid phone number');
		} else {
			dispatch(loginOtpRequest({ phoneNumber }));
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={commonStyles.container}>
				<Stack.Screen
					options={{
						navigationBarColor: COLORS.White,
						headerTitle: () => <ScreenHeaderProgress progress={'zero'} />,
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
							error={loginOtpRequestError}
							keyboardType={'number-pad'}
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
			</View>
		</TouchableWithoutFeedback>
	);
};

export default phoneNumber;
