import { legacy_createStore as createStore } from "redux";
import rootReducre from "./reducers/index";

const store = createStore(rootReducre);

export default store;
