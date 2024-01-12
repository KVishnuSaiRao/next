// pages/UserProfile.js
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css"
import profile from "../images/profile.png"
import Image from "next/image";
import Navbar from "../navbar/page";
import { getToken, removeCookie } from "../components/cookies";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface UserProfileData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  // Add more properties based on your actual API response
}

const UserProfile = () => {
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = getToken();

        if (!token) {
          // Redirect to login page if token is not available
          router.push("/");
          return;
        }

        const response = await axios.get(
          "https://api.dev2.constructn.ai/api/v1/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(response.data.result);
      } catch (error) {
        console.error("Error fetching user profile:", error);

        // Redirect to login page on error
        router.push("/");
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleLogout = () => {
    // Delete the cookie and redirect to the login page
    removeCookie();
    router.push("/");
  };
  return (
    <div className="over">
        <Navbar />
    <div className="pro">
    <Image  src={profile} alt="" />
      <h2 className="kvs">User Profile</h2>
      {userData ? (
        <div className="info">
          <p>First Name:{userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <p>Email: {userData.email}</p>
          <p>Status:{userData.status}</p>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}

      <span>
        <Link href={"/"} onClick={handleLogout}>
          LogOut
        </Link>
      </span>
    </div>
    </div>
  );
};

export default UserProfile;
