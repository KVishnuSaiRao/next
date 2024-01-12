"use client";
import "./vission.css";
import React from "react";
import Image from "next/image";
import logo from "../images/cnlogo.svg";
import vission from "../images/vision.svg";
import Navbar from "../navbar/page";
export default function Open() {
  return (
    <div className="viss">
      <Image src={logo} alt="" />
      <Navbar />
      <div className="kv">
        <main className="main1">
          <h1>Who we are and why we do what we do?</h1>
          <p>
            Our Main Vision To transform the construction industry by empowering
            project teams with unified, actionable data insights throughout the
            entire project lifecycle.
          </p>
        </main>
        <Image src={vission} alt="" />
      </div>
    </div>
  );
}
