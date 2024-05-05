import { Stack } from 'expo-router';
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
	AadhaarVerifyRequest,
	setAadhaarError,
	setOtpError,
} from '../../redux/slices/aadhaarSlice';
import ErrorAlert from '../../components/common/alerts/errorAlerts';
import {
	validateAadhaar,
	validateAadhaarOtp,
} from '../../utils/validators/validators';

const Aadhaar = (): React.JSX.Element => {
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
		ref_id,
	} = useAppSelector((state) => state.aadhaar);

	const handleContinue = () => {
		if (step === 1) {
			if (aadhaarError) {
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
			if (otpError) {
				return;
			}

			dispatch(
				AadhaarVerifyRequest({ entity_id: aadhaar, otp, entity_type, ref_id })
			);
		}
	};

	const handleChange = (text: string) => {
		if (step === 1) {
			setAadhaar(text);
		} else if (step === 2) {
			setOtp(text);
		}
	};

	const handleSetAadhaarError = (error: string | null) => {
		dispatch(setAadhaarError(error));
	};

	const handleSetAadhaarOtpError = (error: string | null) => {
		dispatch(setOtpError(error));
	};

	const onValidation = () => {
		Keyboard.dismiss();
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
							setError={handleSetAadhaarError}
							placeholder='Aadhaar number'
							value={aadhaar}
							onChangeText={handleChange}
							ImagePath={ICONS.aadhaar}
							editable={!inputDisable}
							keyboardType='numeric'
							validator={validateAadhaar}
							onValidation={onValidation}
							maxLength={12}
							autoFocus
						/>

						{step === 2 && !isSendingOtp && (
							<InputBox
								error={otpError}
								setError={handleSetAadhaarOtpError}
								placeholder='OTP'
								value={otp}
								onChangeText={handleChange}
								ImagePath={ICONS.otp}
								keyboardType='numeric'
								validator={validateAadhaarOtp}
								onValidation={onValidation}
								maxLength={6}
								autoFocus
							/>
						)}
					</View>
				</View>

				<View>
					<View style={ButtonStyles.buttonParent}>
						<CommonButton
							text={'Next'}
							onPress={handleContinue}
						/>
					</View>

					{isSendingOtp && (
						<Loader
							ImagePath={ICONS.phone}
							Message={'Sending SMS'}
						/>
					)}

					{isVerifying && (
						<Loader
							ImagePath={ICONS.mobile}
							Message={'Verifying number'}
						/>
					)}

					{error && (
						<ErrorAlert
							errorMessage={error}
							setErrorMessage={setAadhaarError}
						/>
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default Aadhaar;
