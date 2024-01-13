import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    loading: false,
  },
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
    },
    addExpense(state, action) {
      // generate a random id
      state.expenses.push(action.payload);
    },
    removeExpense(state, action) {
      state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
    },
    updateExpense: (state, action) => {
      const currentItem = state.expenses.find((el) => el.id === action.payload.item.id);
      const index = state.expenses.indexOf(currentItem);
      const updatedItem = {
        ...currentItem,
        ...action.payload.item,
      };
      // this is possible cause we can mutate it in redux toolkit
      state.expenses[index] = updatedItem;
    },
    clearExpenses(state) {
      state.expenses = [];
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export default expenseSlice.reducer;
export const { addExpense, removeExpense, clearExpenses, updateExpense, setExpenses, setLoading } =
  expenseSlice.actions;
