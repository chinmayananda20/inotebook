const express = require("express")
const router = express.Router()
const fetchuser = require('../middleware/fetechuser')
const { body, validationResult } = require('express-validator')
const Note = require("../models/Notes")

const Notes = require('../models/Notes')
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
})

router.post("/addnotes", fetchuser, [
    // body('date', 'enter a valid date').isDate(),
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        const { title, description, tag } = req.body
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message)
        return res.status(500).send("Something went wrong!")
    }
})
router.put('/updatenote/:id',fetchuser ,async (req,res)=>{
    const {title,description,tag} = req.body
    const newNote = {};
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}


    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note = await Note.findByIdAndUpdate(req.params.id, {$set :newNote},{new:true})
    res.json({note})
})
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try {
        let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.send("Successfully deleted")
    } catch (error) {
        console.error(error.message)
        return res.status(500).send("Something went wrong!")
    }
})
module.exports = router
