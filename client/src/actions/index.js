import axios from "axios";

export const SET_DOGS = "SET_DOGS";
export const SET_LOADING = "SET_LOADING";
export const SORT_DESC = "SORT_DESC";
export const SET_TEMP = "SET_TEMP";
export const GET_TEMP_DOGS = "GET_TEMP_DOGS";

export const getDogs = (name = "") => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    const response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
    const { data } = response;
    dispatch({ type: SET_DOGS, payload: data });
    dispatch({ type: SET_LOADING, payload: false });
  };
};

export const sortDesc = (payload) => (dispatch) =>
  dispatch({ type: SORT_DESC, payload });

export const getTemp = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    const response = await axios.get("http://localhost:3001/temperaments");
    const { data } = response;
    dispatch({ type: SET_TEMP, payload: data });
    dispatch({ type: SET_LOADING, payload: false });
  };
};

export const getTempDogs = (json) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    const response = await axios.post(
      "http://localhost:3001/temperament/dogs",
      json
    );
    // console.log("json : ", json, " response: ", response);
    const { data } = response;
    dispatch({ type: GET_TEMP_DOGS, payload: data });
    dispatch({ type: SET_LOADING, payload: false });
  };
};
