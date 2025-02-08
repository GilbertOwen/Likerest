"use server";
import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
import Hero from "./_components/Hero";
import AuthSection from "./(authentication)/AuthSection";
import axios from "axios";
import { redirect } from "next/navigation";

export default async function HomePage() {
  let cookie: any = await cookies();
  const authToken = cookie.get("auth");
  if (!authToken) {
    return (
      <>
        <Hero />
        <AuthSection />
      </>
    );
  }

  let response: any;
  try {
    response = await axios.get(`${process.env.NEXT_INTERNAL_API_URL}/api/me`, {
      headers: {
        Authorization: authToken.value,
      },
    });
  } catch (error) {
    console.error("Authentication check failed", error);
  }
  if (response?.status == 200) {
    return redirect("/explore");
  }

  return (
    <>
      <Hero />
      <AuthSection />
    </>
  );
}
