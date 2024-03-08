import adminSchema from "../models/adminSchema.js";
import uploadCloudinary from "../controllers/uploadCloudinary.js";
import employeeSchema from "../models/employeeSchema.js";
const checkLogin = async (req, res) => {
  try {
    let { userName, password } = req.body;
    const admin = await adminSchema.findOne({ username: userName });
    //check if the user exists
    if (admin) {
      if (admin.password == password) {
        res.status(200).send({
          authenticated: true,
          userName: userName,
        });
      } else {
        res.status(400).send({
          message: `Incorrect Password`,
        });
      }
    } else {
      res.status(400).send({
        message: `User with ${userName} does not exists`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// const imageUpload=async(req,res)=>{
//     try {
//          uploadCloudinary.imageUpload(req)
//     } catch (error) {
//         res.status(500).send({
//             message:"Internal Server"
//         })
//     }

// }
const imageUpload = async (req, res) => {
  try {
    uploadCloudinary.imageUpload(req, res, (success) => {
      if (success) {
        res.status(200).send(true);
      } else {
        res.status(500).send(false);
      }
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server",
    });
  }
};
const getAllUser = async (req, res) => {
  try {
    let employee = await employeeSchema.find({});
    res.status(200).send(employee);
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};
const getSpecificUser = async (req, res) => {
  let { id } = req.params;
  try {
    let specificUser = await employeeSchema.findOne({ _id: id });
    if (specificUser) {
      res.status(200).send(specificUser);
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
const UpdateTheSpecificUser = async (req, res) => {
  try {
    uploadCloudinary.EditimageUpload(req, res, (success) => {
      if (success) {
        res.status(200).send(true);
      } else {
        res.status(500).send(false);
      }
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server",
    });
  }
};
const DeleteSpecificUser = async (req, res) => {
  let { id } = req.params;
  try {
    const deleteUser = await employeeSchema.deleteOne({ _id: id });

    if (deleteUser) {
      res.status(200).send({
        data: true,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
export default {
  checkLogin,
  imageUpload,
  getAllUser,
  getSpecificUser,
  UpdateTheSpecificUser,
  DeleteSpecificUser,
};
