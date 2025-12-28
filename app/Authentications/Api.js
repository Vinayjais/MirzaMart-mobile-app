import axiosInstance from "../axios/axiosInstance";

export const registerUser = async (body) => {
  let res = await axiosInstance.post("/user/user_register", body);
  return res;
};

export const loginUser = async (body) => {
  // Adjust endpoint path if your backend uses a different route
  let res = await axiosInstance.post("/user/authentication", body);
  return res;
};

export const logoutUser = async () => {
  // If your backend supports logout/revoke endpoint, call it.
  // The axiosInstance will attach Authorization header automatically if token exists in the store.
  try {
    const res = await axiosInstance.post("/user/logout");
    return res;
  } catch (e) {
    // swallow error; logout on client regardless
    return null;
  }
};
