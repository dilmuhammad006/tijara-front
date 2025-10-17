import axios from "axios";
const customAxios = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASE_URL,
  withCredentials: true,
  timeout: 20000,
});

export default customAxios;
