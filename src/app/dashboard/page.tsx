"use client";

import { SignOutButton } from "app/components/AuthButtons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/users/login");
    }
  }, [router, status]);

  return (
    <>
      {status === "authenticated" && (
        <div>
          <h1>Current LoggedIn Users</h1>
          <br />
          <ul>
            <li>{session?.user?.id}</li>
            <li>{session?.user?.username}</li>
            <li>{session?.user?.role}</li>
          </ul>
          <br />
          <SignOutButton />
        </div>
      )}
    </>
  );
}
