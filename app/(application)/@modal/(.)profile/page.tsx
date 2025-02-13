"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FormEditProfile from "./_components/FormEditProfile";

export default async function ProfileModal() {
  let cookie: any = await cookies();
  const authToken = cookie.get("auth");
  if (!authToken) {
    return redirect("/#login");
  }
  const response = await fetch(`${process.env.NEXT_INTERNAL_API_URL}/api/me`, {
    headers: {
      Authorization: authToken.value,
    },
  });
  if (response?.status != 200) {
    return redirect("/#login");
  }
  const resJs = await response.json();
  const userData = resJs.data;

  return (
    <>
      <FormEditProfile user={userData}></FormEditProfile>
    </>
  );
}
