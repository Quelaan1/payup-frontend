import { Stack, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import commonStyles from '../../styles/common';
import React, { useEffect } from 'react';
import ErrorAlert from '../../components/common/alerts/errorAlerts';
import { COLORS, ICONS, IMAGES } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	deleteAllDevices,
	deleteDevice,
	getAllDevices,
} from '../../utils/apis/device/device';
import { handleInitialRegistration } from '../../utils/initialRegistration/initialRegistration';
import { useAppSelector } from '../../redux/hooks';
import { Image } from 'expo-image';

function timeAgo(dateString: Date | undefined) {
	if (!dateString) {
		return 'Unknown';
	}

	const now = new Date();
	const past = new Date(dateString);
	// @ts-ignore
	const diff = now - past;

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);
	const years = Math.floor(months / 12);

	if (years > 0) {
		return `${years} years ago`;
	} else if (months > 0) {
		return `${months} months ago`;
	} else if (days > 0) {
		return `${days} days ago`;
	} else if (hours > 0) {
		return `${hours} hours ago`;
	} else if (minutes > 0) {
		return `${minutes} minutes ago`;
	} else {
		return `${seconds} seconds ago`;
	}
}

const MultiDevice = () => {
	const router = useRouter();

	const [error, setError] = React.useState<string | undefined>(undefined);
	const [devices, setDevices] = React.useState<Device[]>([]);
	const { user_id, kyc_complete, kyc_pan } = useAppSelector(
		(state) => state.profile
	);

	useEffect(() => {
		const fetchDevices = async () => {
			try {
				const response = await getAllDevices();

				console.log(response);

				setDevices(response);
			} catch (error: any) {
				if (typeof error === 'string') setError(error);
			}
		};

		fetchDevices();
	}, []);

	const handleDeviceLogout = async (deviceId: string) => {
		try {
			const response = await deleteDevice(deviceId);

			if (response === 'Device deleted successfully') {
				await handleInitialRegistration(user_id);

				if (kyc_complete) {
					router.replace('/auth/secure-app');
					return;
				} else if (!kyc_complete && kyc_pan) {
					router.replace('/onboard/aadhaar');
					return;
				}

				// Redirect to next screen
				router.replace('/onboard/pan');
			}
		} catch (error: any) {
			setError(error);
		}
	};

	const handleAllDevicesLogout = async () => {
		try {
			const response = await deleteAllDevices();

			if (response === 'All devices deleted successfully') {
				await handleInitialRegistration(user_id);

				if (kyc_complete) {
					router.replace('/auth/secure-app');
					return;
				} else if (!kyc_complete && kyc_pan) {
					router.replace('/onboard/aadhaar');
					return;
				}

				// Redirect to next screen
				router.replace('/onboard/pan');
			}
		} catch (error: any) {
			setError(error);
		}
	};

	return (
		<SafeAreaView
			style={{
				...commonStyles.container,
				backgroundColor: COLORS.grayBackground,
				justifyContent: 'flex-start',
			}}>
			<Stack.Screen
				options={{
					headerShown: false,
				}}
			/>
			<View
				style={{
					alignItems: 'center',
					marginBottom: 50,
				}}>
				{/* <IMAGES.DeviceLimit
					width={304}
					height={304}
				/> */}

				<Image
					source={require('../../assets/images/device_limit.png')}
					style={{
						width: 304,
						height: 304,
						marginBottom: 20,
					}}
				/>

				<Text
					style={{ fontSize: 24, fontWeight: '500', color: COLORS.secondary }}>
					{'Login pending, device limit reached'}
				</Text>
			</View>

			<View
				style={{
					borderRadius: 6,
					paddingHorizontal: 20,
					paddingBottom: 20,
					backgroundColor: COLORS.White,
				}}>
				{devices &&
					devices.map((device, index) => {
						return (
							<View
								key={index}
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
								}}>
								<View
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										gap: 10,
									}}>
									<ICONS.iphone width={32} />

									<View>
										<Text style={{ fontSize: 18 }}>{device.device_id}</Text>
										<Text
											style={{
												fontSize: 12,
												color: COLORS.DarkGray20,
											}}>
											Last used: {timeAgo(device.last_used)}
										</Text>
									</View>
								</View>

								<TouchableOpacity
									onPress={() => handleDeviceLogout(device.device_id)}
									style={{
										borderRadius: 4,
										backgroundColor: COLORS.Black,
										padding: 6,
										paddingHorizontal: 12,
										maxWidth: 100,
									}}>
									<Text style={{ color: COLORS.White, lineHeight: 16 }}>
										Log out
									</Text>
								</TouchableOpacity>
							</View>
						);
					})}

				<TouchableOpacity
					onPress={handleAllDevicesLogout}
					style={{
						borderRadius: 4,
						backgroundColor: COLORS.Black,
						padding: 6,
						paddingHorizontal: 12,
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignSelf: 'center',
						marginTop: 30,
					}}>
					<Text style={{ color: COLORS.White, lineHeight: 16 }}>
						Log out all devices
					</Text>
				</TouchableOpacity>
			</View>

			{error && (
				<ErrorAlert
					errorMessage={error}
					setErrorMessage={setError}
				/>
			)}
		</SafeAreaView>
	);
};

export default MultiDevice;
