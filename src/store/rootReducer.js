import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import spacesReducer from "../store/space/reducer";

export default combineReducers({
  appState: appState,
  user: user,
  space: spacesReducer,
});
