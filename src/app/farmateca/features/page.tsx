import { redirect } from "next/navigation";

// Las características viven en la landing definitiva. Redirige a su sección.
export default function Page() {
  redirect("/farmateca#caracteristicas");
}
