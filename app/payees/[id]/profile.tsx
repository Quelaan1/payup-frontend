import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CustomHeaderLayout from '../../../components/common/customHeaderLayout/customHeaderLayout';
import Section from '../../../components/common/section/Section';
import ActionButton from '../../../components/common/buttons/actionButton/actionButton';
import { Userpic } from 'react-native-userpic';
import { AntDesign } from '@expo/vector-icons';
import { Dialog, Portal } from 'react-native-paper';
import { useAppSelector } from '../../../redux/hooks';
import { useLocalSearchParams } from 'expo-router';

interface InfoRowProps {
	// @ts-ignore
	iconName: GLYPHS;
	iconSize: number;
	label: string;
	value: string;
}

const InfoRow = ({ iconName, iconSize, label, value }: InfoRowProps) => (
	<View style={styles.infoBox}>
		<View style={styles.iconWrapper}>
			<FontAwesome
				name={iconName}
				size={iconSize}
				color={COLORS.Black}
			/>
		</View>

		<View>
			<Text style={styles.labelText}>{label}</Text>
			<Text style={styles.valueText}>{value}</Text>
		</View>
	</View>
);

const Profile = () => {
	const payee_id = useLocalSearchParams().id;

	const payee: Payee = useAppSelector((state) => state.payee.payees).filter(
		(payee) => payee.payee_id === payee_id
	)[0];

	const [visible, setVisible] = React.useState(false);

	const hideDialog = () => setVisible(false);

	return (
		<CustomHeaderLayout>
			<View>
				<View style={styles.header}>
					<Userpic
						name={payee.name}
						size={50}
						radius={4}
					/>
					<Text style={styles.userName}>John Doe</Text>
				</View>

				<Section title={'PAYMENT DETAILS'}>
					<View style={styles.sectionContent}>
						<InfoRow
							iconName='bank'
							iconSize={20}
							label='Account number'
							value={payee.accountNumber}
						/>

						<InfoRow
							iconName='phone'
							iconSize={24}
							label='Phone number'
							value={payee.phoneNumber}
						/>
					</View>
				</Section>

				<Section title={'MORE ACTIONS'}>
					<View style={styles.sectionContent}>
						<ActionButton
							icon={
								<FontAwesome
									name='send'
									size={18}
									color='black'
								/>
							}
							title={'Transfer money'}
						/>

						<ActionButton
							icon={
								<AntDesign
									name='deleteuser'
									size={19}
									color='black'
								/>
							}
							title={'Delete this payee'}
							onPress={() => setVisible(true)}
						/>
					</View>
				</Section>

				<View>
					<Portal>
						<Dialog
							visible={visible}
							onDismiss={hideDialog}>
							<Dialog.Icon icon='delete' />
							<Dialog.Title
								style={{
									fontSize: 16,
									fontWeight: '500',
									textAlign: 'center',
								}}>
								Delete Confirmation
							</Dialog.Title>

							<Dialog.Content>
								<Text>Are you sure you want to delete this card?</Text>
							</Dialog.Content>

							<Dialog.Actions style={{ justifyContent: 'center' }}>
								<TouchableOpacity
									style={{
										backgroundColor: COLORS.Red,
										padding: 10,
										borderRadius: 5,
									}}>
									<Text style={{ color: COLORS.White }}>Delete</Text>
								</TouchableOpacity>

								<TouchableOpacity
									style={{
										backgroundColor: COLORS.White,
										padding: 10,
										borderRadius: 5,
									}}
									onPress={hideDialog}>
									<Text style={{ color: COLORS.Black }}>Cancel</Text>
								</TouchableOpacity>
							</Dialog.Actions>
						</Dialog>
					</Portal>
				</View>
			</View>
		</CustomHeaderLayout>
	);
};

const styles = StyleSheet.create({
	header: {
		backgroundColor: COLORS.Black,
		paddingVertical: 20,
		alignItems: 'center',
		gap: 10,
	},
	userName: {
		color: COLORS.White,
		textAlign: 'center',
		fontSize: 18,
		fontWeight: '600',
	},
	sectionContent: {
		gap: 10,
	},
	infoBox: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		backgroundColor: COLORS.White,
		paddingVertical: 14,
		borderRadius: 4,
		marginHorizontal: 20,
	},
	iconWrapper: {
		width: 30,
	},
	labelText: {
		color: COLORS.DarkGray,
		fontSize: 11,
	},
	valueText: {
		color: COLORS.Black,
	},
});

export default Profile;
