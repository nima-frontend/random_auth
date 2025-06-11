import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET as string;

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
