import mongoose from "./makeConnection.js";
function formatDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);
  return `${day}-${month}-${year}`;
}
const employee = new mongoose.Schema(
  {
    Name: {
      type: String,
    },
    Email: {
      type: String,
    },
    Mobile: {
      type: Number,
    },
    Designation: {
      type: String,
    },
    Gender: {
      type: String,
    },
    Course: {
      type: Array,
    },
    image: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: formatDate(new Date()),
    },
  },
  {
    collection: "employee",
    versionKey: false,
  }
);
const employeeSchema = mongoose.model("employee", employee);
export default employeeSchema;
