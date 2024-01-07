import React from "react";
import { StyleSheet, View } from "react-native";
import ExpenseItem from "../expenseItem/ExpenseItem.component";
import { FlatList } from "react-native-gesture-handler";
import ExpensesSummary from "../expensesSummary/ExpensesSummary.component";
import colors from "../../constants/colors";

const ExpensesOutput = ({ items, periodName }) => {
  return (
    <View style={styles.rootContainer}>
      <ExpensesSummary
        periodName={periodName ?? "All Expenses"}
        sum={items
          ?.reduce((acc, item) => {
            return acc + item.amount;
          }, 0)
          .toFixed(2)}
      />
      <FlatList data={items} renderItem={({ item }) => <ExpenseItem item={item} />} keyExtractor={(item) => item.id} />
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
