import { parseCookies,setCookie,destroyCookie } from "nookies";
const COOKIE_NAME = 'authData';

export const storeTokensInCookie = (token: string, refreshToken: string) => {
  const authData = { token, refreshToken };
  setCookie(null, COOKIE_NAME, JSON.stringify(authData), {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
};

export const printStoredTokens = () => {
  const authData = parseCookies()[COOKIE_NAME];
  
  if (authData) {
    const { token, refreshToken } = JSON.parse(authData);
    console.log('Stored Token:', token);
    console.log('Stored Refresh Token:', refreshToken);
  } else {
    console.log('No stored tokens found.');
  }
};

export const removeCookie = () => {
  destroyCookie(null, COOKIE_NAME, { path: '/' });
  console.log('Cookie deleted.');
};

export const getToken = () => {
  const authData = parseCookies()[COOKIE_NAME];
  return authData ? JSON.parse(authData).token : null;
};
