import { TextInput, View, Text, TextInputProps } from 'react-native';
import styles from './inputBox.style';
import React, { memo } from 'react';
import { SvgProps } from 'react-native-svg';

interface Props extends TextInputProps {
	placeholder?: string;
	value?: string;
	onChangeText?: (text: string) => void;
	ImagePath?: React.FC<SvgProps>;
	error: string | null | undefined;
}

const InputBox = memo(function ({
	placeholder,
	ImagePath,
	onChangeText,
	value,
	error,
	...textInputProps
}: Props): React.JSX.Element {
	return (
		<View style={styles.container}>
			<View style={styles.InputContainer}>
				<TextInput
					testID='input-box'
					style={error ? styles.inputError : styles.input}
					onChangeText={onChangeText}
					value={value}
					placeholder={placeholder}
					{...textInputProps}
				/>

				{ImagePath && <ImagePath width={26} height={26} style={styles.image} />}
			</View>

			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
});

export default InputBox;
