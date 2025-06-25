import { getServerSession } from "next-auth/next";
import { authOptions } from "src/app/api/auth/[...nextauth]/route";

export async function auth() {
  return await getServerSession(authOptions);
}
