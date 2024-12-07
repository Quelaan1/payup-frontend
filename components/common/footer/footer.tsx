import React from "react";
import { Text, View } from "react-native";
import Styles from "./footer.style";

const Footer = (): React.JSX.Element => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>
        By continuing you accept{" "}
        <Text style={Styles.subtext}>Terms & Conditions</Text> and{" "}
        <Text style={Styles.subtext}>Privacy Policy</Text> and authorize{" "}
        <Text style={Styles.subtext}>PayUp</Text> to send WhatsApp messages.
      </Text>
    </View>
  );
};

export default Footer;
