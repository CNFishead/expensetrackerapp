import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [
      {
        id: "1",
        title: "Car Insurance",
        amount: 294.67,
        date: new Date(2021, 2, 28),
      },
      {
        id: "2",
        title: "pants",
        amount: 20.34,
        date: new Date(2022, 2, 28),
      },
      {
        id: "3",
        title: "Bannana",
        amount: 200.2,
        date: new Date(2021, 2, 28),
      },
      {
        id: "4",
        title: "Car Insurance",
        amount: 294.67,
        date: new Date(2021, 2, 28),
      },
      {
        id: "1a",
        title: "Car Insurance",
        amount: 294.67,
        date: new Date(2021, 2, 28),
      },
      {
        id: "2a",
        title: "pants",
        amount: 20.34,
        date: new Date(2022, 2, 28),
      },
      {
        id: "3a",
        title: "Bannana",
        amount: 200.2,
        date: new Date(2021, 2, 28),
      },
      {
        id: "4a",
        title: "Car Insurance",
        amount: 294.67,
        date: new Date(2021, 2, 28),
      },
    ],
  },
  reducers: {
    addExpense(state, action) {
      state.expenses.push(action.payload);
    },
    removeExpense(state, action) {
      state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
    },
    clearExpenses(state) {
      state.expenses = [];
    },
  },
});

export default expenseSlice.reducer;
export const { addExpense, removeExpense, clearExpenses } = expenseSlice.actions;
