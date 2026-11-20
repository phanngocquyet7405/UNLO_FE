import { redirect } from "next/navigation";

export default async function CaNhanHoaRedirectPage({ searchParams }) {
  const params = await searchParams;
  const queryString = params ? new URLSearchParams(params).toString() : "";
  redirect(`/custom${queryString ? `?${queryString}` : ""}`);
}
