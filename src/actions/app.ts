import { cookies } from "next/headers";

export async function getToken(): Promise<string> {
  const store = await cookies();
  const token = store.get("token")?.value || "";
  return token;
}
