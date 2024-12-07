import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomHeaderLayout from "../../components/common/customHeaderLayout/customHeaderLayout";
import { COLORS } from "../../constants";
import { Avatar } from "@kolking/react-native-avatar";
import ActionButton from "../../components/common/buttons/actionButton/actionButton";
import Section from "../../components/common/section/Section";
import moment from "moment";
import { useAppSelector } from "../../redux/hooks";

const Transactions = () => {
  const transactions = useAppSelector(
    (state) => state.transaction.transactions
  );

  const months = Object.keys(transactions);
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
      {}
    );
  };

  // const transactionsByCategory = categorizeTransactions(
  //   transactions[selectedMonth],
  // );

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

        {/*<View style={{ gap: 10 }}>*/}
        {/*	{Object.keys(transactionsByCategory).map((category) => (*/}
        {/*		<Section*/}
        {/*			key={category}*/}
        {/*			title={category}>*/}
        {/*			{transactionsByCategory[category].map((transaction) => (*/}
        {/*				<ActionButton*/}
        {/*					key={transaction.transaction_id}*/}
        {/*					title={transaction.name}*/}
        {/*					description={transaction.date}*/}
        {/*					details={`₹${transaction.amount}`}*/}
        {/*					// onPress={() => router.push(`/payees/${payee.id}/transfer`)}*/}
        {/*					icon={*/}
        {/*						<Avatar*/}
        {/*							name={transaction.name}*/}
        {/*							radius={4}*/}
        {/*							size={34}*/}
        {/*							color={'transparent'}*/}
        {/*							textStyle={{ color: COLORS.Black, fontSize: 14 }}*/}
        {/*						/>*/}
        {/*					}*/}
        {/*				/>*/}
        {/*			))}*/}
        {/*		</Section>*/}
        {/*	))}*/}
        {/*</View>*/}
      </View>
    </CustomHeaderLayout>
  );
};

export default Transactions;
