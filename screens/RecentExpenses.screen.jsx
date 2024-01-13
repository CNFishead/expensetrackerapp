import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput.component";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses } from "../util/http";
import { clearExpenses, setExpenses } from "../redux/reducers/expensesReducer";
import moment from "moment";

const RecentExpenses = () => {
  const { expenses, loading } = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  const today = new Date();
  const sevenDaysAgo = moment(today).subtract(7, "days").toISOString();
  useEffect(() => {
    // fetch the expenses from the server
    // store them in the redux store
    dispatch(getExpenses({ orderBy: "date", startAt: sevenDaysAgo })); // returns an array of expenses
  }, [dispatch]);

  // create a filtered list of expenses that are within the last 7 days
  const expensesFiltered = expenses?.filter((expense) => {
    return moment(expense.date).isAfter(sevenDaysAgo);
  }).sort((a, b) => {
    return moment(b.date).diff(moment(a.date));
  });

  return (
    <View style={styles.rootContainer}>
      <ExpensesOutput
        periodName={"Last 7 Days"}
        items={expensesFiltered}
        loading={loading}
        onRefresh={() => dispatch(getExpenses({ orderBy: "date", startAt: sevenDaysAgo }))}
      />
    </View>
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
