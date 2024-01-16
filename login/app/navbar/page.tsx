// components/Navbar.js
'use client'
import React from "react";
import Link from "next/link";
import { getToken, removeCookie } from "../components/cookies";
import { useRouter } from "next/navigation";

import "./navB.css";
const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Delete the cookie and redirect to the login page
    removeCookie();
    router.push("/");
  };
  return (
    <div className="navBar">
      <nav>
        <Link href="/Home">Home</Link>
        <Link href="/vission">Vission</Link>
        <Link href="/profile">Profile</Link>
        <Link href={"/Projects"}>Projects</Link>
        <Link href="/mission">Mission</Link>
        <Link href="/" onClick={handleLogout}>
          Logout
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
