import { GET_ERRORS, CLEAR_ERRORS } from './actionTypes';

// RETURN ERRORS
// returned as an action object, will be passed into dispatch, used in authActions
export const returnErrors = (message, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { message, status, id }
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
