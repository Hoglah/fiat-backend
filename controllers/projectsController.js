import projectsModel from "../models/projectsModels.js";
import { v2 as cloudinary } from "cloudinary";

// Add project item
const addProjects = async (req, res) => {
  try {
    const project = new projectsModel({
      title: req.body.title,
      img: req.file.path, // Cloudinary gives a URL here
    });

    await project.save();
    res.json({ success: true, message: "Project Added" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error uploading project" });
  }
};

// List project items
const listProjects = async (req, res) => {
  try {
    const projects = await projectsModel.find({});
    res.json({ success: true, data: projects });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching projects" });
  }
};

// Remove project item
const removeProjects = async (req, res) => {
  try {
    const project = await projectsModel.findById(req.body.id);

    if (!project) {
      return res.json({ success: false, message: "Project not found" });
    }

    // Extract Cloudinary public_id from URL
    const publicId = project.img.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`projects/${publicId}`);

    await projectsModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Project Removed" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error removing project" });
  }
};

export { addProjects, listProjects, removeProjects };
