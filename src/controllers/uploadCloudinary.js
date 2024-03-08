import multer from "multer";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../models/cloudinary.js";
import employeeSchema from "../models/employeeSchema.js";

// Define storage for images
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "EmployeeImage", // Change the folder name for images
    allowed_formats: ["jpg", "png", "jpeg"], // Add allowed image formats
    // public_id: (req, file) => file.originalname.split('.')[0] // You can use this if you want to keep the original filename
    public_id: (req, file) => "image-" + Date.now(), // Using a timestamp for public_id
  },
});

// Multer middleware for image uploads
const uploadImage = multer({
  storage: imageStorage,
  fileFilter: (req, file, cb) => {
    // Check if the file is an image
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file format. Only JPG, JPEG, and PNG files are allowed."
        )
      );
    }
  },
}).single("image"); // Assuming your form field for uploading images is named "image"

// Function to handle image upload
const imageUpload = (req, res, callback) => {
  uploadImage(req, res, async (err) => {
    let { Course } = req.body;
    let courseArray = Course.split(",");
    if (err) {
      console.error(err);
      res.status(500).send("An error occurred");
    } else {
      try {
        let value = req.body;
        value.Course = courseArray;
        value.image = req.file.path;

        let employee = await employeeSchema.create(value);
        callback(true);
        return true;
        // res.status(200).send({ url: req.file.path, id: image._id, public_id: req.file.filename });
      } catch (error) {
        res.status(500).send("An error occurred");
      }
    }
  });
};
const EditimageUpload = (req, res, callback) => {
  uploadImage(req, res, async (err) => {
    let { id } = req.params;
    let { Course } = req.body;
    let courseArray = Course.split(",");
    if (err) {
      console.error(err);
      res.status(500).send("An error occurred");
    } else {
      try {
        let value = req.body;
        value.Course = courseArray;
        value.image = req.file.path;
        let updatedEmployee = await employeeSchema.findOneAndUpdate(
          { _id: id },
          value,
          { new: true } // Return the updated document
        );
        if (updatedEmployee) {
          callback(true);
        } else {
          res.status(404).send("Employee not found");
        }

        // res.status(200).send({ url: req.file.path, id: image._id, public_id: req.file.filename });
      } catch (error) {
        res.status(500).send("An error occurred");
      }
    }
  });
};

export default { imageUpload, EditimageUpload };
