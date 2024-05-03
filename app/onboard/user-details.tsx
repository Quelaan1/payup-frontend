import { Keyboard, TouchableWithoutFeedback, View, Text } from 'react-native';
import commonStyles from '../../styles/common';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import {
	Header,
	CommonButton,
	ScreenHeaderProgress,
	InputBox,
	Loader,
} from '../../components';
import React, { useEffect } from 'react';
import { COLORS, ICONS } from '../../constants';
import Styles from '../../components/common/inputBox/inputBox.style';
import ButtonStyles from '../../components/common/buttons/commonButton/commonButton.style';
import { validateEmail } from '../../utils/validators/validators';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setUserDetailsError } from '../../redux/slices/userDetailsSlice';
import { UserDetailsConfirmRequest } from '../../redux/slices/profileSlice';
import ErrorAlert from '../../components/common/alerts/errorAlerts';

const UserDetails = (): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const [email, setEmail] = React.useState('');
	const { loading, error } = useAppSelector((state) => state.userDetails);
	const { userName } = useLocalSearchParams();

	const [emailError, setEmailError] = React.useState<string | null>(null);

	const onChange = (value: string) => {
		setEmail(value.toLowerCase());
	};

	const handleSend = () => {
		if (!validateEmail(email)) {
			setEmailError('Please enter a valid email address');
			return;
		}

		setEmailError('');
		dispatch(UserDetailsConfirmRequest({ email, first_name: userName }));
	};

	const handleOutsidePress = () => {
		if (Keyboard.isVisible()) {
			Keyboard.dismiss();
		}
	};

	useEffect(() => {
		return () => {
			setEmail('');
			dispatch(setUserDetailsError(''));
		};
	}, []);

	return (
		<TouchableWithoutFeedback onPress={handleOutsidePress}>
			<View style={commonStyles.container}>
				<View>
					<Stack.Screen
						options={{
							navigationBarColor: COLORS.White,
							headerTitle: () => <ScreenHeaderProgress progress={'two'} />,
						}}
					/>

					<View>
						<Header
							title={`Hey ${userName}! Glad to see you here`}
							description={
								"We've fetched the details from the KYC. Please confirm or edit the details to proceed"
							}
						/>

						<View style={{ ...Styles.container, display: 'flex', gap: 16 }}>
							<View style={{ marginTop: 34 }}>
								<InputBox
									value={userName as unknown as string}
									selectTextOnFocus={false}
									editable={false}
									error={null}
								/>
							</View>

							<View style={Styles.InputContainer}>
								<InputBox
									onChangeText={onChange}
									value={email}
									placeholder={'Email address'}
									keyboardType={'default'}
									autoFocus
									error={emailError}
								/>
							</View>
						</View>
					</View>
				</View>

				<View style={ButtonStyles.buttonParent}>
					<CommonButton
						text={'Next'}
						onPress={handleSend}
					/>

					{loading && (
						<Loader
							ImagePath={ICONS.profile}
							Message={'Updating profile'}
						/>
					)}
				</View>

				{error && (
					<ErrorAlert
						errorMessage={error}
						setErrorMessage={setUserDetailsError}
					/>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
};

export default UserDetails;
