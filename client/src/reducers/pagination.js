import { SET_PAGE } from "../actions";

export default function redPage(state = 1, { type, payload }) {
  switch (type) {
    case SET_PAGE:
      return payload;

    default:
      return state;
  }
}
