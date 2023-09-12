import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const instance = axios.create({
  baseURL: process.env.REACT_APP_BE_SERVER,
  headers: {
    Authorization: cookies.get("authorization")
      ? `Bearer ${cookies.get("authorization")}`
      : undefined,
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = cookies.get("authorization");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
