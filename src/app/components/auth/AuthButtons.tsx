// "use client";
// import { signIn, signOut, useSession } from "next-auth/react";

// export default function AuthButtons() {
//   const { data: session, status } = useSession();

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   if (status === "authenticated") {
//     return (
//       <div>
//         <p>Welcome {session.user?.email}</p>
//         <button onClick={() => signOut()}>Log Out</button>
//       </div>
//     );
//   }
//   return (
//     <div>
//       <p>You are not logged in.</p>
//       <button onClick={() => signIn()}>Log In</button>
//     </div>
//   );
// }
