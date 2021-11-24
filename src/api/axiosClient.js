import axios from "axios";
import { store } from "../redux/store";
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});
axiosClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = "Bearer " + store.getState().user.token;
    return config;
  },
  (error) => {
    throw error;
  }
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    throw error;
  }
);
export default axiosClient;
