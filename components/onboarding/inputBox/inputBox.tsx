import { TextInput, View, ImageSourcePropType } from "react-native";
import Styles from "./inputBox.style";
import { KeyboardType } from "react-native/Libraries/Components/TextInput/TextInput";
import React from "react";
import { images } from "../../../constants";

interface Props {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  keyboardType: KeyboardType;
  ImagePath: any;
}

const InputBox = ({
  placeholder,
  ImagePath,
  keyboardType,
  onChange,
  value,
}: Props): React.JSX.Element => {
  return (
    <View style={Styles.container}>
      <TextInput
        style={Styles.input}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />

      <ImagePath width={30} height={30} style={Styles.Image} />
    </View>
  );
};

export default InputBox;
