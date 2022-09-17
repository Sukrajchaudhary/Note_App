const express = require('express');
const router = express.Router();
var fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
// ROUTE 1:Get All the Notes using :Get"/api/auth/getuser".login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");

    }
})

// ROUTE 2:Add a Notes using :POst"/api/auth/addnotes".login required
router.post('/addnotes', fetchUser, [
    body('title', 'Enter a Valid Title:').isLength({ min: 4 }),
    body('description', 'Description must be atleast 5 character').isLength({ min: 10 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            //if there are errors,return Bad request and the err
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }
            const note = new Note({
                title, description, tag, user: req.user.id

            })
            const saveNote = await note.save()
            res.json(saveNote)
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");

        }
    })
//Route 3: Update an existing Note using POST "/api/auth/updatenote".Login required
router.put('/updatenotes/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //create n NewNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");

    }

})

// Route 4: Delete Notes DELETE "/api/notes/deletenotes".Login required


router.delete('/deletenotes/:id', fetchUser, async (req, res) => {
    try {

        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }

        // Allow Deletions only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note Has Been Deleted", note: note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");

    }
})
module.exports = router