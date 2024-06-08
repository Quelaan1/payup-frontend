import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import * as Notifications from 'expo-notifications';
import { handleNotificationToken } from '../notifications/notificationsHandler';
import {
	getValueFromSecureStoreAsync,
	saveValueToSecureStore,
} from '../expo-store/expo-store';
import { updateDeviceToken } from '../apis/deviceToken/deviceToken';
import DeviceInfo from 'react-native-device-info';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

export default function useNotification() {
	const firstLaunch = useAppSelector((state) => state.app.firstLaunch);
	const [notification, setNotification] = useState<
		Notifications.Notification | undefined
	>(undefined);
	const notificationListener = useRef<Notifications.Subscription>();
	const responseListener = useRef<Notifications.Subscription>();
	const pushTokenListener = useRef<Notifications.Subscription>();
	const { user_id } = useAppSelector((state) => state.profile);

	// Handle push notification ---------------------------------------
	const handlePushNotification = async () => {
		const device_id = await DeviceInfo.getUniqueId();

		handleNotificationToken(); // Checks if token is changed

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				console.log('Notification: ', notification.request.content);
				setNotification(notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log('Response: ', response.notification.request.content);
			});

		pushTokenListener.current = Notifications.addPushTokenListener(
			async (data) => {
				const token = data.data;

				const savedToken = await getValueFromSecureStoreAsync('expoPushToken');

				if (token && token !== savedToken) {
					await saveValueToSecureStore('expoPushToken', token);

					const deviceTokenData = {
						device_id: device_id,
						token: token,
						token_purpose: 'push_notification',
					};

					try {
						await updateDeviceToken(deviceTokenData);
					} catch (error) {}
				}
			}
		);
	};

	useEffect(() => {
		if (!firstLaunch && user_id) {
			handlePushNotification();
		}

		return () => {
			if (notificationListener.current) {
				Notifications.removeNotificationSubscription(
					notificationListener.current
				);
			}
			if (responseListener.current) {
				Notifications.removeNotificationSubscription(responseListener.current);
			}
			if (pushTokenListener.current) {
				Notifications.removePushTokenSubscription(pushTokenListener.current);
			}
		};
	}, []);
	// ----------------------------------------------------------------
}
