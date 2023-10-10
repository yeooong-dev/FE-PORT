import axios from "axios";
import { Cookies } from "react-cookie";
import UseLogout from "../hook/UseLogout";

const cookies = new Cookies();

const instance = axios.create({
  baseURL: process.env.REACT_APP_BE_SERVER,
});

instance.interceptors.request.use(
  (config) => {
    const token = cookies.get("authorization");

    if (token && !token.startsWith("Bearer ")) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const { forceLogout } = UseLogout();
      forceLogout();
    }
    return Promise.reject(error);
  }
);

export default instance;
