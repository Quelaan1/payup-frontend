import { Stack } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import commonStyles from '../../styles/common';
import { COLORS } from '../../constants';
import {
	CreditCardInput,
	CreditCardView,
	CreditCardFormData,
	CreditCardFormField,
} from 'react-native-credit-card-input';
import { useState } from 'react';
import { CommonButton } from '../../components';
import commonButtonStyles from '../../components/common/buttons/commonButton/commonButton.style';

const Add = () => {
	const [focusedField, setFocusedField] = useState<CreditCardFormField>();

	const [formData, setFormData] = useState<CreditCardFormData>();

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'space-between',
				marginHorizontal: 20,
			}}>
			<Stack.Screen
				options={{
					headerStyle: {
						backgroundColor: COLORS.grayBackground,
					},
					headerTitle: 'Add Credit Card',
					headerTitleStyle: {
						fontWeight: '500',
					},
					headerShown: true,
					headerTintColor: COLORS.Black,
				}}
			/>

			<View>
				<CreditCardView
					focusedField={focusedField}
					type={formData?.values.type}
					number={formData?.values.number}
					expiry={formData?.values.expiry}
					cvc={formData?.values.cvc}
					style={s.cardView}
				/>

				<CreditCardInput
					autoFocus
					style={s.cardInput}
					onChange={setFormData}
					onFocusField={setFocusedField}
				/>
			</View>

			<View style={commonButtonStyles.buttonParent}>
				<CommonButton
					text={'Add Card'}
					onPress={() => {}}
					disabled={!formData?.valid}
				/>
			</View>
		</View>
	);
};

const s = StyleSheet.create({
	cardView: {
		alignSelf: 'center',
		marginTop: 20,
	},
	cardInput: {
		marginTop: 15,
	},
});

export default Add;
