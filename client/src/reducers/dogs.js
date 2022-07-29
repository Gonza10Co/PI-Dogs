import {
  CLEAR_DOGS,
  SET_DOGS,
  SORT_ASC_AZ,
  SORT_DESC_AZ,
  SORT_ASC_19,
  SORT_DESC_19,
  GET_TEMP_DOGS,
} from "../actions";

const initialState = [];

export const redDogs = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR_DOGS:
      return initialState;
    case SET_DOGS:
      return payload;
    case SORT_ASC_AZ:
      state.sort((a, b) =>
        a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
      );
      return [...state];
    case SORT_DESC_AZ:
      state.sort((a, b) =>
        a.nombre < b.nombre ? 1 : b.nombre < a.nombre ? -1 : 0
      );
      return [...state];
    case SORT_ASC_19:
      state.sort((a, b) => Number(a.pesoMin) - Number(b.pesoMin));
      return [...state];
    case SORT_DESC_19:
      state.sort((a, b) => Number(b.pesoMax) - Number(a.pesoMax));
      return [...state];
    case GET_TEMP_DOGS:
      return payload;
    default:
      return state;
  }
};

export default redDogs;
