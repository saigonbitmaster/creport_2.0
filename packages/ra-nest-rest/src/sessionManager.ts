const sessionManager = () => {
  const getAccessToken = () => localStorage.getItem("access_token");
  const getRefreshToken = () => localStorage.getItem("refresh_token");
  const getUserName = () => localStorage.getItem("username");
  const getFullName = () => localStorage.getItem("fullName");

  const saveSession = (
    accessToken: string,
    refreshToken: string,
    username: string,
    fullName: string
  ) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("username", username);
    localStorage.setItem("fullName", fullName);
  };

  const clearSession = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("fullName");
  };

  return {
    getAccessToken,
    getRefreshToken,
    getUserName,
    getFullName,
    saveSession,
    clearSession,
  };
};

export default sessionManager();
