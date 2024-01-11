"use client";
import React from "react";
import "./So.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../images/ConstructNLogo.png";
import { getToken, deleteCookie } from "../components/cookies";
export default function Open() {
  const router = useRouter(); 

  return (
    <main>

      <div> <button onClick={()=>router.push('/')}>Logout</button></div>
      <div className="full">
        <div>
          <Image src={logo} alt="" width={320}></Image>
        </div>
      </div>
    </main>
  );
}
