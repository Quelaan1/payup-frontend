import {
	Keyboard,
	TouchableWithoutFeedback,
	View,
	TouchableOpacity,
	Text,
} from 'react-native';
import commonStyles from '../../styles/common';
import { Stack } from 'expo-router';
import {
	Header,
	CommonButton,
	ScreenHeaderProgress,
	InputBox,
	Loader,
	InfoCard,
} from '../../components';
import React, { useEffect, useState } from 'react';
import { COLORS, ICONS } from '../../constants';
import Styles from '../../components/common/inputBox/inputBox.style';
import { points } from '../../constants/onboard/GstInfo';
import ButtonStyles from '../../components/common/buttons/commonButton/commonButton.style';
import { useAppSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import {
	PanVerifyRequest,
	setIsVerifying,
	setPanError,
} from '../../redux/slices/panSlice';
import inputBoxStyles from '../../components/common/inputBox/inputBox.style';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import footerStyles from '../../components/common/footer/footer.style';
import { formatDate } from '../../utils/formatters/dateFormatter';
import infoBoxStyles from '../../components/common/infoBox/infoBox.style';

const Pan = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const [pan, setPan] = React.useState('');
	const [name, setName] = React.useState('');
	const [date, setDate] = React.useState<String | null>(null);
	const [consent, setConsent] = React.useState(false);

	const [showInfoCard, setShowInfoCard] = useState(false);
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const { panError, nameError, dobError, error, isVerifying, entity_type } =
		useAppSelector((state) => state.pan);

	const onChangePan = (value: string) => {
		setPan(value.toUpperCase());
	};

	const onChangeName = (value: string) => {
		setName(value.toUpperCase());
	};

	const handleInfoPress = () => {
		if (Keyboard.isVisible()) {
			Keyboard.dismiss();
		}

		setShowInfoCard(!showInfoCard);
	};

	const handleOutsidePress = () => {
		if (Keyboard.isVisible()) {
			Keyboard.dismiss();
		}

		if (showInfoCard) {
			setShowInfoCard(false);
		}
	};

	const handleNext = () => {
		if (pan.length === 0) {
			dispatch(setPanError('Please enter your GSTIN or PAN'));
			return;
		}

		dispatch(
			PanVerifyRequest({
				entity_id: pan,
				entity_type,
				name,
				dob: date,
				consent,
			})
		);
	};

	const showDatePicker = () => {
		Keyboard.dismiss();
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date: Date) => {
		setDate(formatDate(date));
		hideDatePicker();
	};

	useEffect(() => {
		return () => {
			setPan('');
			setName('');
			setDate(null);
			setConsent(false);
			dispatch(setIsVerifying(''));
			dispatch(setPanError(''));
		};
	}, []);

	return (
		<TouchableWithoutFeedback onPress={handleOutsidePress}>
			<View style={commonStyles.container}>
				<Stack.Screen
					options={{
						navigationBarColor: COLORS.White,
						headerTitle: () => <ScreenHeaderProgress progress={'two'} />,
					}}
				/>

				<View>
					<Header
						title={'Enter your GSTIN or PAN'}
						description={'We require your GSTIN or PAN to open your account'}
					/>

					<View style={{ ...Styles.container, marginTop: 34 }}>
						<View style={Styles.InputContainer}>
							<InputBox
								value={pan}
								placeholder={'GSTIN or PAN'}
								keyboardType={'default'}
								error={panError}
								onChangeText={onChangePan}
							/>

							<TouchableOpacity style={Styles.image} onPress={handleInfoPress}>
								<ICONS.info width={26} height={26} />
							</TouchableOpacity>
						</View>

						<InputBox
							value={name}
							placeholder={'Name as per PAN'}
							keyboardType={'default'}
							error={nameError}
							onChangeText={onChangeName}
						/>

						<View style={infoBoxStyles.container}>
							<TouchableOpacity
								style={inputBoxStyles.input}
								onPress={showDatePicker}>
								<Text style={{ color: !date ? '#C7C7CD' : COLORS.Black }}>
									{date ? date : 'Date of birth'}
								</Text>
							</TouchableOpacity>

							{dobError && <Text style={inputBoxStyles.error}>{dobError}</Text>}
						</View>

						<DateTimePickerModal
							isVisible={isDatePickerVisible}
							mode='date'
							themeVariant='light'
							display='inline'
							onConfirm={handleConfirm}
							onCancel={hideDatePicker}
							maximumDate={
								new Date(new Date().setFullYear(new Date().getFullYear() - 18))
							}
						/>
					</View>
				</View>

				<View>
					<BouncyCheckbox
						size={18}
						fillColor='black'
						unFillColor='#FFFFFF'
						text='I consent to the use of my PAN for identity verification as required by law.'
						textStyle={{ ...footerStyles.text, fontSize: 12, lineHeight: 14 }}
						iconStyle={{ borderColor: 'red' }}
						innerIconStyle={{ borderWidth: 2, borderRadius: 4 }}
						onPress={(isChecked: boolean) => {
							setConsent(isChecked);
						}}
						textContainerStyle={{
							marginLeft: 10,
						}}
						style={{
							marginRight: 20,
							alignItems: 'center',
							marginBottom: 12,
						}}
					/>

					<View style={ButtonStyles.buttonParent}>
						<CommonButton
							disabled={consent}
							text={'Next'}
							onPress={handleNext}
						/>
					</View>

					{isVerifying && (
						<Loader ImagePath={ICONS.mobile} Message={'Verifying GST/PAN'} />
					)}
				</View>

				{showInfoCard && (
					<InfoCard
						ImagePath={ICONS.infoFilled}
						Title='Why GST/PAN is required?'
						Points={points}
					/>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
};

export default Pan;
