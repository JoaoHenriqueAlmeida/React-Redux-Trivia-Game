import { API_SUCCESS } from '../actions';

const INITIAL_STATE = {
  questions: {},
  token: '',
};

function questionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case API_SUCCESS:
    return {
      ...state,
      questions: action.payload.questions,
      token: action.payload.token,
    };
  default:
    return state;
  }
}

export default questionReducer;
