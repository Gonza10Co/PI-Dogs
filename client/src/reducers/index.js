import { combineReducers } from "redux";
import redDogs from "./dogs";
import redLoading from "./loading";
import redTemp from "./temps";

const reducer = combineReducers({ redDogs, redLoading, redTemp });

export default reducer;
