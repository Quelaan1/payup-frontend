import { Text, TouchableWithoutFeedback, View } from 'react-native';
import CustomHeaderLayout from '../../components/common/customHeaderLayout/customHeaderLayout';
import { COLORS } from '../../constants';
import React, { useRef, useState } from 'react';
import Section from '../../components/common/section/Section';
import { Userpic } from 'react-native-userpic';
import ActionButton from '../../components/common/buttons/actionButton/actionButton';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import AddPayee from '../../components/payee/addPayee/addPayee';
import { useAppSelector } from '../../redux/hooks';

const Select = () => {
	const router = useRouter();

	const payees = useAppSelector((state) => state.payee.payees);

	const [addPayee, setAddPayee] = useState(false);

	const slideDownRef: React.MutableRefObject<any> =
		useRef<() => void | undefined>();
	const slideUpRef: React.MutableRefObject<any> =
		useRef<() => void | undefined>();

	const handleOutsidePress = () => {
		if (addPayee && slideDownRef.current) {
			slideDownRef.current(); // Call slideDown from the parent
		}
	};

	const slideUp = () => {
		if (slideUpRef.current) {
			slideUpRef.current(); // Call slideUp from the parent
		}
	};

	return (
		<CustomHeaderLayout handleOutsidePress={handleOutsidePress}>
			<View>
				<View
					style={{
						backgroundColor: COLORS.Black,
						paddingLeft: 20,
					}}>
					<Text
						style={{
							color: COLORS.White,
							fontSize: 18,
							fontWeight: 'bold',
							paddingBottom: 1,
						}}>
						Pay to bank or UPI
					</Text>

					<Text
						style={{
							color: COLORS.Gray,
							fontSize: 14,
							paddingBottom: 10,
						}}>
						Send money to any mobile number or UPI ID
					</Text>
				</View>

				<Section
					title={'Payees'}
					actionButtonWithLogo={
						<AntDesign
							name='adduser'
							size={20}
							color='black'
						/>
					}
					actionButtonWithLogoOnPress={() => slideUp()}
					style={{
						gap: 12,
					}}>
					{payees.map((payee) => (
						<ActionButton
							key={payee.payee_id}
							title={payee.name}
							description={payee.lastPaid}
							onPress={() => router.push(`/payees/${payee.payee_id}/transfer`)}
							icon={
								<Userpic
									name={payee.name}
									radius={4}
									size={34}
									color={'transparent'}
									textStyle={{ color: COLORS.Black, fontSize: 14 }}
								/>
							}
						/>
					))}
				</Section>
			</View>

			<AddPayee
				addPayee={addPayee}
				setAddPayee={setAddPayee}
				slideDownRef={slideDownRef}
				slideUpRef={slideUpRef}
			/>
		</CustomHeaderLayout>
	);
};

export default Select;
