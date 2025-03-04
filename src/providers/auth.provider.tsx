"use client";

import React, { createContext } from "react";

export const AdminContext = createContext<{} | null>(null);

type AuthProviderProps = {
  value: {} | null;
  children: React.ReactNode;
};

export const AuthProvider = ({ value, children }: AuthProviderProps) => {
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
