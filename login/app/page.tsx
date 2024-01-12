"use client";
import "./globals.css";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./Login.css";
import mail from "./images/email.png";
import pass from "./images/pass.png";
import log from "./images/cnlogo.svg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import { storeTokensInCookie } from "./components/cookies";
export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = (field: string) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    }
  };
  const handleSignIn = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "https://api.dev2.constructn.ai/api/v1/users/signin",
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.data) {
          if (response.status === 401) {
            console.log("Invalid credentials");
            setLoginError(true);
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        const user = response.data;
        const { token, refreshToken } = user.result;
        storeTokensInCookie(user.result.token, user.result.refreshToken);

        console.log("Token:", token);
        console.log("Refresh Token:", refreshToken);

        if (user && user.result.email === email) {
          console.log("User info:", user);
          router.push("SignIn");
        } else {
          setLoginError(true);
        }
      } catch (error) {
        console.error("Login error:", error);
        setLoginError(true);
      }
    },
    [email, password, router]
  );
  return (
    <main>
      <div className="Lbgimg">
        <Image src={log} alt="" />
        <div className="container">
          <div className="header">
            <div className="text">SignIn</div>
          </div>
          <form onSubmit={handleSignIn}>
            <div className="inputs">
              <div className="input">
                <Image src={mail} alt="" />
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input">
                <Image src={pass} alt="" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="fp">
              <span onClick={() => router.push("fp")}>Forgot Password?</span>
            </div>
            <div className="m">
              {loginError ? (
                <div className="text-red-500 mt-1">
                  Invalid Email or Password
                </div>
              ) : null}
            </div>
            <div className="rem">
              <label>
                <input type="checkbox" />
                Remember the user mail
              </label>
            </div>
            <br />

            <Box>
              <div className="but">
                <Button variant="contained" size="small" type="submit">
                  Submit
                </Button>
              </div>
            </Box>
          </form>
          <br />
          <br />
          <br />
          <br />
          <div className="a">
            New user? <span onClick={() => router.push("Signup")}>SignUp</span>
          </div>
        </div>
      </div>
    </main>
  );
}
