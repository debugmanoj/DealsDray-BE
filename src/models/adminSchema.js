import mongoose from "./makeConnection.js";
const admin = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    collection: "admin",
    versionKey: false,
  }
);

const adminSchema = mongoose.model("admin", admin);
export default adminSchema;
