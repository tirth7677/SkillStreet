const Note = require("../models/note.model");
const mongoose = require("mongoose");

const createNewNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({
      title,
      content,
    });
    const savedNote = await newNote.save();
    res.status(201).json({
      success: true,
      message: "Note create succesfully",
      data: {
        savedNote,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const allNotes = await Note.find();
    const totalNotes = await Note.countDocuments();
    res.status(200).json({
      success: true,
      message: "Notes retrieved successfully",
      total: totalNotes,
      data: {
        notes: allNotes,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOneNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
    }
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note retrieved successfully",
      data: {
        note,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
    }

    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    note.content = content;
    note.title = title;

    const updatedNote = await note.save();

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: {
        updatedNote,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
    }
    const deletedNote = await Note.findByIdAndDelete(noteId);
    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: {
        deletedNote,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting note",
    });
  }
};

const deleteAllNote = async (req, res) => {
  try {
    const result = await Note.deleteMany();
    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} notes successfully`,
      data: {
        deletedCount: result.deletedCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting notes",
    });
  }
};

module.exports = {
  createNewNote,
  getAllNotes,
  getOneNote,
  updateNote,
  deleteNote,
  deleteAllNote,
};