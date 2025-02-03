import axios from "axios";

const API_URL = "https://api.thecatapi.com/v1";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "x-api-key": import.meta.env.VITE_CAT_API_KEY,
  },
});
