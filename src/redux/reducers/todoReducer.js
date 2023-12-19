const initialState = [];

const todoReducer = (state = initialState, action) => {
  console.log("payload", action.payload);
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { ...action.payload }];
    case "DELETE_TODO":
      return [...action.payload];
    case "EDIT_TODO":
      return [...action.payload];
    default:
      return state;
  }
};

export default todoReducer;
