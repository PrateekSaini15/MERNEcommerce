import axios from "axios";

const axiosInstance = axios.create();

export function getAxiosInstance(user = "") {
  if (user === "user") {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
  }
  if (user === "admin") {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("adminToken")}`;
  }
  if (user === "merchant") {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("merchantToken")}`;
  }
  return axiosInstance;
}

export default axiosInstance;
