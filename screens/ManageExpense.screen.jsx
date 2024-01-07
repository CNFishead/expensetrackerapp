import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import IconButton from "../components/iconButton/IconButton.component";
import colors from "../constants/colors";
import Button from "../components/button/Button.component";

const ManageExpense = ({ route, navigation }) => {
  const { expenseId } = route.params;

  const handleDelete = (nav) => {
    // show a confirmation modal
    // if user confirms, then delete the expense
    // if user cancels, then do nothing
    nav.goBack();
  };
  const cancelHandler = () => {
    // close the modal
    navigation.goBack();
  };
  const confirmHandler = () => {
    // save the expense
    navigation.goBack();
  };
  // if there is an expenseId, then we are editing an existing expense, change the title to "Edit Expense"
  // otherwise, we are creating a new expense, change the title to "Create Expense"
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: expenseId ? "Edit Expense" : "Create Expense",
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          {expenseId && (
            <IconButton
              icon="trash-outline"
              size={24}
              color={colors.primary50}
              onPress={() => {
                handleDelete(navigation);
              }}
            />
          )}
        </View>
      ),
    });
  }, [navigation, expenseId]);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.buttonContainer}>
        <Button mode="flat" onPress={cancelHandler} style={styles.buttonStyle}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.buttonStyle}>
          {expenseId ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.primary800,
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttonContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary200,
    marginBottom: 16,
    padding: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
