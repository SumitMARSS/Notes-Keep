const Note = require('../models/Note');

// Get all notes for a user
exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.params.userId });
        res.status(200).json({
            success: true,
            notes: notes,
            message: "Data fetched successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Add a new note
exports.addNote = async (req, res) => {
    try {
        const { title, content, userId } = req.body;

        if (!title || !content || !userId ) {
            return res.status(404).json({
                success:false,
                error: 'Required Data not found'
            });
        }

        const newNote = new Note({
            title,
            content,
            userId
        });

        const savedNote = await newNote.save();
        res.status(200).json(savedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Delete a note
exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        await Note.findByIdAndDelete(req.params.id);
        //await note.remove();
        res.status(200).json({ success: true, message: 'Note has been deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Update a note
exports.updateNote = async (req, res) => {
    try {
        const { title, content, pinned } = req.body;
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        note.title = title || note.title;
        note.content = content || note.content;
        note.pinned = pinned || note.pinned;

        const updatedNote = await note.save();
        res.status(200).json({
            success: true,
            note: updatedNote,
            message: 'Notes updated successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

//get notes by Id

exports.getNoteById = async (req, res) => {
    const { id } = req.params; 
  
    try {
      const note = await Note.findById(id);
  
      if (!note) {
        return res.status(404).json({ success: false, message: 'Note not found' });
      }  
      res.status(200).json({ success: true, note });
    } catch (error) {
      console.error('Error fetching note:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };