import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput.component";

const AllExpenses = () => {
  return (
    <View style={styles.rootContainer}>
      <ExpensesOutput />
    </View>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
