"use client";

import { MENU_ITEMS } from "@/lib/constant";
import { useEffect, useRef, useState } from "react";

export default function NavBar() {
  const menuRef = useRef<HTMLAnchorElement>(null);
  const itemBubbleRef = useRef(null);
  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const menuItems =
      menuRef?.current?.querySelectorAll<HTMLAnchorElement>("a") || [];
    if (menuItems.length > 0) {
      const firstItem = menuItems[0];
      const { offsetLeft, offsetWidth } = firstItem;
      console.log(offsetLeft, offsetWidth);
      setBubbleStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, []);

  const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { offsetLeft, offsetWidth } = e.target;
    setBubbleStyle({ left: offsetLeft, width: offsetWidth });
  };
  return (
    <nav className="glass-menu" ref={menuRef}>
      {MENU_ITEMS.map((item) => (
        <a
          key={item.name}
          href="#"
          className="glass-menu-item"
          onMouseEnter={handleHover}
        >
          {item.name.toUpperCase()}
        </a>
      ))}
      <span
        ref={itemBubbleRef}
        className="glass-menu-span"
        style={{ left: bubbleStyle.left, width: bubbleStyle.width }}
      />
    </nav>
  );
}
