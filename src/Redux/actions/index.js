export const SEND_LOGIN_INFO = 'SEND_EMAIL_ADDRESS';

export const addLoginInfo = (loginInfo) => ({
  type: SEND_LOGIN_INFO,
  loginInfo,
});
