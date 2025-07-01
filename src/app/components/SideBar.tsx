import Image from "next/image";

import emoji from "src/assets/images/emoji.jpg";

export default function SideBar() {
  return (
    <aside className="glass-container glass-sidebar rounded-2xl">
      <Image src={emoji} alt="my emoji style" className="rounded-full" />
      <section>
        <p>Email: zengks@outlook.com</p>
        <p>Location: My location</p>
        <p>Contact Me Page Link</p>
      </section>
      <section>
        <p>social media link 1</p>
        <p>social media link 2</p>
        <p>social media link 3</p>
      </section>
    </aside>
  );
}
