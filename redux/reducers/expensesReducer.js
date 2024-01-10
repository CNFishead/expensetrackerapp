import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [
    ],
  },
  reducers: {
    addExpense(state, action) {
      // generate a random id
      const id = Math.random().toString() + new Date().toString();
      state.expenses.push({ id, ...action.payload });
    },
    removeExpense(state, action) {
      console.log(action.payload);
      state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
      console.log(state.expenses);
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
  },
});

export default expenseSlice.reducer;
export const { addExpense, removeExpense, clearExpenses, updateExpense } = expenseSlice.actions;
