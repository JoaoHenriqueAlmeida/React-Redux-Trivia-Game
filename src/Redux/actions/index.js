export const SEND_LOGIN_INFO = 'SEND_EMAIL_ADDRESS';
export const API_SUCCESS = 'API_SUCCESS';

export const addLoginInfo = (loginInfo) => ({
  type: SEND_LOGIN_INFO,
  loginInfo,
});

export const apiSuccess = (data) => ({
  type: API_SUCCESS,
  payload: data,
});

export const apiReq = () => {
//
};

export const fetchTokenAndQuestions = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenJson = await response.json();
    const token = await tokenJson.token;
    window.localStorage.setItem('token', token);
    const fetchQuestion = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questionsJson = await fetchQuestion.json();
    const questions = await questionsJson.results;
    return dispatch(apiSuccess({ token, questions }));
  } catch (error) {
    console.log(error.message);
  }
};
