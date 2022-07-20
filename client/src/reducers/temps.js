import { SET_TEMP, } from "../actions";

const initialState = [];

export const redTemp = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TEMP:
      return payload;
    default:
      return state;
  }
};

export default redTemp;
