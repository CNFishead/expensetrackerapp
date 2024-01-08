import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";

const NoExpensesText = ({ children }) => {
  return (
    <View style={styles.noExpensesContainer}>
      <Text style={{ color: colors.primary100 }}>{children}</Text>
    </View>
  );
};

export default NoExpensesText;

const styles = StyleSheet.create({
  noExpensesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
