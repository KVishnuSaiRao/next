"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { parseCookies } from "nookies";
import Image from "next/image";
import adani from "../images/cnlogo.svg";
import "./page.css";
import axios from "axios";
import cardView from "../images/cardViewicon.svg";
import listView from "../images/listViewicon.svg";
import imageI from "../images/360Image.svg";
import menu from "../images/cardMenu.svg";
import video from "../images/360Video.svg";
import Drone from "../images/DroneImage.svg";
import Pimage from "../images/PhoneImage.svg";
import update from "../images/updatedAtIcon.svg";
import userCount from "../images/userCount.svg";

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
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const [loading, setLoading] = useState(true);
  const COOKIE_NAME = "authData";
  const handleCardMenuClick = (option: string, projectId: string) => {
    if (option === "Project Details") {
      // Navigate to the project details page
      router.push(`/Projects/${projectId}/Details`);
    } else {
      // Handle other menu options as needed
    }
  };
  const getToken = () => {
    const authData = parseCookies()[COOKIE_NAME];
    return authData ? JSON.parse(authData).token : null;
  };

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
    const handleDocumentClick = (e: MouseEvent) => {
      if (
        messageRef.current &&
        !(messageRef.current as any).contains(e.target as Node)
      ) {
        setDisplayedProjectId(null);
      }
    };
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [router]);
  // const [action, setAction] = useState("Grid");
  const [action, setAction] = useState(view === "List" ? "List" : "Grid");
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
    setDisplayedProjectId(projectId);
  };

  //! ____________________________________________________________________________

  interface ShimmerCardProps {
    isLoading: boolean;
    _id: string;
    captures: {
      "360 Image"?: number;
      "Drone Image"?: number;
      "Phone Image"?: number;
      "360 Video"?: number;
    };
    name: string;
    coverPhoto: string;
    usersCount: string;
    lastUpdated: string;
  }

  const ShimmerCard: React.FC<ShimmerCardProps> = ({
    isLoading,
    captures,
    name,
    usersCount,
    lastUpdated,
    _id,
  }) => {
    console.log("isLoading:", isLoading); // Check if isLoading is true during loading
    const shimmerStyles = {
      background:
        "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmerAnimation 1.5s infinite linear",
    };
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

    return (
      <div
        className={`card ${isFlipped ? "flipped" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleCardHover}
        onMouseOut={handleCardLeave}
      >
        <div className="ima">
          {!isFlipped && (
            <div>
              <Image
                src={menu}
                alt=""
                width={20}
                height={90}
                priority={true}
                onClick={handleImageClick}
              />
              {isHovered && <div className="projectDetails">Project Menu</div>}
            </div>
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
              <div
                className="opt"
                onClick={() => handleCardMenuClick("Project Details", _id)}
              >
                Project Details
              </div>
              <div className="opt">Manage Users</div>
              <div className="opt">Deassign Project</div>
            </div>
          )}
        </div>
      </div>
    );
  };
  if (loading && view === "List") {
    return <div>Loading Please Wait</div>;
  }
  if (loading && view != "List") {
    return (
      <div>
        <div className="flex justify-between items-start">
          <div className="flex items-start">
            <span className="head">Project(s)</span>
          </div>

          <div className="icons">
            <div
              className={action === "Grid" ? "Grid" : "C"}
              onClick={() => setAction("Grid")}
            >
              <Image src={cardView} alt="" />
            </div>
            <div
              className={action === "List" ? "List" : "L"}
              onClick={() => setAction("List")}
            >
              <Image src={listView} alt="" />
            </div>
          </div>
        </div>
        <div className="shimmer-cards">
          <div className="shimmer"></div>
          <div className="shimmer"></div>
          <div className="shimmer"></div>
          <div className="shimmer"></div>
          <div className="shimmer"></div>
          <div className="shimmer"></div>
          <div className="shimmer"></div>
          <div className="shimmer"></div>
          <div className="shimmer"></div>
        </div>
      </div>
    );
  }
  // _____________________________________________
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
        {/* ................. */}
        {action === "Grid" ? (
          <div className="Card">
            {projects.map((project) => (
              <ShimmerCard
                key={project._id}
                isLoading={true}
                _id={project._id}
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
                            <h1
                              onClick={() =>
                                handleCardMenuClick(
                                  "Project Details",
                                  project._id
                                )
                              }
                            >
                              Project Details
                            </h1>
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
