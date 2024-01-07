import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput.component";
import { useSelector } from "react-redux";

const AllExpenses = () => {
  const { expenses } = useSelector((state) => state.expenses);

  return (
    <View style={styles.rootContainer}>
      <ExpensesOutput items={expenses} />
    </View>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
