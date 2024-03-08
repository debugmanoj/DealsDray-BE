import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.cloudinaryName,
  api_key: process.env.cloudinary,
  api_secret: process.env.cloudinaryKeySecret,
});

export default cloudinary;
