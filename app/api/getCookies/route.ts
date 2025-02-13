import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookie = await cookies();
  const authToken = cookie.get("auth");
  if (!authToken) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/auth/me`, {
      headers: {
        Authorization: authToken.value,
      },
    });
    return NextResponse.json({ token: authToken }, { status: 200 });
  } catch (error) {
    await fetch(`${process.env.NEXT_INTERNAL_API_URL}/api/logout`);
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
}
