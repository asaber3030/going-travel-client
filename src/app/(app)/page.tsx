import api from "@/lib/axios";

export default async function page() {
  const res = api.get("/products");
  return <div>Home</div>;
}
