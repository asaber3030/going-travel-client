import { useMutation } from "@tanstack/react-query";
import { login } from "@/actions/admin.login";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/schema";
import { z } from "zod";
import { showResponse } from "@/lib/utils";

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
