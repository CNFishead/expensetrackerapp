import { setLoading } from "../redux/reducers/expensesReducer";
import axios from "./axios";

export const storeExpense = async (expense) => {
  const { data } = await axios.post("/expenses.json", expense);
  return data;
};

export const getExpenses = async (filterOptions) => {
  try {
    // filterOptions is an object of keyValue pairs, so we need to modify it to be a query string
    const filterOptionsArray = await Object.entries(filterOptions).map(([key, value]) => `${key}="${value}"&`);
    const { data } = await axios.get(`/expenses.json?${filterOptionsArray.join("")}`);
    // transform the data into an array

    const arrayData = [];
    for (const key in data) {
      arrayData.push({ id: key, ...data[key] });
    }
    console.log(arrayData);
    return arrayData;
  } catch (error) {
    console.log(error);
    return [];
  }
};