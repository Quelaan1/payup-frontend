import {
  TextInput,
  View,
  Text,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import styles from "./inputBox.style";
import React, { SetStateAction, memo, useEffect, useState } from "react";
import { SvgProps } from "react-native-svg";

interface Props extends TextInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  ImagePath?: React.FC<SvgProps>;
  ImagePress?: () => void;
  error: string | null | undefined;
  setError?: (
    text: string | null
  ) => void | SetStateAction<string | null> | null;
  validator?: (text: string) => boolean | string;
  onValidation?: () => void;
  debounce?: boolean;
}

const InputBox = memo(function ({
  placeholder,
  ImagePath,
  ImagePress,
  onChangeText,
  value,
  error,
  setError,
  validator,
  onValidation,
  debounce = false,
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
        onValidation && onValidation();
      } else if (typeof isValid === "string") {
        setError && setError(isValid);
      }

      // Update the value regardless of validation outcome
      onChangeText && onChangeText(text);
    } else {
      // If no validator, simply update the value
      onChangeText && onChangeText(text);
    }
  };

  let debouncedSearchTerm: string | undefined;

  if (debounce) {
    debouncedSearchTerm = useDebounce(value as unknown as string, 0);
  }

  useEffect(() => {
    if (debouncedSearchTerm && debounce) {
      value && handleTextChange(value);
    }
  }, [debouncedSearchTerm]);

  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <TextInput
          testID="input-box"
          style={error ? styles.inputError : styles.input}
          onChangeText={handleTextChange}
          value={value}
          placeholder={placeholder}
          {...textInputProps}
        />

        {ImagePath && (
          <TouchableOpacity onPress={ImagePress} style={styles.image}>
            <ImagePath width={26} height={26} />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
});

export default InputBox;
