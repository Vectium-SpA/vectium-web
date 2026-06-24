import { redirect } from "next/navigation";

// Los precios viven en la landing definitiva. Redirige a su sección.
export default function Page() {
  redirect("/farmateca#precios");
}
