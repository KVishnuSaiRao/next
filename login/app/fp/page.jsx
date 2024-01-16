"use client";
import React from "react";
import "./fp.css";
import Image from "next/image";
import logo from "../images/ConstructNLogo.png";
const page = () => {
  return (
    <main>
      <Image src={logo} alt="" width={100}></Image>
      <div className="one1">
        <h1>forgot Password?</h1>
        <div className="two2">
          Enter email :{" "}
          <input
            type="email"
            placeholder="Enter Email"
            style={{ backgroundColor: "gray" }}
          ></input>
        </div>
        <h2>A verification code is sent to your registered mail </h2>
        <div className="three3">
          <input type="text" placeholder="enter OTP" />
        </div>
      </div>
    </main>
  );
};

export default page;
