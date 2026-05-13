import express from "express";
import {
  addProjects,
  listProjects,
  removeProjects,
} from "../controllers/projectsController.js";
import multer from "multer";

const projectsRouter = express.Router();

// Multer storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
projectsRouter.post("/add", upload.single("img"), addProjects);
projectsRouter.get("/list", listProjects);
projectsRouter.post("/remove", removeProjects);

export default projectsRouter;
