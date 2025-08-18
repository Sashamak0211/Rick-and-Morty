import axios from "axios";
import type { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
