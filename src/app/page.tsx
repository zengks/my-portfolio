import { auth } from "@/lib/auth";
import { cookies } from "next/headers";
import SignOutButton from "./components/SignOutButton";

export default async function Home() {
  const session = await auth();
  console.log("Session:", session);
  console.log("COOKIES:", (await cookies()).getAll());

  return (
    <div>
      <h1>Welcome</h1>
      <br />
      <h2>
        Session Data:
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </h2>
      <br />
      {session ? (
        <div>
          <p>Welcome, {session.user?.username}</p>
          {<SignOutButton />}
        </div>
      ) : (
        <div>
          <a href="/users/login">Go to login page</a>
        </div>
      )}
    </div>
  );
}
