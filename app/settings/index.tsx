import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import Section from '../../components/common/section/Section';
import ActionButton from '../../components/common/buttons/actionButton/actionButton';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dialog, Portal } from 'react-native-paper';

const Settings = () => {
	const router = useRouter();

	const [visible, setVisible] = React.useState(false);

	const hideDialog = () => setVisible(false);

	return (
		<View style={{ flex: 1 }}>
			<Stack.Screen
				options={{
					headerStyle: {
						backgroundColor: COLORS.grayBackground,
					},
					headerTitle: 'App Settings',
					headerTitleStyle: {
						fontWeight: '500',
					},
					headerShown: true,
					headerTintColor: COLORS.Black,
				}}
			/>

			<Section title={'PERMISSIONS'}>
				<ActionButton
					onPress={() => router.navigate('/settings/notifications')}
					title={'Notification preferences'}
					icon={
						<Entypo
							name='notification'
							size={20}
							color='black'
						/>
					}
				/>
			</Section>

			<View>
				<Portal>
					<Dialog
						visible={visible}
						onDismiss={hideDialog}>
						<Dialog.Icon icon='close' />
						<Dialog.Title
							style={{
								fontSize: 16,
								fontWeight: '500',
								textAlign: 'center',
							}}>
							Close Account Confirmation
						</Dialog.Title>

						<Dialog.Content>
							<Text>Are you sure you want to close your account?</Text>
						</Dialog.Content>

						<Dialog.Actions style={{ justifyContent: 'center' }}>
							<TouchableOpacity
								style={{
									backgroundColor: COLORS.Red,
									padding: 10,
									borderRadius: 5,
								}}>
								<Text style={{ color: COLORS.White }}>Close Account</Text>
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

			<Section title={'ACCOUNT CLOSURE'}>
				<ActionButton
					onPress={() => setVisible(true)}
					title={'Close Account'}
					icon={
						<MaterialCommunityIcons
							name='account'
							size={20}
							color='black'
						/>
					}
				/>
			</Section>
		</View>
	);
};

export default Settings;
