import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import uuid from "react-uuid";

import { addTodo, deleteTodo, editTodo } from "./action";

export default function Redux() {
  const [edit, setEdit] = useState({});
  const [todo, setTodo] = useState("");

  const myState = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();
  const chandleChange = (event) => {
    setTodo(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (edit.id) {
      const data = myState.map((item) => {
        if (item.id === edit.id) {
          item.text = todo;
        }
        return item;
      });
      dispatch(editTodo(data));
      setEdit({});
    } else {
      const newTodo = { id: uuid(), text: todo };
      console.log("new", newTodo);
      dispatch(addTodo(newTodo));
    }
    setTodo("");
  };

  const deleteTodoBtn = (id) => {
    const newTodo = myState.filter((item) => item.id !== id);
    dispatch(deleteTodo(newTodo));
  };

  const editTodoBtn = (id) => {
    const findTodo = myState.find((item) => item.id === id);
    setTodo(findTodo.text);
    setEdit({ ...findTodo });
  };

  return (
    <div className="App">
      <h1>Todo with redux</h1>
      <form onSubmit={submitHandler}>
        <input type="text" name="text" value={todo} onChange={chandleChange} />
        <button type="submit"> {edit.id ? "EDIT TODO" : "ADD TODO"}</button>
      </form>
      {myState &&
        myState.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => deleteTodoBtn(item.id)}>delete</button>
            <button onClick={() => editTodoBtn(item.id)}>edit</button>
          </li>
        ))}
    </div>
  );
}
