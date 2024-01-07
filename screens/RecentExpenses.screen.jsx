import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput.component";
import { useSelector } from "react-redux";

const RecentExpenses = () => {
  const { expenses } = useSelector((state) => state.expenses);
  return (
    <View style={styles.rootContainer}>
      <ExpensesOutput periodName={"Last 7 Days"} items={expenses} />
    </View>
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
