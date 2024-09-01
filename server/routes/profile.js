const express = require("express")
const router = express.Router()
const { auth, isInstructor } = require("../middleware/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
} = require("../controllers/profile")

const { getAllNotes, addNote, deleteNote, updateNote, getNoteById } = require("../controllers/Note")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

router.get('/notes/:userId', getAllNotes);
// Add a new note
router.post('/notes', addNote);
// Delete a note
router.delete('/notes/:id', deleteNote);
// Update a note
router.put('/notes/:id', updateNote);
//get note info
router.get('/getNote/:id', getNoteById);

module.exports = router
