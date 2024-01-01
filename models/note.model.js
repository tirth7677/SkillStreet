const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: [true, "Title must be unique"],
      minlength: [3, "Title should be at least 3 characters long"],
      maxlength: [100, "Title should not exceed 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [10, "Content should be at least 10 characters long"],
      maxlength: [1000, "Content should not exceed 1000 characters"],
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;