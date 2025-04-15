import { redirect } from "next/navigation";
import { getUser } from "@/actions/auth";

import { LoginForm } from "./_components/login-form";
import { LoginImage } from "./_components/right-image";

export default async function LoginPage() {
  const user = await getUser();
  if (user) return redirect("/admin/");

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <LoginForm />
      <LoginImage />
    </div>
  );
}
