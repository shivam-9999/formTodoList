import { FORM_DATA } from "./type";

const initialValues = {
  formData: "",
};

const reducer = (state = initialValues, action) => {
  switch (action.type) {
    case FORM_DATA:
      return {
        ...state,
        formData: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
