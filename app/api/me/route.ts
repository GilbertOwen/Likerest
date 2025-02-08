import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const authToken = req?.headers.get("Authorization");
  if (!authToken) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/auth/me`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    return NextResponse.json({ token: authToken }, {status : 200});
  } catch (error) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
}
