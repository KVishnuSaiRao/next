"use client";
import { getToken, removeCookie } from "../components/cookies";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "../navbar/page";
import Image from "next/image";
import logo from "../images/cnlogo.svg";
import "./page.css";
import ShimmerCard from "./ShimmerCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import cardView from "../images/cardViewicon.svg";
import listView from "../images/listViewicon.svg";
import imageI from "../images/360Image.svg";
import menu from "../images/cardMenu.svg";
import video from "../images/360Video.svg";
import Drone from "../images/DroneImage.svg";
import Pimage from "../images/PhoneImage.svg";
import update from "../images/updatedAtIcon.svg";
import userCount from "../images/userCount.svg";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

export default function Page() {
  const [projects, setProjects] = useState<
    Array<{
      _id: string;
      name: string;
      type: string;
      captures: any;
      description: string;
      coverPhoto: string;
      usersCount: string;
      lastUpdated: string;
      dateString: string;
    }>
  >([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();

        if (!token) {
          // Redirect to login page if token is not available
          router.push("/");
          return;
        }

        const response = await axios.get(
          "https://api.dev2.constructn.ai/api/v1/views/web/projectlist",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.result);
        const projectsData = response.data.result; // Array of projects

        setProjects(
          projectsData.map((project: any) => ({
            _id: project._id,
            name: project.name,
            type: project.type,
            captures: project.captures,
            description: project.description,
            coverPhoto: project.coverPhoto,
            usersCount: project.usersCount,
            lastUpdated: project.lastUpdated,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [router]);
  const [action, setAction] = useState("Grid");
  const formattedDate = (dateString: string) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [displayedProjectId, setDisplayedProjectId] = useState<string | null>(
    null
  );
  const messageRef = useRef(null);

  const handleRowHover = (projectId: string) => {
    setHoveredRow(projectId);
  };

  const handleRowLeave = () => {
    setHoveredRow(null);
  };

  const handleMenuClick = (projectId: string) => {
    // Handle menu click here
    // You can display a message or perform any other action
    setDisplayedProjectId(projectId);
  };

  const handleDocumentClick = (e: MouseEvent) => {
    // Check if the click is outside the message box
    if (
      messageRef.current &&
      !(messageRef.current as any).contains(e.target as Node)
    ) {
      setDisplayedProjectId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);
  return (
    <div>
      <div className="Pback">
        <div className="flex justify-between items-start">
          <div className="flex items-start">
            <span className="head">Project(s)</span>
          </div>
          <div className="icons">
            <div
              className={action === "Grid" ? "Grid" : "C"}
              onClick={() => {
                setAction("Grid");
              }}
            >
              <Image src={cardView} alt="" />
            </div>
            <div
              className={action === "List" ? "List" : "L"}
              onClick={() => {
                setAction("List");
              }}
            >
              <Image src={listView} alt="" />
            </div>
          </div>
        </div>
        {action === "Grid" ? (
          <div className="Card">
            {projects.map((project) => (
              <ShimmerCard
                key={project._id}
                captures={project.captures}
                name={project.name}
                coverPhoto={project.coverPhoto}
                usersCount={project.usersCount}
                lastUpdated={project.lastUpdated}
              />
            ))}
          </div>
        ) : (
          <div className="ListView">
            <table className="Table">
              <thead>
                <tr className="TableRow">
                  <th className="Hname">Project name</th>
                  <th className="Hcaptures">Captures</th>
                  <th className="Husers">Users</th>
                  <th className="Hlast">Last Captures</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project._id}
                    onMouseEnter={() => handleRowHover(project._id)}
                    onMouseLeave={handleRowLeave}
                    className={hoveredRow === project._id ? "hoveredRow" : ""}
                  >
                    <td>{project.name}</td>
                    <td className="capCol">
                      <div className="capEel">
                        <Image src={imageI} alt="" width={25} height={25} />
                        {project.captures["360 Image"] || "-"}
                      </div>
                      <div className="capEel">
                        <Image src={video} alt="" width={25} height={25} />
                        {project.captures["360 Video"] || "-"}
                      </div>
                      <div className="capEel">
                        <Image src={Pimage} alt="" width={25} height={25} />
                        {project.captures["Phone Image"] || "-"}
                      </div>
                      <div className="capEel">
                        <Image src={Drone} alt="" width={20} height={20} />
                        {project.captures["Drone Image"] || "-"}
                      </div>
                    </td>
                    <td className="userCol">
                      <div className="userEl">
                        <Image src={userCount} alt="" />
                        {project.usersCount}
                      </div>
                    </td>
                    <td>{formattedDate(project.lastUpdated)}</td>

                    <td>
                      <Image
                        src={menu}
                        alt=""
                        width={18}
                        height={18}
                        className={`menuIcon ${
                          hoveredRow === project._id ? "showMenu" : ""
                        }`}
                        onClick={() => handleMenuClick(project._id)}
                      />
                      {displayedProjectId === project._id && (
                        <div className="MB">
                          <div className="messageBox" ref={messageRef}>
                            <h1>View Project Summary</h1>
                            <h1>Project Configuration</h1>
                            <h1>Project Details</h1>
                            <h1>Manage Users</h1>
                            <h1>Deassign Project</h1>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
// ______________________________ShimmerCard________________________________________


"use client";
import "./ShimmerCard.css";
import React, { useState } from "react";
import Image from "next/image";
import imageI from "../images/360Image.svg";
import menu from "../images/cardMenu.svg";
import video from "../images/360Video.svg";
import Drone from "../images/DroneImage.svg";
import Pimage from "../images/PhoneImage.svg";
import update from "../images/updatedAtIcon.svg";
import userCount from "../images/userCount.svg";
import adani from "../images/adani.jpeg";
interface ShimmerCardProps {
  captures: {
    "360 Image"?: number;
    "Drone Image"?: number;
    "Phone Image"?: number;
    "360 Video"?: number;
    "LiDAR Scan"?: number;
    totalCount?: number;
  };
  name: string;
  coverPhoto: string;
  usersCount: string;
  lastUpdated: string;
}

const ShimmerCard: React.FC<ShimmerCardProps> = ({
  captures,
  name,
  coverPhoto,
  usersCount,
  lastUpdated,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCursorOverCard, setIsCursorOverCard] = useState(false);

  const handleImageClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    // Check if the cursor is over the card when leaving
    if (isCursorOverCard && isFlipped) {
      setIsFlipped(false);
    }
  };

  const handleCardHover = () => {
    setIsCursorOverCard(true);
  };

  const handleCardLeave = () => {
    setIsCursorOverCard(false);
  };

  const formattedDate = (dateString: string) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      // Handle invalid date
      return "Invalid Date";
    }

    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleCardHover} // Track when the cursor is over the card
      onMouseOut={handleCardLeave} // Track when the cursor leaves the card
    >
      <div className="ima">
        {isHovered && !isFlipped && (
          <div className="projectDetails">Project Menu</div>
        )}
        {!isFlipped && (
          <Image
            src={menu}
            alt=""
            width={20}
            height={90}
            priority={true}
            onClick={handleImageClick}
          />
        )}
      </div>
      <div className={`content ${isFlipped ? "back" : "front"}`}>
        <div className="imageContainer">
          {isFlipped ? (
            <p className="Imba">{name || "No Description"}</p>
          ) : (
            <Image
              src={adani}
              alt=""
              width={160}
              height={160}
              priority={true}
            />
          )}
        </div>
        {captures && !isFlipped && (
          <div>
            <div className="h-60  border-black border-b-[1px] captureDetails">
              <h1 className="h-20">{name || "No Description"}</h1>
              <h3>Captures so far</h3>
              <ul>
                <li className="captures">
                  <Image
                    src={imageI}
                    alt=""
                    width={20}
                    height={60}
                    priority={true}
                  />
                  360 Image- {captures["360 Image"] || "N/A"}
                </li>
                <li className="captures">
                  <Image
                    src={video}
                    alt=""
                    width={20}
                    height={60}
                    priority={true}
                  />
                  360 Video- {captures["360 Video"] || "N/A"}
                </li>
                <li className="captures">
                  <Image
                    src={Pimage}
                    alt=""
                    width={20}
                    height={60}
                    priority={true}
                  />
                  Phone Image- {captures["Phone Image"] || "N/A"}
                </li>
                <li className="captures">
                  <Image
                    src={Drone}
                    alt=""
                    width={20}
                    height={60}
                    priority={true}
                  />
                  Drone Image- {captures["Drone Image"] || "N/A"}
                </li>
              </ul>
            </div>
            <div className="conclusion">
              <li className="captures">
                <Image
                  src={userCount}
                  alt=""
                  width={20}
                  height={60}
                  priority={true}
                />
                <div className="pr-1">{usersCount}</div>
              </li>
              <li className="captures">
                <Image
                  src={update}
                  alt=""
                  width={20}
                  height={60}
                  priority={true}
                />
                last Captured-{formattedDate(lastUpdated)}
              </li>
            </div>
          </div>
        )}
        {isFlipped && (
          <div className="BF">
            <div className="opt">View Project Summary</div>
            <div className="opt">Project Configuration</div>
            <div className="opt">Project Details</div>
            <div className="opt">Manage Users</div>
            <div className="opt">Deassign Project</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShimmerCard;
