import axios from "axios";

export const SET_LOADING = "SET_LOADING";
export const CLEAR_DOGS = "CLEAR_DOGS";
export const SET_DOGS = "SET_DOGS";
export const SEARCH_DOGS = "SEARCH_DOGS";
export const SORT_ASC_AZ = "SORT_ASC_AZ";
export const SORT_DESC_AZ = "SORT_DESC_AZ";
export const SORT_ASC_19 = "SORT_ASC_19";
export const SORT_DESC_19 = "SORT_DESC_19";
export const SET_TEMP = "SET_TEMP";
export const GET_TEMP_DOGS = "GET_TEMP_DOGS";
export const SET_PAGE = "SET_PAGE";

export const setLoading = (payload) => ({ type: SET_LOADING, payload });

export const clearDogs = () => ({ type: CLEAR_DOGS });

export const getDogs = (name = "") => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await axios.get(
        `http://localhost:3001/dogs?name=${name}`
      );
      if (response.status === 200)
        dispatch({ type: SET_DOGS, payload: response.data });
    } catch {
      dispatch({ type: SET_DOGS, payload: null });
    }
  };
  // dispatch({ type: SET_LOADING, payload: false });
};

export const searchDog = (payload) => (dispatch) =>
  dispatch({ type: SEARCH_DOGS, payload });

export const sortAscAZ = (payload) => (dispatch) =>
  dispatch({ type: SORT_ASC_AZ, payload });

export const sortDescAZ = (payload) => (dispatch) =>
  dispatch({ type: SORT_DESC_AZ, payload });

export const sortAsc19 = (payload) => (dispatch) =>
  dispatch({ type: SORT_ASC_19, payload });

export const sortDesc19 = (payload) => (dispatch) =>
  dispatch({ type: SORT_DESC_19, payload });

//Trae todos los temps q hay en la Api y BD
export const getTemp = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    const response = await axios.get("http://localhost:3001/temperaments");
    dispatch({ type: SET_TEMP, payload: response.data });
    dispatch({ type: SET_LOADING, payload: false });
  };
};

//Hace un request a endpoint pasando body los temps seleccionados.
export const getTempDogs = (json) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await axios.post(
        "http://localhost:3001/temperament/dogs",
        json
      );
      if (response.status === 200)
        dispatch({ type: GET_TEMP_DOGS, payload: response.data });
    } catch {
      dispatch({ type: GET_TEMP_DOGS, payload: null });
    }
  };
};

export const setPage = (page) => (dispatch) =>
  dispatch({ type: SET_PAGE, payload: page });
