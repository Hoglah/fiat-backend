import projectsModel from "../models/projectsModels.js";
import fs from "fs";

// add project item
const addProjects = async (req, res) => {
  let img_filename = `${req.file.filename}`;
  const project = new projectsModel({
    title: req.body.title,
    img: img_filename,
  });
  try {
    await project.save();
    res.json({ success: true, message: "Project Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all projects list
const listProjects = async (req, res) => {
  try {
    const projects = await projectsModel.find({});
    res.json({ success: true, data: projects });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

// delete gallery list
const removeProjects = async (req, res) => {
  try {
    const project = await projectsModel.findById(req.body.id);
    fs.unlink(`uploads/${project.img}`, () => {});

    await projectsModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Project Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addProjects, listProjects, removeProjects };
