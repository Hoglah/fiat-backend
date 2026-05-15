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
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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
