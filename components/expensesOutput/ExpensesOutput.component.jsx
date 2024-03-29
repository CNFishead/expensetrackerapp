import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpenseItem from "../expenseItem/ExpenseItem.component";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import ExpensesSummary from "../expensesSummary/ExpensesSummary.component";
import colors from "../../constants/colors";
import NoExpensesText from "../noExpensesText/NoExpensesText.component";
import formatCurrency from "../../util/formatCurrency";
import LoadingOverlay from "../loadingOverlay/LoadingOverlay.component";

const ExpensesOutput = ({ items, periodName, loading, onRefresh }) => {
  if (loading) {
    return (
      <View style={styles.rootContainer}>
        <ExpensesSummary
          periodName={periodName ?? "All Expenses"}
          sum={formatCurrency(
            items
              ?.reduce((acc, item) => {
                return acc + item.amount;
              }, 0)
              .toFixed(2)
          )}
        />
        <LoadingOverlay />
      </View>
    );
  }
  return (
    <View style={styles.rootContainer}>
      <ExpensesSummary
        periodName={periodName ?? "All Expenses"}
        sum={formatCurrency(
          items
            ?.reduce((acc, item) => {
              return acc + item.amount;
            }, 0)
            .toFixed(2)
        )}
      />
      {items?.length === 0 && <NoExpensesText>No Expenses Found</NoExpensesText>}
      <FlatList
        data={items}
        renderItem={({ item }) => <ExpenseItem item={item} />}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
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
