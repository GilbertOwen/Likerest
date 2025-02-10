"use server";
import { cookies } from "next/headers";
import Navbar from "./_components/Navbar";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let cookieStore = await cookies();
  let token = cookieStore.get("auth")?.value || null;
  let authenticated = false;

  console.log("Token:", token); // Debugging

  if (token) {
    const response = await fetch(
      `${process.env.NEXT_INTERNAL_API_URL}/api/me`,
      {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
        cache: "no-store",
        credentials: "include",
      }
    );

    if (response.status === 401) {
      console.warn("Unauthorized! Removing auth cookie...");
      await fetch(`${process.env.NEXT_INTERNAL_API_URL}/api/logout`, { method: "GET" }); // Remove the auth cookie
    } else {
      authenticated = response.ok;
    }
  }

  return (
    <div className="flex pt-[92px] flex-col h-full w-full">
      <Navbar isAuthenticated={authenticated} />
      {children}
    </div>
  );
}
