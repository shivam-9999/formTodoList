import { FORM_DATA } from "./type";

export const formDataHandler = (value) => {
  return (dispatch) => {
    dispatch({ type: FORM_DATA, payload: value });
  };
};
