import API from "./api";

export const registerUser = async (payload) => {
  const response = await API.post("/user/register", payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const res = await API.post("/user/login", payload);
  return res.data;
};