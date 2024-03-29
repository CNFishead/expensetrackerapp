import React, { useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, View, TextInput } from "react-native";
import IconButton from "../components/iconButton/IconButton.component";
import colors from "../constants/colors";
import Button from "../components/button/Button.component";
import { addExpense, removeExpense, updateExpense } from "../redux/reducers/expensesReducer";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/input/Input.component";
import moment from "moment";
import { deleteExpenseAxios, storeExpense, updateExpenseAxios } from "../util/http";
import LoadingOverlay from "../components/loadingOverlay/LoadingOverlay.component";
import ErrorOverlay from "../components/errorOverlay/ErrorOverlay.component";

const ManageExpense = ({ route, navigation }) => {
  const { expenseId } = route.params;
  const { expenses, loading } = useSelector((state) => state.expenses);
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
        onPress: async () => {
          // delete the expense
          const result = await dispatch(deleteExpenseAxios(expenseId));
          if (!result.error) {
            dispatch(removeExpense(expenseId));
            nav.goBack();
          } else {
            setShowErrorOverlay(true);
            setErrorMessage(result.message);
          }
        },
      },
    ]);
  };
  const cancelHandler = () => {
    // close the modal
    navigation.goBack();
  };
  const confirmHandler = async () => {
    // check if the form is valid
    // if not, show an error message
    // if valid, then add the expense
    if (!form.title || !form.amount || !form.date) {
      // Alert.alert("Invalid Form", "Please fill out all fields.");
      setError((prev) => ({
        ...prev,
        title: !form.title,
        amount: !form.amount,
        date: !form.date,
      }));
      return;
    }
    if (isNaN(parseFloat(form.amount)) || parseFloat(form.amount) < 0) {
      // Alert.alert("Invalid Form", "Please enter a valid amount.");
      setError((prev) => ({ ...prev, amount: true }));
      return;
    }
    // use moment to check if the date is valid
    if (!moment(form.date).isValid()) {
      // Alert.alert("Invalid Form", "Please enter a valid date.");
      setError((prev) => ({ ...prev, date: true }));
      return;
    }
    // update or add the expense
    // if expenseId exists, then update the expense
    // otherwise, add the expense
    if (expenseId) {
      const result = await dispatch(
        updateExpenseAxios(expenseId, {
          title: form.title.trim(),
          amount: parseFloat(form.amount),
          date: new Date(form.date).toISOString(),
        })
      );
      if (!result.error) {
        dispatch(
          updateExpense({
            item: {
              id: expenseId,
              title: form.title.trim(),
              amount: parseFloat(form.amount),
              date: new Date(form.date).toDateString(),
            },
          })
        );
        // save the expense
        navigation.goBack();
      } else {
        setShowErrorOverlay(true);
        setErrorMessage(result.message);
      }
    } else {
      const response = await storeExpense({
        title: form.title.trim(),
        amount: parseFloat(form.amount),
        date: new Date(form.date).toISOString(),
      });
      if (!response.error) {
        dispatch(
          addExpense({
            id: response.name,
            title: form.title.trim(),
            amount: parseFloat(form.amount),
            date: new Date(form.date).toDateString(),
          })
        );

        // save the expense
        navigation.goBack();
      } else {
        setShowErrorOverlay(true);
        setErrorMessage(response.message);
      }
    }
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
  const [error, setError] = React.useState({
    title: false,
    amount: false,
    date: false,
  });
  const [showErrorOverlay, setShowErrorOverlay] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("An error has occured!");

  const handleFormChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (expenseId) {
      // get the expense from the redux store
      // set the form to the expense
      const expense = expenses.find((item) => item.id === expenseId);
      setForm({
        ...expense,
        amount: expense.amount.toString(),
        date: moment(expense.date).add(1, "day").format("YYYY-MM-DD").toString(),
      });
    }
  }, [expenseId]);

  if (showErrorOverlay) {
    return <ErrorOverlay message={errorMessage} onConfirm={() => setShowErrorOverlay(!showErrorOverlay)} />;
  }

  if (loading) {
    return <LoadingOverlay />;
  }
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
              isInvalid: error.amount,
              errorText: error.amount && "Please enter a valid amount.",
            }}
            style={{ flex: 0.5 }}
          />
          <Input
            label="Date"
            textInputConfig={{
              placeholder: "YYYY-MM-DD",
              maxLength: 10,
              onChangeText: (val) => handleFormChange("date", val),
              value: form.date,
              isInvalid: error.date,
              errorText: error.date && "Please enter a valid date.",
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
            isInvalid: error.title,
            errorText: error.title && "Please enter a title.",
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
