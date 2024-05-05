import { TextInput, View, Text, TextInputProps } from 'react-native';
import styles from './inputBox.style';
import React, { SetStateAction, memo, useEffect, useState } from 'react';
import { SvgProps } from 'react-native-svg';

interface Props extends TextInputProps {
	placeholder?: string;
	value?: string;
	onChangeText?: (text: string) => void;
	ImagePath?: React.FC<SvgProps>;
	error: string | null | undefined;
	setError?: (
		text: string | null
	) => void | SetStateAction<string | null> | null;
	validator?: (text: string) => boolean | string;
	onValidation?: () => void;
}

const InputBox = memo(function ({
	placeholder,
	ImagePath,
	onChangeText,
	value,
	error,
	setError,
	validator,
	onValidation,
	...textInputProps
}: Props): React.JSX.Element {
	function useDebounce(value: string, delay: number) {
		// State to store the debounced value
		const [debouncedValue, setDebouncedValue] = useState(value);

		useEffect(() => {
			// Set debouncedValue to value (passed in) after the specified delay
			const handler = setTimeout(() => {
				setDebouncedValue(value);
			}, delay);

			// Return a cleanup function that will be called every time useEffect is re-called.
			return () => {
				clearTimeout(handler);
			};
		}, [value, delay]);

		return debouncedValue;
	}

	const handleTextChange = (text: string) => {
		if (validator) {
			const isValid = validator(text);
			if (isValid === true) {
				setError && setError(null);
				onChangeText && onChangeText(text);
				onValidation && onValidation();
			} else if (typeof isValid === 'string') {
				setError && setError(isValid);
				onChangeText && onChangeText(text);
			}
		} else {
			onChangeText && onChangeText(text);
		}
	};

	const debouncedSearchTerm = useDebounce(value as unknown as string, 1);

	useEffect(() => {
		if (debouncedSearchTerm) {
			value && handleTextChange(value);
		}
	}, [debouncedSearchTerm]);

	return (
		<View style={styles.container}>
			<View style={styles.InputContainer}>
				<TextInput
					testID='input-box'
					style={error ? styles.inputError : styles.input}
					onChangeText={handleTextChange}
					value={value}
					placeholder={placeholder}
					{...textInputProps}
				/>

				{ImagePath && (
					<ImagePath
						width={26}
						height={26}
						style={styles.image}
					/>
				)}
			</View>

			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
});

export default InputBox;
