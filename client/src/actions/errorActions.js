import { GET_ERRORS, CLEAR_ERRORS } from './types';

export const returnErrors = (error, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { error, status, id }
  }
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
};