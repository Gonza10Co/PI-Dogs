import { combineReducers } from "redux";
import redDogs from "./dogs";
import redLoading from "./loading";
import redTemp from "./temps";
import redPage from "./pagination";

const reducer = combineReducers({ redDogs, redLoading, redTemp, redPage });

export default reducer;
