import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: NextRequest) {
  const { phone } = await req.json();

  if (!/^\d{10}$/.test(phone)) {
    return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
  }

  const apiRes = await fetch("https://randomuser.me/api/?results=1&nat=us");
  const data = await apiRes.json();
  const user = data.results[0];

  const payload = {
    id: user.login.uuid,
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    avatar: user.picture.thumbnail,
    phone, // Stored but not verified
  };

  const token = jwt.sign(payload, JWT_SECRET, { algorithm:'HS256',expiresIn: "1h" });

  const response = NextResponse.json({ message: "Login successful" });
  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 3600,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
