import axiosInstance from "../axios/axiosInstance"

export const registerUser = async (body) => {
  let  res =  await axiosInstance.post('/user/user_register',body)
  return res;
}