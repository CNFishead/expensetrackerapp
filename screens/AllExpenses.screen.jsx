import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput.component";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getExpenses } from "../util/http";
import { clearExpenses, setExpenses } from "../redux/reducers/expensesReducer";

const AllExpenses = () => {
  const { expenses, loading } = useSelector((state) => state.expenses);

  const dispatch = useDispatch();

  useEffect(() => {
    // fetch the expenses from the server
    // store them in the redux store
    dispatch(
      getExpenses({
        // order by date descending with newest expenses first
        orderBy: "date",
      })
    );
  }, [dispatch]);
  return (
    <View style={styles.rootContainer}>
      <ExpensesOutput
        items={expenses}
        periodName={"All Expenses"}
        loading={loading}
        onRefresh={() => dispatch(getExpenses({ orderBy: "date" }))}
      />
    </View>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
