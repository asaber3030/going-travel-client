"use server";

import { getLanguage, getToken } from "./app";
import { AxiosResponse, AxiosError } from "axios";
import { API_URL } from "@/lib/constants";
import { APIResponse, User } from "@/types";
import { z } from "zod";
import { loginSchema } from "@/schema";
import { loadDefaultHeaders } from "@/lib/api";

import { cookies } from "next/headers";

type LoginResponse = APIResponse<{ token: string; user: User }>;

export const login = async (credentials: z.infer<typeof loginSchema>) => {
  const token = await getToken();
  const language = await getLanguage();

  const url = `${API_URL}/auth/login`;

  const response = await fetch(url, {
    method: "POST",
    headers: loadDefaultHeaders(token, language),
    body: JSON.stringify(credentials)
  });

  const data: LoginResponse = await response.json();

  if (data.status === 200) {
    (await cookies()).set("token", data.data.token);
  }

  return data;
};
