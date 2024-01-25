"use client";
import React, { useEffect, useState } from "react";
import "./details.css";
import axios from "axios";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import close from "../../../images/close.svg";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
type Anchor = "top" | "left" | "bottom" | "right";
interface ProjectDetails {
  name: string;
  type: string;
  company?: { name: string };
  email?: string;
  createdAt: string;
  timeZone?: string;
  description?: string;
  utm?: { northing?: string; easting?: string; zone?: string };
  location?: { coordinates?: [number, number] };
}

const ProjectDetails = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
  const COOKIE_NAME = "authData";
  const getToken = () => {
    const authData = parseCookies()[COOKIE_NAME];
    return authData ? JSON.parse(authData).token : null;
  };

  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    name: "",
    type: "",
    createdAt: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();
  const params = useParams<{ projectId: string }>();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      const token = getToken();

      try {
        const response = await axios.get(
          `https://api.dev2.constructn.ai/api/v1/projects/${params.projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProjectDetails(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project details:", error);
        setError("Error fetching project details.");
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [params.projectId, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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

  const ProjectType = () => {
    const [type, setType] = React.useState(""); // Set the default value

    const handleChange = (event: SelectChangeEvent) => {
      setType(event.target.value);
    };

    return (
      <FormControl sx={{ minWidth: 390 }}>
        <Select value={type} onChange={handleChange} displayEmpty>
          <MenuItem value="">
            <em>{projectDetails.type}</em>
          </MenuItem>
          <MenuItem value={10}>Residential</MenuItem>
          <MenuItem value={20}>Pipeline</MenuItem>
          <MenuItem value={30}>Road</MenuItem>
          <MenuItem value={30}>Solar</MenuItem>
        </Select>
      </FormControl>
    );
  };

  return (
    <div>
      <div className="Top">
        <h1>Project Details</h1>
        <div className="edit" onClick={toggleDrawer("right", true)}>
          Edit Details
        </div>
      </div>
      <div className="project-details-container">
        <SwipeableDrawer
          anchor="right"
          open={state.right}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          <div className="right-drawer-content">
            <div className="heading">
              <h2>Edit Project</h2>
              <Image
                src={close}
                alt=""
                onClick={toggleDrawer("right", false)}
                width={20}
                height={20}
              ></Image>
            </div>
            <div className="content">
              <h1>Project Name </h1>
              <div className="fix">{projectDetails.name} </div>
              <br />
              <h1>Project Type </h1>
              <ProjectType />
              <h1>Description</h1>
              <TextField
                className="Description"
                defaultValue={projectDetails.name}
                multiline
                maxRows={4}
                sx={{
                  width: "390px",
                  "& textarea": { minHeight: "100px", fontSize: "13px" },
                }}
              />
              <h1>UTM</h1>
              <div className="fix">{projectDetails.utm?.zone ?? "N/A"} </div>
              <br />
              <h1>Latitude</h1>
              <div className="fix">
                {projectDetails.location?.coordinates?.[1] ?? "N/A"}
              </div>
              <br />
              <h1>Longitude</h1>
              <div className="fix">
                {" "}
                {projectDetails.location?.coordinates?.[0] ?? "N/A"}
              </div>
              <br />
              <div className="ButtonS">
                <div>
                  <Button
                    variant="outlined"
                    color="warning"
                    style={{ width: "150px" }}
                    onClick={toggleDrawer("right", false)}
                  >
                    Cancle
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="warning"
                    style={{ width: "150px" }}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SwipeableDrawer>
        <div className="left-Top-section"></div>
        <div className="left-bottom-section">
          <div className="infoLine">
            <div className="project-info">
              {projectDetails.name}
              <h1>Name:</h1>
            </div>
            <div className="project-info">
              {projectDetails.type}
              <h1>Type:</h1>
            </div>
            <div className="project-info">
              {projectDetails.company?.name ?? "N/A"}
              <h1>Company:</h1>
            </div>
          </div>
          <div className="infoLine">
            <div className="project-info">
              {formattedDate(projectDetails.createdAt)}
              <h1>Created On:</h1>
            </div>
            <div className="project-info">
              {projectDetails.email ?? "N/A"}
              <h1>Email:</h1>
            </div>
            <div className="project-info">
              {projectDetails.timeZone ?? "N/A"}
              <h1>Time Zone:</h1>
            </div>
          </div>
          <br />
          <div className="infoLine">
            <div className="project-info">
              {" "}
              {projectDetails.description ?? "N/A"}
              <h1>Project Description:</h1>
            </div>
          </div>
        </div>
        <div className="right-section">
          <div className="right-top-section">
            <div className="project-info">
              {projectDetails.utm?.zone ?? "N/A"} <h1>UTM Zone:</h1>
            </div>
            <div className="project-info">
              {projectDetails.location?.coordinates?.[1] ?? "N/A"}
              <h1>Latitude:</h1>{" "}
            </div>
            <div className="project-info">
              {projectDetails.location?.coordinates?.[0] ?? "N/A"}
              <h1>Longitude:</h1>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
