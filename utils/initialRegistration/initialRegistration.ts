import * as Device from 'expo-device';
import { registerDevice } from '../apis/device/device';
import { registerForPushNotificationsAsync } from '../notifications/notificationsHandler';
import { saveValueToSecureStore } from '../expo-store/expo-store';
import { createDeviceToken } from '../apis/deviceToken/deviceToken';
import DeviceInfo from 'react-native-device-info';

export const handleInitialRegistration = async (user_id: string) => {
	const device_id = await DeviceInfo.getUniqueId();

	const deviceData = {
		user_id: user_id,
		device_id: device_id,
		device_type: Device.osName ?? '',
	};

	try {
		await registerDevice(deviceData);
	} catch (error) {}

	await registerForPushNotificationsAsync().then(async (token) => {
		await saveValueToSecureStore('expoPushToken', token ?? '');

		if (token) {
			const deviceTokenData = {
				device_id: device_id,
				token: token,
				token_purpose: 'push_notification',
			};

			try {
				await createDeviceToken(deviceTokenData);
			} catch (error) {}
		}
	});
};
