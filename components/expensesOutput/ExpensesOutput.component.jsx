import React from "react";
import { StyleSheet, View } from "react-native";
import ExpenseItem from "../expenseItem/ExpenseItem.component";
import { FlatList } from "react-native-gesture-handler";
import ExpensesSummary from "../expensesSummary/ExpensesSummary.component";
import colors from "../../constants/colors";

const DUMMY_ITEMS = [
  {
    id: "1",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "2",
    title: "pants",
    amount: 20.34,
    date: new Date(2022, 2, 28),
  },
  {
    id: "3",
    title: "Bannana",
    amount: 200.2,
    date: new Date(2021, 2, 28),
  },
  {
    id: "4",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "1a",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "2a",
    title: "pants",
    amount: 20.34,
    date: new Date(2022, 2, 28),
  },
  {
    id: "3a",
    title: "Bannana",
    amount: 200.2,
    date: new Date(2021, 2, 28),
  },
  {
    id: "4a",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
];
const ExpensesOutput = ({ items, periodName }) => {
  return (
    <View style={styles.rootContainer}>
      <ExpensesSummary
        periodName={periodName ?? "All Expenses"}
        sum={DUMMY_ITEMS.reduce((acc, item) => {
          return acc + item.amount;
        }, 0).toFixed(2)}
      />
      <FlatList
        data={DUMMY_ITEMS}
        renderItem={({ item }) => <ExpenseItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  rootContainer: {
    padding: 24,
    backgroundColor: colors.primary700,
    flex: 1,
  },
});
