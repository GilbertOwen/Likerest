import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const authToken = req?.headers.get("Authorization");
  if (!authToken) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/auth/me`, {
      headers: {
        Authorization: authToken,
      },
    });
    return NextResponse.json({ ...response.data }, { status: 200 });
  } catch (error) {
    await fetch(`${process.env.NEXT_INTERNAL_API_URL}/api/logout`);
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
}
