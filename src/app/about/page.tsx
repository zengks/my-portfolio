// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
// import { getUserByUsername } from "@/controllers/userController";
export const revalidate = 60;

import { getCachedUserByUsername } from "@/lib/cachedFetchers";

export default async function About() {
  //   const session = await getServerSession(authOptions);
  const user = await getCachedUserByUsername("zengks");
  //   const isOwner = session?.user.username === user?.username;
  return user ? (
    <div className="glass-container glass-section w-10/12 mx-auto">
      <main>
        <section className="section-title">About Myself</section>
        <section>
          <p>{user.aboutUser ? user.aboutUser : "Loading..."}</p>
        </section>
      </main>
    </div>
  ) : (
    <div></div>
  );
}
