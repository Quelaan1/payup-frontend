import React, { useState, useRef, MutableRefObject } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS } from "../../constants";
import Section from "../../components/common/section/Section";
import ActionButton from "../../components/common/buttons/actionButton/actionButton";
import AddPayee from "../../components/payee/addPayee/addPayee";
import { CommonButton } from "../../components";

interface Payee {
  name: string;
  accountNumber: string;
  bankName: string;
}

const payees: Payee[] = [
  {
    name: "John Doe",
    accountNumber: "123456789",
    bankName: "Chase",
  },
  {
    name: "Jane Doe",
    accountNumber: "987654321",
    bankName: "Bank of America",
  },
];

const Manage = () => {
  const router = useRouter();

  const [addPayee, setAddPayee] = useState(false);

  const slideDownRef: React.MutableRefObject<any> =
    useRef<() => void | undefined>();
  const slideUpRef: React.MutableRefObject<any> =
    useRef<() => void | undefined>();

  const handleOutsidePress = () => {
    if (addPayee && slideDownRef.current) {
      slideDownRef.current(); // Call slideDown from the parent
    }
  };

  const slideUp = () => {
    if (slideUpRef.current) {
      slideUpRef.current(); // Call slideUp from the parent
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: addPayee
                ? "rgba(0, 0, 0, 0.8)"
                : COLORS.grayBackground,
            },
            headerTitle: "Manage Payees",
            headerShown: true,
          }}
        />
        <Section title={"Payees"}>
          <View style={{ gap: 10 }}>
            {payees.map((payee, index) => (
              <ActionButton
                onPress={() => {
                  router.push("/payees/1/profile");
                }}
                key={index}
                title={payee.name}
                description={
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.bankName}>{payee.bankName}</Text>
                    <Text style={styles.dot}>·</Text>
                    <Text style={styles.accountNumber}>
                      {payee.accountNumber.slice(-4)}
                    </Text>
                  </View>
                }
              />
            ))}
          </View>
        </Section>

        {!addPayee && (
          <View
            style={{
              marginHorizontal: 20,
              position: "absolute",
              alignSelf: "center",
              bottom: 40,
            }}
          >
            <CommonButton text={"Add a payee"} onPress={slideUp} />
          </View>
        )}

        <AddPayee
          addPayee={addPayee}
          setAddPayee={setAddPayee}
          slideDownRef={slideDownRef}
          slideUpRef={slideUpRef}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bankName: {
    fontSize: 14,
    color: "black",
  },
  dot: {
    fontSize: 14,
    color: "black",
    marginHorizontal: 5,
  },
  accountNumber: {
    fontSize: 14,
    color: "black",
  },
});

export default Manage;
