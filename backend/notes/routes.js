const express = require('express')
const Note = require('../models/notes.js')
const userAuthCheck = require('../middleware/userAuthCheck.js')
const notes = express.Router();
const { exec } = require('child_process');
const path = require('path');

notes.post('/create', userAuthCheck, async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    try {
        console.log('Creating note with user ID:', req.user._id);
        const note = new Note({ title: title, user: req.user._id });
        await note.save();
        console.log('Note created:', note);
        return res.status(201).json({ message: 'Note created successfully', note: note });
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ message: 'Failed to create note: ' + error.message });
    }
})

notes.get('/fetchnotes', userAuthCheck, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})


notes.get('/note/:noteId', userAuthCheck, async (req, res) => {
  const { noteId } = req.params;
  try {
    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden - You do not have access to this note' });
    }
    exec("docker ps -q --filter 'ancestor=vscode-basic'", (psErr, psStdout, psStderr) => {
      if (psErr) {
        console.error('docker ps error:', psErr, psStderr);
        return res.status(500).json({ note, vscodeStarted: false, error: 'docker ps failed' });
      }

      if (psStdout && psStdout.trim().length > 0) {
        return res.status(200).json({
          note,
          vscodeStarted: true,
          containerId: psStdout.trim(),
          alreadyRunning: true
        });
      }
      const workspacePath = path.resolve(__dirname, '../../workspace');
      const cmd = `docker run -d -p 8080:8080 --name vscode-basic -v "${workspacePath}:/home/coder/Note" vscode-basic`;

      exec(cmd, (runErr, runStdout, runStderr) => {
        if (runErr) {
          console.error('docker run failed:', runErr, runStderr);
          return res.status(500).json({
            note,
            vscodeStarted: false,
            error: runStderr || runErr.message
          });
        }

        return res.status(200).json({
          note,
          vscodeStarted: true,
          containerId: runStdout.trim()
        });
      });
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

notes.put('/update/:noteId', userAuthCheck, async (req, res) => {
    const { noteId } = req.params;
    const { content } = req.body;
    try {
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Forbidden - You do not have access to this note' });
        }
        note.content = content;
        await note.save();
        res.status(200).json({ message: 'Note updated successfully', note });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})


module.exports = notes;