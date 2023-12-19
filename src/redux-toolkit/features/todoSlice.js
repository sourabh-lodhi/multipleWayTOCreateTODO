import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const initialState = { todo: [] };

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = action.payload;
      state.todo = [...state.todo, { id: uuid(), text: todo }];
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      const todo = state.todo.filter((item) => item.id !== id);
      state.todo = [...todo];
    },
    editTodo: (state, action) => {
      const data = action.payload;
      const todo = state.todo.map((item) => {
        if (item.id === data.id) {
          item.text = data.text;
        }
        return item;
      });
      state.todo = [...todo];
    }
  }
});

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
