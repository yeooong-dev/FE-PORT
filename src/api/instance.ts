import axios from "axios";
import { Cookies } from "react-cookie";
import UseLogout from "../hook/UseLogout";

const cookies = new Cookies();

const instance = axios.create({
  baseURL: process.env.REACT_APP_BE_SERVER,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function redirectToLoginPage() {
  window.location.href = "/login";
}

function refreshToken() {
  if (isRefreshing) {
    return new Promise(function (resolve) {
      refreshSubscribers.push(resolve);
    });
  } else {
    isRefreshing = true;
    return axios
      .post("/api/refresh-token-endpoint", {
        refreshToken: cookies.get("refreshToken"),
      })
      .then((response) => {
        const newToken = response.data.accessToken;
        cookies.set("authorization", newToken);
        isRefreshing = false;

        refreshSubscribers.map((callback) => callback(newToken));
        refreshSubscribers = [];
      })
      .catch((error) => {
        isRefreshing = false;
        const { forceLogout } = UseLogout();
        forceLogout();

        setTimeout(redirectToLoginPage, 3000);

        return Promise.reject(error);
      });
  }
}

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
      alert("로그인 후 이용해주세요");

      redirectToLoginPage();

      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default instance;
