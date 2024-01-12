"use client";
import React from "react";
import { useEffect } from "react";
import "./So.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../images/cnlogo.svg";
import home from "../images/home.png"
import { getToken, removeCookie } from "../components/cookies";
import Navbar from "../navbar/page";
export default function Open() {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/");
    }
  }, [router]);
  const handleLogout = () => {
    // Delete the cookie and redirect to the login page
    removeCookie();
    router.push("/");
  };
  return (
    <div className="home">
      <Image src={logo} alt="" />
      <Navbar />
      <div className="kv">
      <main className="main1">
        <h1>After all, we are visual creatures </h1>
        <p>
          Our passion is construction, digital and AI. In this world of the
          future, we believe it is your passion too. Therefore, lets come
          together to make the Construction industry more visual,
          high-performance, and efficient
        </p>

      </main>
      <Image src={home} alt="" />
      </div>
    </div>
  );
}
