const mongoose = require("mongoose");
const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "please provide company"],
      minlength: 1,
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "please provide position"],
      maxlength: 50,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      required: [true, "please provide password"],
      default: "pending",
    },
    jobType: {
      // Server sharu rakhine nai muki devanu kyarey kam no hoy to bandh kari devanu
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: true,
      default: "my city",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
