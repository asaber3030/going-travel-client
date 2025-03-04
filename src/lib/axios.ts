import axios from "axios";
import { API_URL } from "./constants";

import { cookies } from "next/headers";
import { loadDefaultHeaders } from "./api";

const api = axios.create({
  baseURL: API_URL,
  headers: loadDefaultHeaders()
});

export default api;
