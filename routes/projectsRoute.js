import express from "express";
import {
  addProjects,
  listProjects,
  removeProjects,
} from "../controllers/projectsController.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" }); // temporary local folder

const projectsRouter = express.Router();

// Routes
projectsRouter.post("/add", upload.single("img"), addProjects);
projectsRouter.get("/list", listProjects);
projectsRouter.post("/remove", removeProjects);

export default projectsRouter;
