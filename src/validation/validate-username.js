const usernameRegexp = /^[a-z0-9_-]+$/i;

export const validateUsername = username => usernameRegexp.test(username);
