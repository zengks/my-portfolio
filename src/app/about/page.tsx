export const revalidate = 60;

import { getUserAbout } from "@/controllers/userAboutController";

export default async function About() {
  const userAboutContent = await getUserAbout("zengks");
  return userAboutContent ? (
    <div className="glass-container glass-section w-10/12 mx-auto">
      <main>
        <section className="section-title">About Myself</section>
        <section>
          <p>
            {userAboutContent.aboutUser
              ? userAboutContent.aboutUser
              : "Loading..."}
          </p>
        </section>
      </main>
    </div>
  ) : (
    <div></div>
  );
}
