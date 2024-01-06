import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput.component";

const RecentExpenses = () => {
  return (
    <View style={styles.rootContainer}>
      <ExpensesOutput periodName={"Last 7 Days"} />
    </View>
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
