import { cookies } from "next/headers";
import Jwt from "jsonwebtoken";
export default function User() {
  const cookieStore = cookies();
  const token = cookieStore.get("login_token")?.value;
  if (!token) {
    console.log("token not found");
  } else {
    const user = Jwt.verify(token, "qwerty");
    if (!user) {
      console.log("not authticated");
    } else if (typeof user === "object") {
      return user;
    }
  }
}
