"use server";
import { cookies } from "next/headers";
import Navbar from "./_components/Navbar";

export default async function PublicLayout({
  modal,
  children,
}: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  let cookieStore = await cookies();
  let token = cookieStore.get("auth")?.value || null;
  let authenticated = false;
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
      await fetch(`${process.env.NEXT_INTERNAL_API_URL}/api/logout`, {
        method: "GET",
      }); // Remove the auth cookie
    } else {
      authenticated = response.ok;
    }
  }

  return (
    <div className="flex pt-[92px] flex-col h-full w-full">
      {/* <Navbar isAuthenticated={authenticated} /> */}
      <Navbar />
      {children}
      {modal}
    </div>
  );
}
