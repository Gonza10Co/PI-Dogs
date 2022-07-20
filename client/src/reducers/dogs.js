import { SET_DOGS, SORT_DESC, GET_TEMP_DOGS } from "../actions";

const initialState = [];

export const redDogs = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_DOGS:
      payload.sort((a, b) =>
        a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
      );
      return payload;
    case SORT_DESC:
      payload.sort((a, b) =>
        a.nombre < b.nombre ? 1 : b.nombre < a.nombre ? -1 : 0
      );
      return [...state, payload];
    case GET_TEMP_DOGS:
      return payload;
    default:
      return state;
  }
};

export default redDogs;