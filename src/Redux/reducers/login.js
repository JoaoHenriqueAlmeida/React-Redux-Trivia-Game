import { SEND_LOGIN_INFO } from '../actions';

const INITIAL_STATE = {
  email: '',
  playerName: '',
};

function userInformation(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEND_LOGIN_INFO:
    return ({
      ...state,
      email: action.loginInfo.email,
      playerName: action.loginInfo.playerName,
    });
  default:
    return state;
  }
}

export default userInformation;
