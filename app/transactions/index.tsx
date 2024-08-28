import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomHeaderLayout from "../../components/common/customHeaderLayout/customHeaderLayout";
import { COLORS } from "../../constants";
import { Userpic } from "react-native-userpic";
import ActionButton from "../../components/common/buttons/actionButton/actionButton";
import Section from "../../components/common/section/Section";
import moment from "moment";

const data: Transactions = {
  "March 2024": [
    {
      id: 3,
      name: "Tilak Kumar G",
      date: "2024-03-01",
      amount: 1000,
    },
    {
      id: 4,
      name: "Tilak Kumar G",
      date: "2024-03-02",
      amount: 200,
    },
  ],

  "April 2024": [
    {
      id: 1,
      name: "Tilak Kumar G",
      date: "2024-04-01",
      amount: 1000,
    },
    {
      id: 2,
      name: "Tilak Kumar G",
      date: "2024-04-02",
      amount: 200,
    },
  ],

  "July 2024": [
    {
      id: 6,
      name: "Tilak Kumar G",
      date: "2024-07-28",
      amount: 1000,
    },
    {
      id: 7,
      name: "Tilak Kumar G",
      date: "2024-07-28",
      amount: 200,
    },
    {
      id: 8,
      name: "Tilak Kumar G",
      date: "2024-07-27",
      amount: 200,
    },
  ],
};

const Transactions = () => {
  const months = Object.keys(data);
  const [selectedMonth, setSelectedMonth] = useState("April 2024");

  const handlePreviousMonth = () => {
    const currentIndex = months.indexOf(selectedMonth);
    if (currentIndex > 0) {
      setSelectedMonth(months[currentIndex - 1]);
    }
  };

  const handleNextMonth = () => {
    const currentIndex = months.indexOf(selectedMonth);
    if (currentIndex < months.length - 1) {
      setSelectedMonth(months[currentIndex + 1]);
    }
  };

  const categorizeTransactions = (transactions: Transaction[]) => {
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "day").startOf("day");

    return transactions.reduce(
      (acc: Transactions, transaction: Transaction) => {
        const transactionDate = moment(transaction.date);

        let title;
        if (transactionDate.isSame(today, "day")) {
          title = "Today";
        } else if (transactionDate.isSame(yesterday, "day")) {
          title = "Yesterday";
        } else {
          title = transactionDate.format("ddd, D MMM YYYY");
        }

        if (!acc[title]) {
          acc[title] = [];
        }

        acc[title].push(transaction);
        return acc;
      },
      {},
    );
  };

  const transactionsByCategory = categorizeTransactions(data[selectedMonth]);

  return (
    <CustomHeaderLayout title={"All Transactions"}>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 7,
            paddingHorizontal: 20,
            backgroundColor: COLORS.muddyBackground,
          }}
        >
          <TouchableOpacity onPress={handlePreviousMonth}>
            <Ionicons name="chevron-back" size={22} color={COLORS.White} />
          </TouchableOpacity>

          <Text
            style={{
              color: COLORS.White,
              fontSize: 18,
            }}
          >
            {selectedMonth}
          </Text>

          <TouchableOpacity onPress={handleNextMonth}>
            <Ionicons name="chevron-forward" size={22} color={COLORS.White} />
          </TouchableOpacity>
        </View>

        <View style={{ gap: 10 }}>
          {Object.keys(transactionsByCategory).map((category) => (
            <Section key={category} title={category}>
              {transactionsByCategory[category].map((transaction) => (
                <ActionButton
                  key={transaction.id}
                  title={transaction.name}
                  description={transaction.date}
                  details={`₹${transaction.amount}`}
                  // onPress={() => router.push(`/payees/${payee.id}/transfer`)}
                  icon={
                    <Userpic
                      name={transaction.name}
                      radius={4}
                      size={34}
                      color={"transparent"}
                      textStyle={{ color: COLORS.Black, fontSize: 14 }}
                    />
                  }
                />
              ))}
            </Section>
          ))}
        </View>
      </View>
    </CustomHeaderLayout>
  );
};

export default Transactions;
