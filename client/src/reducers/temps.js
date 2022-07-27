import { SET_TEMP } from "../actions";

export const redTemp = (state = [], { type, payload }) => {
  switch (type) {
    case SET_TEMP:
      payload.sort((a, b) =>
        a.temperamento > b.temperamento
          ? 1
          : b.temperamento > a.temperamento
          ? -1
          : 0
      );
      return payload;
    default:
      return state;
  }
};

export default redTemp;
