"use client";

import { User } from "@/types";
import { createContext } from "react";

export const AdminContext = createContext<User | null>(null);

type AuthProviderProps = {
  value: User | null;
  children: React.ReactNode;
};

export const AuthProvider = ({ value, children }: AuthProviderProps) => {
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
