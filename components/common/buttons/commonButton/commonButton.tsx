import React from 'react';
import styles from './commonButton.style';
import {
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
} from 'react-native';
import * as Haptics from 'expo-haptics';

interface Props extends TouchableOpacityProps {
	text: string;
	onPress: () => void;
	type?: 'Primary' | 'Secondary';
}

const CommonButton = ({
	text,
	onPress,
	type = 'Primary',
	...touchInputProps
}: Props): React.JSX.Element => {
	return (
		<View style={styles.buttonContainer}>
			<TouchableOpacity
				{...touchInputProps}
				style={type === 'Primary' ? styles.button : styles.filledButton}
				onPress={() => {
					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
					onPress();
				}}>
				<Text
					style={{
						...styles.buttonText,
						color: type === 'Primary' ? 'white' : 'black',
					}}>
					{text}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default CommonButton;
