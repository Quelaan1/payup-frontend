import { Text, View } from 'react-native';
import { CommonButton } from '../../components';
import { useAppDispatch } from '../../redux/hooks';
import * as LocalAuthentication from 'expo-local-authentication';
import { setUnlocked } from '../../redux/slices/profileSlice';
import { useRouter } from 'expo-router';

const LoginFailed = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleAuthenticate = async () => {
		const result = await LocalAuthentication.authenticateAsync({
			promptMessage: 'Login with Biometrics',
		});

		if (result.success) {
			dispatch(setUnlocked(true));
			router.replace('/');
		}
	};

	return (
		<View>
			<Text>Access your account securely</Text>

			<Text>
				To protect your data you can only access the app when it's unlocked
			</Text>

			<CommonButton
				text='Unlock app'
				onPress={handleAuthenticate}
			/>
		</View>
	);
};

export default LoginFailed;
