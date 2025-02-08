"use server";
import { cookies } from "next/headers";
import Navbar from "./_components/Navbar";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let cookie: any = await cookies();
  let authToken: any= cookie.get('auth');
  if (!cookie) {
    authToken = false;
  }
  return (
    <div className="flex pt-[92px]  flex-col h-full w-full">
      <Navbar isAuthenticated={authToken ? true : false} />
      {children}
    </div>
  );
}
