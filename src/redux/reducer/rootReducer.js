import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer, // Tên của State của Redux bây giờ là user
});

export default rootReducer;
