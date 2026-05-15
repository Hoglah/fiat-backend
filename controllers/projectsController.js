import projectsModel from "../models/projectsModels.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary config (use env vars in Render dashboard)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Add project item
const addProjects = async (req, res) => {
  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "projects",
    });

    // Save to MongoDB
    const project = new projectsModel({
      title: req.body.title,
      img: result.secure_url, // Cloudinary URL
    });

    await project.save();

    // Remove temp file
    fs.unlinkSync(req.file.path);

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
