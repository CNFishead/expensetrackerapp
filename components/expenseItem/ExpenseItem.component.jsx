import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";
import { getFormattedDate } from "../../util/date";

const ExpenseItem = ({ item }) => {
  return (
    <Pressable style={styles.rootContainer}>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{item.title}</Text>
          <Text style={[styles.textBase]}>{getFormattedDate(item.date)}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={[styles.textBase, styles.amount]}>{item.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  rootContainer: {},
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRaidus: 10,
    elevation: 5,
    shadowColor: colors.gray500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
  },
  textBase: {
    color: colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  priceContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    minWidth: 80,
  },
  amount: {
    color: colors.primary500,
    fontWeight: "bold",
  },
});
