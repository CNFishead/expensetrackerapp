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
