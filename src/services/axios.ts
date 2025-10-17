import axios from "axios";
const customAxios = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASE_URL,
  withCredentials: true,
});

export default customAxios;
