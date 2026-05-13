import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
});

const projectsModel =
  mongoose.models.Projects || mongoose.model("Projects", projectsSchema);

export default projectsModel;
