import axios from "axios";

export const SET_DOGS = "SET_DOGS";
export const SET_LOADING = "SET_LOADING";
export const SORT_ASC_AZ = "SORT_ASC_AZ";
export const SORT_DESC_AZ = "SORT_DESC_AZ";
export const SORT_ASC_19 = "SORT_ASC_19";
export const SORT_DESC_19 = "SORT_DESC_19";
export const SET_TEMP = "SET_TEMP";
export const GET_TEMP_DOGS = "GET_TEMP_DOGS";
export const SET_PAGE = "SET_PAGE";

export const getDogs = (name = "") => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    const response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
    const { data } = response;
    dispatch({ type: SET_DOGS, payload: data });
    dispatch({ type: SET_LOADING, payload: false });
  };
};

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
    const { data } = response;
    dispatch({ type: SET_TEMP, payload: data });
    dispatch({ type: SET_LOADING, payload: false });
  };
};

//Hace un request a endpoint pasando body los temps seleccionados.
export const getTempDogs = (json) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    const response = await axios.post(
      "http://localhost:3001/temperament/dogs",
      json
    );
    const { data } = response;
    dispatch({ type: GET_TEMP_DOGS, payload: data });
    dispatch({ type: SET_LOADING, payload: false });
  };
};

export const setPage = (page) => (dispatch) =>
  dispatch({ type: SET_PAGE, payload: page });
