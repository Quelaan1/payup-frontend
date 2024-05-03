import React, { useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import styles from './loader.style';
import { COLORS } from '../../../constants';
import LoadingSpinner from './loadingSpinner';
import * as Progress from 'react-native-progress';
import { SvgProps } from 'react-native-svg';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

interface Props {
	ImagePath: React.FC<SvgProps>;
	Message: string;
}
const Loader = ({ ImagePath, Message }: Props): React.JSX.Element => {
	const height = useSharedValue(0);
	const duration = 500;

	useEffect(() => {
		height.value = withTiming(300, {
			duration: duration,
			easing: Easing.linear,
		});
	}, []);

	const heightStyle = useAnimatedStyle(() => {
		return {
			height: height.value,
		};
	});

	return (
		<Animated.View style={[styles.loader, heightStyle]}>
			<View>
				<ImagePath
					width={20}
					height={20}
				/>

				<View style={styles.spinnerContainer}>
					{Platform.OS === 'ios' ? (
						<LoadingSpinner color={COLORS.DarkGray} />
					) : (
						<Progress.CircleSnail
							size={40}
							color={[COLORS.DarkGray]}
						/>
					)}
				</View>
			</View>

			<Text style={styles.text}>{Message}</Text>
		</Animated.View>
	);
};

export default Loader;
