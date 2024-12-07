import React from "react";
import {
  View,
  Text,
  TextInputProps,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import slideUpModalStyles from "./slideUpModal.style";
import InputBox from "../inputBox/inputBox";
import CommonButton from "../buttons/commonButton/commonButton";

interface Props extends TextInputProps {
  visible: boolean;
  Title: string;
  Placeholder: string;
  ButtonText: string;
  error: string | null;
  loading: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  onSubmit: (value: string) => void;
  onClose: () => void;
  validator?: (text: string) => boolean | string;
  disabled?: boolean;
}

const SlideUpModal = ({
  visible,
  Title,
  Placeholder,
  ButtonText,
  error,
  loading,
  inputValue,
  setInputValue,
  onSubmit,
  onClose,
  validator,
  disabled,
  ...textInputProps
}: Props): React.JSX.Element => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Pressable style={slideUpModalStyles.backdrop} onPress={onClose}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View style={[slideUpModalStyles.modal, { height: 300 }]}>
              <Text style={slideUpModalStyles.text}>{Title}</Text>

              <View style={slideUpModalStyles.inputContainer}>
                <InputBox
                  error={error}
                  placeholder={Placeholder}
                  value={inputValue}
                  onChangeText={setInputValue}
                  onSubmitEditing={() => onSubmit(inputValue)}
                  autoFocus={true}
                  autoComplete="email"
                  validator={validator}
                  {...textInputProps}
                />
              </View>

              <View style={slideUpModalStyles.buttonContainer}>
                <CommonButton
                  disabled={disabled}
                  text={ButtonText}
                  onPress={() => onSubmit(inputValue)}
                  loading={loading}
                />
              </View>
            </View>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default SlideUpModal;
