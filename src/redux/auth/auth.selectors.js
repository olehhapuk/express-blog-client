export const getToken = ({ auth }) => auth.token;
export const getUser = ({ auth }) => auth.user;
export const getLoading = ({ auth }) => auth.loading;
export const getError = ({ auth }) => auth.error;
export const isAuthenticated = ({ auth }) => !!auth.token;
