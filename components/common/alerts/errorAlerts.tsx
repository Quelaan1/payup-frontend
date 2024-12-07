import { Text, View } from 'react-native';
import errorAlertStyles from './errorAlerts.style';
import { ICONS } from '../../../constants';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import * as Haptics from 'expo-haptics';

interface Props {
	errorMessage: string | undefined | null;
	setErrorMessage: (message: string | undefined) => void;
}

const ErrorAlert = ({ errorMessage, setErrorMessage }: Props) => {
	const leftWidth = useSharedValue(300); // Half of the container width for full border
	const rightWidth = useSharedValue(300); // Initial right width
	const duration = 3000; // Duration of the animation

	useEffect(() => {
		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

		// Animate both left and right widths to 0
		leftWidth.value = withTiming(0, {
			duration: duration,
			easing: Easing.linear,
		});
		rightWidth.value = withTiming(0, {
			duration: duration,
			easing: Easing.linear,
		});

		setTimeout(() => {
			setErrorMessage('');
		}, duration);
	}, []);

	const leftAnimatedStyle = useAnimatedStyle(() => {
		return {
			width: leftWidth.value,
		};
	});

	const rightAnimatedStyle = useAnimatedStyle(() => {
		return {
			width: rightWidth.value,
		};
	});

	return (
		<View style={errorAlertStyles.container}>
			<Animated.View style={[errorAlertStyles.errorContainer]}>
				<Animated.View
					style={[errorAlertStyles.borderStyle, leftAnimatedStyle]}
				/>
				<Animated.View
					style={[errorAlertStyles.borderStyle, rightAnimatedStyle]}
				/>

				<View style={errorAlertStyles.topContainer}>
					<ICONS.error
						height={50}
						width={50}
					/>
				</View>

				<View style={errorAlertStyles.bottomContainer}>
					<Text style={errorAlertStyles.text}>{errorMessage}</Text>
				</View>
			</Animated.View>
		</View>
	);
};

export default ErrorAlert;
