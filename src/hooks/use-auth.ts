import { useMutation } from "@tanstack/react-query";
import { login } from "@/actions/admin.login";
import { useToast } from "@/hooks/use-toast";

export function useAuth() {
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (credentials: { email: string; password: string }) =>
      login(credentials),
    onSuccess: () => {
      toast({
        title: "Login Successful",
        description: "You have been logged in successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    loginError: loginMutation.error,
  };
}
