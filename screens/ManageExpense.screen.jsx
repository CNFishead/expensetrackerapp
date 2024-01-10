import React, { useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, View, TextInput } from "react-native";
import IconButton from "../components/iconButton/IconButton.component";
import colors from "../constants/colors";
import Button from "../components/button/Button.component";
import { addExpense, removeExpense, updateExpense } from "../redux/reducers/expensesReducer";
import { useDispatch } from "react-redux";
import Input from "../components/input/Input.component";
import moment from "moment";

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
      // check if the form is valid
      // if not, show an error message
      // if valid, then add the expense
      if (!form.title || !form.amount || !form.date) {
        Alert.alert("Invalid Form", "Please fill out all fields.");
        return;
      }
      if (isNaN(parseFloat(form.amount))) {
        Alert.alert("Invalid Form", "Please enter a valid amount.");
        return;
      }
      // use moment to check if the date is valid
      if (!moment(form.date).isValid()) {
        Alert.alert("Invalid Form", "Please enter a valid date.");
        return;
      }
      dispatch(
        addExpense({ title: form.title, amount: parseFloat(form.amount), date: new Date(form.date).toDateString() })
      );
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

  const [form, setForm] = React.useState({
    title: "",
    amount: "", // number, but stored as string
    date: "",
  });

  const handleFormChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (expenseId) {
      // get the expense from the redux store
      // set the form to the expense
    }
  }, [expenseId]);
  return (
    <View style={styles.rootContainer}>
      <View style={styles.formContainer}>
        <View style={styles.group}>
          <Input
            label="Amount"
            textInputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: (val) => handleFormChange("amount", val),
              value: form.amount,
            }}
            style={{ flex: 0.5 }}
          />
          <Input
            label="Date"
            textInputConfig={{
              placeholder: "YYYY-MM-DD",
              maxLength: 10,
              onChangeText: (val) => handleFormChange("date", val),
            }}
            style={{ flex: 0.5 }}
          />
        </View>
        <Input
          label="Description"
          textInputConfig={{
            keyboardType: "default",
            multiline: true,
            onChangeText: (val) => handleFormChange("title", val),
            value: form.title,
          }}
        />
      </View>
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
    padding: 8,
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  formContainer: {
    flex: 1,
  },
  group: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary200,
    marginBottom: 16,
    marginHorizontal: 8,
    padding: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
