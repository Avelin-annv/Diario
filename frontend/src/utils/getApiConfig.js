export const getApiConfig = () => {
  const token = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).token
    : "";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};
