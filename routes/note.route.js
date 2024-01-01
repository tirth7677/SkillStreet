const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/jwtverify");
const {createNewNote,getAllNotes,getOneNote,updateNote,deleteNote,deleteAllNote} = require('../controllers/note.controller')

router.post('/create', verifyToken,createNewNote);
router.get('/getallnotes', verifyToken,getAllNotes);
router.get('/getonenote/:id', verifyToken,getOneNote);
router.put('/updatenote/:id', verifyToken,updateNote);
router.delete('/deletenote/:id', verifyToken,deleteNote);
router.delete('/deleteallnote', verifyToken,deleteAllNote);

module.exports = router;