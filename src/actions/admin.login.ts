"use server";
import api from "@/lib/axios";
import { getToken } from "./app";
import { loadDefaultHeaders } from "@/lib/api";

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const token = await getToken();
  const headers = loadDefaultHeaders(token);
  const url = `${process.env.BASE_URL}/auth/login`;
  const response = await api.post(url, credentials, headers);
  return response.data;
};
