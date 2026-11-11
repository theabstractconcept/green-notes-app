const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const {
  getMyNotes, getPublicNotes, createNote, updateNote, deleteNote
} = require("../controllers/noteController");

router.use(protect);
router.get("/mine", getMyNotes);
router.get("/public", getPublicNotes);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
