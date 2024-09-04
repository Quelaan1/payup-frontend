import CustomHeaderLayout from '../../../components/common/customHeaderLayout/customHeaderLayout';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants';
import React, { useState } from 'react';
import { Userpic } from 'react-native-userpic';
import { Ionicons } from '@expo/vector-icons';
import { CommonButton } from '../../../components';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppSelector } from '../../../redux/hooks';

const Transfer = () => {
	const payee_id = useLocalSearchParams().id;

	const payee: Payee = useAppSelector((state) => state.payee.payees).filter(
		(payee) => payee.payee_id === payee_id
	)[0];

	const router = useRouter();

	const [amount, setAmount] = useState('₹0.00');

	const handlePress = (value: string) => {
		if (amount === '₹0.00' && value === 'backspace') {
			return;
		}

		if (value === 'backspace') {
			setAmount((prev) => {
				if (prev.length > 2) {
					return prev.slice(0, -1);
				} else {
					return '₹0.00';
				}
			});
		} else {
			setAmount((prev) => {
				if (prev === '₹0.00') {
					return '₹' + value;
				} else {
					return prev + value;
				}
			});
		}
	};

	const renderButton = (value: string) => {
		if (value === 'backspace') {
			return (
				<TouchableOpacity
					style={[styles.button, getBorderStyle(value)]}
					onPress={() => handlePress(value)}
					onLongPress={() => setAmount('₹0.00')}>
					<Ionicons
						name='backspace'
						size={36}
						color='black'
					/>
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity
					style={[styles.button, getBorderStyle(value)]}
					onPress={() => handlePress(value)}>
					<Text style={styles.buttonText}>{value}</Text>
				</TouchableOpacity>
			);
		}
	};

	const getBorderStyle = (value: string) => {
		switch (value) {
			case '1':
				return { borderRightWidth: 0.5 };
			case '2':
				return {};
			case '3':
				return { borderLeftWidth: 0.5 };
			case '4':
				return { borderTopWidth: 0.5, borderRightWidth: 0.5 };
			case '5':
				return { borderTopWidth: 0.5 };
			case '6':
				return { borderTopWidth: 0.5, borderLeftWidth: 0.5 };
			case '7':
				return { borderTopWidth: 0.5, borderRightWidth: 0.5 };
			case '8':
				return { borderTopWidth: 0.5 };
			case '9':
				return { borderTopWidth: 0.5, borderLeftWidth: 0.5 };
			case '0':
				return { borderTopWidth: 0.5, borderRightWidth: 0.5 };
			case '.':
				return { borderTopWidth: 0.5, borderRightWidth: 0.5 };
			case 'backspace':
				return { borderTopWidth: 0.5 };
			default:
				return {};
		}
	};

	const handleSend = () => {
		router.push('/payees/1/receipt');
	};

	return (
		<CustomHeaderLayout
			title={'Send Money'}
			headerTitleStyles={{
				color: COLORS.Black,
				fontSize: 18,
				fontWeight: 'bold',
			}}
			backgroundColor={COLORS.skinBackground}
			backColor={COLORS.Black}
			statusBarStyle={'dark'}>
			<View style={styles.content}>
				<View style={styles.header}>
					<Userpic
						name={payee.name}
						radius={55}
						size={108}
						color={'white'}
						textStyle={{ color: COLORS.Black }}
					/>
					<Text style={styles.nameText}>{payee.name}</Text>
				</View>

				<View style={styles.container}>
					<View style={styles.amountContainer}>
						<Text style={styles.amountText}>{amount}</Text>
					</View>

					<View style={styles.keypad}>
						{[
							'1',
							'2',
							'3',
							'4',
							'5',
							'6',
							'7',
							'8',
							'9',
							'.',
							'0',
							'backspace',
						].map((value) => (
							<View
								key={value}
								style={styles.key}>
								{renderButton(value)}
							</View>
						))}
					</View>
				</View>

				<View style={styles.buttonContainer}>
					<CommonButton
						text={'Send'}
						onPress={handleSend}
					/>
				</View>
			</View>
		</CustomHeaderLayout>
	);
};

const styles = StyleSheet.create({
	content: {
		flex: 1,
	},
	header: {
		backgroundColor: COLORS.skinBackground,
		paddingVertical: 20,
		gap: 10,
		alignItems: 'center',
	},
	nameText: {
		fontSize: 22,
		fontWeight: '600',
		color: COLORS.Black,
	},
	container: {
		alignItems: 'center',
		paddingTop: 20,
		paddingBottom: 10,
		backgroundColor: COLORS.White,
	},
	amountContainer: {
		borderBottomWidth: 0.5,
		borderColor: '#ccc',
		width: '70%',
		alignItems: 'center',
		marginBottom: 20,
	},
	amountText: {
		fontSize: 32,
		marginBottom: 10,
	},
	keypad: {
		justifyContent: 'center',
		width: '80%',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	key: {
		width: '30%',
		aspectRatio: 1,
	},
	button: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#ccc',
	},
	buttonText: {
		fontSize: 24,
		fontWeight: '600',
	},
	buttonContainer: {
		paddingHorizontal: 20,
		backgroundColor: COLORS.White,
	},
});

export default Transfer;
