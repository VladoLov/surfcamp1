"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const path = usePathname();
  const navItems = [
    { display: "the camp", slug: "/" },
    { display: "the experience", slug: "/experience" },
    { display: "the blog", slug: "/blog" },
  ];
  return (
    <header
      className={`header ${path === "/experience" ? "header--light" : ""}`}
    >
      <img className="header__logo" src="./assets/logo.svg" alt="logo" />
      {/*  <Image src="./assets/logo.svg" width={250} height={250} alt="logo" /> */}
      <ul className="header__nav">
        {navItems.map((item) => (
          <li key={item.display}>
            <Link href={item.slug}>
              <h5>{item.display}</h5>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/events">
        <button className="btn btn--black btn--small">BOOK NOW</button>
      </Link>
    </header>
  );
}

export default Header;
