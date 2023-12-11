"use server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { SHA256 } from "crypto-js";
import { FormData } from "@/app/form";
import { redirect } from "next/navigation";
export async function getJwtSecretKey() {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY || "";
  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }
  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: any) {
  try {
    const { payload } = await jwtVerify(token, await getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}

const admin = {
  email: process.env.ADMIN_EMAIL || "admin@gmail.com",
  password: process.env.ADMIN_PASSWORD || "admin",
};

const hashAdmin = {
  email: admin.email,
  password: SHA256(
    admin.password + process.env.SALT || "admin" + "salt"
  ).toString(),
};

export const checkEmailAndPassword = (email: string, password: string) => {
  if (email === hashAdmin.email && password === hashAdmin.password) {
    return true;
  }
  return false;
};

export const validate = async (data: FormData) => {
  const hashPassword = SHA256(
    data.password + process.env.SALT || "admin" + "salt"
  ).toString();
  if (checkEmailAndPassword(data.email, hashPassword)) {
    // jwt token
    const jwt = await new SignJWT({
      ...hashAdmin,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(await getJwtSecretKey());
    cookies().set("jwt", jwt);
    redirect("/encrypt");
  } else {
    return false;
  }
};

export const logout = () => {
  cookies().set("jwt", "");
  redirect("/");
};
