import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookie = await cookies();
  cookie.delete("auth"); // Remove the auth cookie
  return NextResponse.json({ message: "Logged out" }, { status: 200 });
}
