import { SEARCH_DOGS } from "../actions";

export default function redSearch(state='', { type, payload }) {
  switch (type) {
    case SEARCH_DOGS:
      
      return payload;
  
    default:
      return state;
  }
}