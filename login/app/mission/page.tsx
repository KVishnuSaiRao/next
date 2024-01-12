"use client";
import "./mission.css";
import React from "react";
import Image from "next/image";
import logo from "../images/cnlogo.svg";
import mission from "../images/mission.svg";
import Navbar from "../navbar/page";
export default function Open() {
  return (
    <div className="miss">
      <Image src={logo} alt="" />
      <Navbar />
      <div className="kv">
        <main className="main1">
          <h1>Who we are and why we do what we do?</h1>
          <p>
            Mission Our mission is to provide a comprehensive construction
            monitoring platform that integrates diverse data sources, simplifies
            data interpretation, and enhances decision-making. We aim to
            facilitate efficiency, reduce costs, and improve outcomes for
            construction projects worldwide, ultimately contributing to the
            growth and innovation within the construction industry
          </p>
        </main>
        <Image src={mission} alt="" />
      </div>
    </div>
  );
}
