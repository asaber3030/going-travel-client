"use client";

import { AdminContext } from "@/providers";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useContext } from "react";

import { showResponse } from "@/lib/utils";
import { loginSchema } from "@/schema";
import { login, logout } from "@/actions/auth";
import { z } from "zod";

export function useAuth() {
  const { toast } = useToast();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: (credentials: z.infer<typeof loginSchema>) => login(credentials),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data?.status == 200) {
          router.push("/admin");
        }
      }),
    onError: (error) => {
      console.log(error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password",
        variant: "destructive"
      });
    }
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    loginError: loginMutation.error
  };
}

export function useUser() {
  return useContext(AdminContext);
}

export function useLogout() {
  const router = useRouter();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.push("/admin/login");
    }
  });
}
