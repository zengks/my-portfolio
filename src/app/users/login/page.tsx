"use client";
import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //   const router = useRouter();

  const errorMessages: Record<string, string> = {
    CredentialsSignin: "Invalid username or password.",
    AccessDenied: "Access Denied.",
    Configuration: "Server Configuration Error.",
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      redirect: true,
      callbackUrl: "/",
      username,
      password,
    });
    if (result?.error) {
      setError(result.error);
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Log In</button>
      </div>
      {error && (
        <div className="p-3 rounded bg-red-100 text-red-500 w-100">
          - {errorMessages[error]}
        </div>
      )}
    </form>
  );
}
