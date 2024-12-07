import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import {
	Keyboard,
	LayoutAnimation,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	UIManager,
	View,
} from 'react-native';
import { COLORS, ICONS } from '../../constants';
import { SwipeListView } from 'react-native-swipe-list-view';
import { List, IconButton, Dialog, Portal } from 'react-native-paper';
import { CommonButton } from '../../components';

if (Platform.OS === 'android') {
	if (UIManager.setLayoutAnimationEnabledExperimental) {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}
}

// Define the type for an item
interface Item {
	id: string;
	text: string;
	description: string;
	cardType: string;
}

const Manage: React.FC = () => {
	const router = useRouter();

	const [visible, setVisible] = React.useState(false);

	const hideDialog = () => setVisible(false);

	const [items, setItems] = useState<Item[]>([
		{
			id: '1',
			text: 'Kotak Mahindra Bank',
			description: 'Credit Card',
			cardType: 'Visa',
		},
		{
			id: '2',
			text: 'Kotak Mahindra Bank',
			description: 'Credit Card',
			cardType: 'Mastercard',
		},
		{
			id: '3',
			text: 'Kotak Mahindra Bank',
			description: 'Credit Card',
			cardType: 'Visa',
		},
		{
			id: '4',
			text: 'Kotak Mahindra Bank',
			description: 'Credit Card',
			cardType: 'Visa',
		},
		{
			id: '5',
			text: 'Kotak Mahindra Bank',
			description: 'Credit Card',
			cardType: 'Visa',
		},
	]);

	const deleteItem = (item: Item) => {
		const newItems = items.filter((i) => i !== item);
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setItems(newItems);
	};

	const renderItem = ({ item }: { item: Item }) => {
		return (
			<List.Item
				key={item.id}
				title={item.text}
				description={item.description}
				left={() => <List.Icon icon='credit-card' />}
				right={() => (
					<View style={{ flexDirection: 'row' }}>
						{item.cardType === 'Visa' ? (
							<ICONS.visa width={70} />
						) : (
							<ICONS.mastercard width={70} />
						)}
					</View>
				)}
				style={styles.listItem}
				titleStyle={styles.title}
			/>
		);
	};

	const renderHiddenItem = (
		data: { item: Item },
		rowMap: { [key: string]: any }
	) => (
		<View style={styles.hiddenContainer}>
			<View></View>

			<IconButton
				icon='trash-can-outline'
				iconColor='#c93c3c'
				size={32}
				onPress={() => {
					setVisible(true);
				}}
				style={[styles.iconButtonDelete]}
			/>
		</View>
	);

	return (
		<View
			style={{
				flex: 1,
				marginHorizontal: 20,
			}}>
			<Stack.Screen
				options={{
					headerStyle: {
						backgroundColor: COLORS.grayBackground,
					},
					headerTitle: 'Credit Cards',
					headerTitleStyle: {
						fontWeight: '500',
					},
					headerShown: true,
					headerTintColor: COLORS.Black,
				}}
			/>

			<View style={{ gap: 18 }}>
				<SwipeListView
					style={{
						marginTop: 10,
					}}
					closeOnScroll
					closeOnRowPress
					closeOnRowBeginSwipe
					keyExtractor={(item) => item.id.toString()}
					data={items}
					contentContainerStyle={{
						gap: 10,
					}}
					renderItem={renderItem}
					renderHiddenItem={renderHiddenItem}
					rightOpenValue={-100}
					disableRightSwipe
				/>

				<Text style={styles.swipeText}>Swipe left to delete</Text>
			</View>

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

			<View
				style={{
					marginHorizontal: 20,
					position: 'absolute',
					alignSelf: 'center',
					bottom: 40,
				}}>
				<CommonButton
					text={'Add a card'}
					onPress={() => {
						router.push('/cards/add');
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	listItem: {
		backgroundColor: COLORS.White,
		paddingHorizontal: 14,
		borderRadius: 4,
	},
	iconButtonDelete: {},
	title: {
		fontSize: 14,
		color: COLORS.Black,
	},
	hiddenContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		flex: 1,
	},
	button: {
		backgroundColor: '#0067ee',
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyText: {
		fontSize: 24,
		color: '#888',
	},
	swipeText: {
		fontSize: 12,
		color: '#888',
		textAlign: 'center',
	},
});

export default Manage;
