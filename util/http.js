import { Alert } from "react-native";
import { setExpenses, setLoading } from "../redux/reducers/expensesReducer";
import axios from "./axios";

export const storeExpense = async (expense) => {
  try {
    const { data } = await axios.post("/expenses.json", expense);
    return { ...data, error: false };
  } catch (error) {
    console.log(error);
    return { error: true, message: `Error storing expense ${error}` };
  }
};

export const getExpenses = (filterOptions) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    // filterOptions is an object of keyValue pairs, so we need to modify it to be a query string
    const filterOptionsArray = await Object.entries(filterOptions).map(([key, value]) => `${key}="${value}"&`);
    const { data } = await axios.get(`/expenses.json?${filterOptionsArray.join("")}`);
    // transform the data into an array

    const arrayData = [];
    for (const key in data) {
      arrayData.push({ id: key, ...data[key] });
    }
    dispatch(setExpenses(arrayData));
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error);
    dispatch(setExpenses([]));
    dispatch(setLoading(false));
    return { error: true, message: `Error getting expenses ${error}` };
  }
};

export const deleteExpenseAxios = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.delete(`/expenses/${id}.json`);
    dispatch(setLoading(false));
    return { ...data, error: false };
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    return { error: true, message: `Error removing expense ` + error };
  }
};

export const updateExpenseAxios = (id, expense) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.put(`/expenses/${id}.json`, expense);
    dispatch(setLoading(false));
    return { ...data, error: false };
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
    return { error: true, message: `Error updating expense ${error}` };
  }
};
