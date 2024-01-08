import React from "react";
import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import IconButton from "../components/iconButton/IconButton.component";
import colors from "../constants/colors";
import Button from "../components/button/Button.component";
import { addExpense, removeExpense, updateExpense } from "../redux/reducers/expensesReducer";
import { useDispatch } from "react-redux";

const ManageExpense = ({ route, navigation }) => {
  const { expenseId } = route.params;
  const dispatch = useDispatch();

  const handleDelete = (nav) => {
    // show a confirmation modal
    // if user confirms, then delete the expense
    // if user cancels, then do nothing
    Alert.alert("Delete Expense", "Are you sure you want to delete this expense?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          // delete the expense
          dispatch(removeExpense(expenseId));
          nav.goBack();
        },
      },
    ]);
  };
  const cancelHandler = () => {
    // close the modal
    navigation.goBack();
  };
  const confirmHandler = () => {
    // update or add the expense
    // if expenseId exists, then update the expense
    // otherwise, add the expense
    if (expenseId) {
      dispatch(
        updateExpense({
          item: { id: expenseId, title: "test!!!", amount: 29.93, date: new Date("2022-23-4") },
        })
      );
    } else {
      dispatch(addExpense({ title: "test", amount: 99.93, date: new Date("2022-23-4") }));
    }

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
