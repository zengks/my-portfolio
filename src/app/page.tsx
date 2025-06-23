import { auth } from "@/lib/auth";
import { SignOutButton } from "./components/AuthButtons";

export default async function Home() {
  const session = await auth();

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
