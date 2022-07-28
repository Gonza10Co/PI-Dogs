import { combineReducers } from "redux";
import redDogs from "./dogs";
import redLoading from "./loading";
import redTemp from "./temps";
import redPage from "./pagination";
import redSearch from "./search";

const reducer = combineReducers({
  redLoading,
  redDogs,
  redTemp,
  redPage,
  redSearch,
});

export default reducer;
