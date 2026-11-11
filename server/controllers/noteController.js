const Note = require("../models/Note");

exports.getMyNotes = async (req, res) => {
  const notes = await Note.find({ owner: req.userId }).sort({ updatedAt: -1 }).populate("owner", "name");
  res.json(notes);
};

exports.getPublicNotes = async (req, res) => {
  const notes = await Note.find({ isPublic: true }).sort({ updatedAt: -1 }).populate("owner", "name");
  res.json(notes);
};

exports.createNote = async (req, res) => {
  const { title, body, isPublic = false } = req.body;
  if (!title?.trim() || !body?.trim()) {
    return res.status(400).json({ message: "Title and body are required" });
  }

  const note = await Note.create({
    title: title.trim(),
    body: body.trim(),
    owner: req.userId,
    isPublic: Boolean(isPublic)
  });
  await note.populate("owner", "name");
  res.status(201).json(note);
};

exports.updateNote = async (req, res) => {
  const { title, body, isPublic } = req.body;
  if (!title?.trim() || !body?.trim()) {
    return res.status(400).json({ message: "Title and body are required" });
  }

  const note = await Note.findOne({ _id: req.params.id, owner: req.userId });
  if (!note) return res.status(404).json({ message: "Note not found or you do not own it" });

  note.title = title.trim();
  note.body = body.trim();
  note.isPublic = Boolean(isPublic);
  await note.save();
  await note.populate("owner", "name");
  res.json(note);
};

exports.deleteNote = async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.userId });
  if (!note) return res.status(404).json({ message: "Note not found or you do not own it" });
  res.json({ message: "Note deleted" });
};
