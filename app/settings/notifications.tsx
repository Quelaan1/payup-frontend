import { View } from 'react-native';
import { COLORS } from '../../constants';
import { Stack } from 'expo-router';
import React from 'react';
import Section from '../../components/common/section/Section';
import ActionSwitch from '../../components/common/buttons/actionSwitch/actionSwitch';
import {
	getNotificationPreferences,
	setNotificationPreferences,
} from '../../utils/apis/notifications/notifications';
import commonStyles from '../../styles/common';

type NotificationMethod = 'app_notifications';
type NotificationType = 'transactions';

const Notifications = () => {
	const [preferences, setPreferences] = React.useState({
		app_notifications: {
			transactions: false,
		},
	});

	const handleNotificationPreferencePress = async (
		notificationMethod: NotificationMethod,
		notificationType: NotificationType
	) => {
		const preferencesResponse = await setNotificationPreferences({
			...preferences,
			[notificationMethod]: {
				...preferences[notificationMethod],
				[notificationType]: !preferences[notificationMethod][notificationType],
			},
		});

		preferencesResponse &&
			setPreferences({
				...preferencesResponse,
			});
	};

	const fetchNotificationPreferences = async () => {
		const preferencesResponse = await getNotificationPreferences();

		preferencesResponse &&
			setPreferences({
				...preferencesResponse,
			});
	};

	React.useEffect(() => {
		fetchNotificationPreferences();
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<Stack.Screen
				options={{
					headerStyle: {
						backgroundColor: COLORS.grayBackground,
					},
					headerTitle: 'Notifications',
					headerTitleStyle: {
						fontWeight: '500',
					},
					headerShown: true,
					headerTintColor: COLORS.Black,
				}}
			/>

			<Section title={'APP NOTIFICATIONS'}>
				<ActionSwitch
					title={'Transactions'}
					isOn={preferences.app_notifications.transactions}
					onPress={() =>
						handleNotificationPreferencePress(
							'app_notifications',
							'transactions'
						)
					}
				/>
			</Section>
		</View>
	);
};

export default Notifications;
