import { SET_LOADING } from "../actions";

const redLoading = (state = true, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return payload;
    default:
      return state;
  }
};

export default redLoading;
