import express from "express";
import {
  addProjects,
  listProjects,
  removeProjects,
} from "../controllers/projectsController.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config
cloudinary.config({
  cloud_name: "dnzlelxmy",
  api_key: "294369235874889",
  api_secret: "Dc9tJP5COPNF_fL5TKPOIT3cjbY",
});

// Multer storage engine for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "projects", // Cloudinary folder name
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

const projectsRouter = express.Router();

// Routes
projectsRouter.post("/add", upload.single("img"), addProjects);
projectsRouter.get("/list", listProjects);
projectsRouter.post("/remove", removeProjects);

export default projectsRouter;
