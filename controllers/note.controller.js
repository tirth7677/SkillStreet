const Note = require("../models/note.model");
const mongoose = require("mongoose");
// create new note
const createNewNote = async (req, res) => {
  try {
    // here we take title and content from the user
    const { title, content } = req.body;
    const newNote = new Note({
      title,
      content,
    });
    // then save it in our database and send the response to the frontend
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

// get all notes 
const getAllNotes = async (req, res) => {
  try {
    // here we have to find all notes so there are no parameter is include
    const allNotes = await Note.find();
    // here we have calculated the total notes in our mongodb database
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
// get one note using the mongodb id
const getOneNote = async (req, res) => {
  try {
    // take id from parameter which is send in request
    const noteId = req.params.id;
    // here we have check the id is valid or not 
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
    }
    const note = await Note.findById(noteId);
    // if we not found that id in mongodb then that not is not found
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    // if the id is match send this response
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

// update note using id
const updateNote = async (req, res) => {
  try {
    // take id from parameter
    const noteId = req.params.id;
    // take title and content from the user
    const { title, content } = req.body;
     // here we have check the id is valid or not
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
    }
    // if we not found that id in mongodb then that not is not found
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    // save the new content and title 
    note.content = content;
    note.title = title;

    const updatedNote = await note.save();
    // if every thing is work fine the send this response
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

// delete note using id
const deleteNote = async (req, res) => {
  try {
    // take the note parameter
    const noteId = req.params.id;
    // check id from the database
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
    }
    // so here finf the id and delete that id mean note
    const deletedNote = await Note.findByIdAndDelete(noteId);
    // if id is not found send this response
    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    // if every thing is work then send this response
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

// delete all notes bascially clear the database
const deleteAllNote = async (req, res) => {
  try {
    // here we dont have ant parameter
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