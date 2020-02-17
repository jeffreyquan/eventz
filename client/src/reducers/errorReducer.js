import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  error: {},
  status: null,
  id: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ERRORS:
      return {
        error: action.payload.error,
        status: action.payload.status,
        id: action.payload.id
      };
    case CLEAR_ERRORS:
      return {
        error: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
}