import axios from "axios";

console.log("API BASE URL: ", process.env.REACT_APP_BASE_URL);
export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials:true,
});
