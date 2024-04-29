import { Stack, useRouter } from 'expo-router';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import {
	Header,
	CommonButton,
	ScreenHeaderProgress,
	InputBox,
	Loader,
} from '../../components';
import { COLORS, ICONS } from '../../constants';
import commonStyles from '../../styles/common';
import ButtonStyles from '../../components/common/buttons/commonButton/commonButton.style';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
	AadhaarOtpRequest,
	setAadhaarError,
	setOtpError,
} from '../../redux/slices/aadhaarSlice';

const Aadhaar = (): React.JSX.Element => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const [aadhaar, setAadhaar] = React.useState('');
	const [otp, setOtp] = React.useState('');
	const [inputDisable, setInputDisable] = React.useState(false);

	const {
		aadhaarError,
		error,
		otpError,
		isSendingOtp,
		isVerifying,
		entity_type,
		step,
	} = useAppSelector((state) => state.aadhaar);

	const handleContinue = () => {
		if (step === 1) {
			if (aadhaar.length !== 12) {
				dispatch(setAadhaarError('Aadhaar number should be 12 digits'));
				return;
			}

			setInputDisable(true);
			dispatch(
				AadhaarOtpRequest({
					entity_id: aadhaar,
					entity_type,
				})
			);
		} else if (step === 2) {
			if (aadhaar.length !== 6) {
				dispatch(setOtpError('OTP should be 6 digits'));
				return;
			}

			router.push('/auth/secure-app');
		}
	};

	const handleChange = (text: string) => {
		if (step === 1) {
			setAadhaar(text);
		} else if (step === 2) {
			setOtp(text);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={commonStyles.container}>
				<Stack.Screen
					options={{
						navigationBarColor: COLORS.White,
						headerTitle: () => <ScreenHeaderProgress progress={'two'} />,
					}}
				/>

				<View>
					<Header
						title={`Complete your Aadhaar based KYC`}
						description={
							'You need to complete your KYC to start making payments on PayUp.'
						}
					/>

					<View
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignContent: 'center',
							marginTop: 20,
							marginBottom: 50,
							gap: 20,
						}}>
						<InputBox
							error={aadhaarError}
							placeholder='Aadhaar number'
							value={aadhaar}
							onChangeText={handleChange}
							ImagePath={ICONS.aadhaar}
							editable={!inputDisable}
							keyboardType='numeric'
							maxLength={12}
						/>

						{step === 2 && (
							<InputBox
								error={otpError}
								placeholder='OTP'
								value={otp}
								onChangeText={handleChange}
								ImagePath={ICONS.otp}
								keyboardType='numeric'
								maxLength={6}
							/>
						)}
					</View>
				</View>

				<View>
					<View style={ButtonStyles.buttonParent}>
						<CommonButton text={'Next'} onPress={handleContinue} />
					</View>

					{isSendingOtp && (
						<Loader ImagePath={ICONS.phone} Message={'Sending SMS'} />
					)}

					{isVerifying && (
						<Loader ImagePath={ICONS.mobile} Message={'Verifying number'} />
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default Aadhaar;
