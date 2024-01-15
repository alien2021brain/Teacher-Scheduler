"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
  cookies().delete("login_token");
  return new NextResponse("Logout sucessfully");
}
