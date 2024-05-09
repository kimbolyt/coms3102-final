const express = require('express');
const mongoose = require('mongoose');
const Note = require('../models/note');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        console.log(notes);
        res.status(200).json(notes);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const note = new Note({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
    });

    try {
        console.log("post attempted");
        const newNote = await note.save();
        console.log(newNote);
        res.status(201).json(newNote);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (note) {
            // await note.remove();
            await Note.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Note deleted' });
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (note) {
            note.title = req.body.title || note.title;
            note.content = req.body.content || note.content;

            const updatedNote = await note.save();
            res.status(200).json(updatedNote);
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;