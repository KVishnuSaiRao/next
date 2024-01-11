"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./Signup.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import mail from "../images/email.png";
import pass from "../images/pass.png";
import check from "../images/check.png";
import user from "../images/user.png";
import log from "../images/cnlogo.svg";
import axios from "axios";
export default function Home() {
  type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreedToTerms: boolean;
  };
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field: string) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkboxValue = (e.target as HTMLInputElement).checked;
      setFormData((prevData) => ({
        ...prevData,
        [name]: checkboxValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //! Validation logic...

    //! If there are errors, set them in state and stop form submission...
    if (formData.password !== formData.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }
    if (!formData.firstName.trim()) {
      window.alert("Please enter your first name.");
      return;
    }

    // Check if lastName is filled

    if (!formData.lastName.trim()) {
      window.alert("Please enter your last name.");
      return;
    }

    // Check if email is filled and valid
    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      window.alert("Please enter a valid email address.");
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{7,})/;
    if (!passwordRegex.test(formData.password) || !formData.password.trim()) {
      window.alert(
        "Please enter a valid password. It should contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, and be at least 7 characters long."
      );
      return;
    }
    // Check if password is filled and valid (add your own conditions)

    // Check if confirmPassword is filled
    if (!formData.confirmPassword.trim()) {
      window.alert("Please confirm your password.");
      return;
    }

    // Check if agreedToTerms is checked
    if (!formData.agreedToTerms) {
      window.alert("Please agree to the Terms & conditions.");
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    try {
      //! API call for user registration using axios
      const response = await axios.post(
        "https://api.dev2.constructn.ai/api/v1/users/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        //! If registration is successful, you can redirect or perform any other actions
        console.log("Registration successful:", formData);
        window.alert("Signup successful!");
        router.push("/");
      } else {
        //! Handle other non-successful status codes
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      //! Check if it's an Axios error with a response
      if (axios.isAxiosError(error) && error.response) {
        const responseData = error.response.data;
        if (error.response.status === 409) {
          console.log("Email address already registered");
          console.log("Server message:", responseData.message);
          window.alert(`Email Already Exists: ${responseData.message}`);
        } else {
          //! Handle other non-successful status codes
          console.error("Registration error:", error);
          window.alert("Registration failed. Please try again later.");
        }
      } else {
        //! Handle other types of errors
        console.error("Registration error:", error);
        window.alert("Registration failed. Please try again later.");
      }
    }
  };

  const isValidEmail = (email: string) => {
    //! Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const router = useRouter(); 

  return (
    <main>
      <div className="bgimg">
        <Image src={log} alt="" />
        <div className="Scontainer">
          <div className="header">
            <div className="text">Sign Up</div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <div className="z">
                <div className="input">
                  <Image src={user} alt="" />
                  <input
                    type="text"
                    placeholder="Enter FirstName"
                    id="firstName"
                    name="firstName"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="input">
                <Image src={user} alt="" />
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter LastName"
                  name="lastName"
                  onChange={handleInputChange}
                />
              </div>
              <div className="input">
                <Image src={mail} alt="" />
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="input">
                <Image src={pass} alt="" />
                <input
                  id="password"
                  placeholder="Enter Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="input">
                <Image src={check} alt="" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="confirmPassword"
                  name="confirmPassword"
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {passwordMismatch && (
              <div className="error-text">Passwords do not match</div>
            )}
            <label>
              <input
                type="checkbox"
                id="agreedToTerms"
                name="agreedToTerms"
                className="mr-2"
                onChange={handleInputChange}
              />
              I agree to the Terms & conditions
            </label>
            <br />
            <Box>
              <div className="but">
                <Button size="small" type="submit">
                  Submit
                </Button>
              </div>
            </Box>
          </form>
          <br />
          <br />
          <div className="S">
            Already a user? <span onClick={() => router.push("/")}>SignIn</span>
          </div>
        </div>
      </div>
    </main>
  );
}
