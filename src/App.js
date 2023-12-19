import React from "react";
import ReduxTodo from "./redux/ReduxTodo";
// import ReduxToolKit from "./redux-toolkit/ReduxToolkitTodo";
// import TodoWithState from "./todoWithState/TodoWithState"

function App() {
  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <ReduxTodo />
      {/* <ReduxToolKit/> */}
      {/* <TodoWithState/> */}
    </div>
  );
}

export default App;
