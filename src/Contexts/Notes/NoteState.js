import NoteContext from './NoteContext';
import { useState } from "react";
const NoteState = (props) => {
    const initialNotes = []
    const [notes, setnotes] = useState(initialNotes)
    const host = 'http://localhost:5000'
    //fetch all notes
    const fetchnotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3YzMxZjI4Zjg5OTJmNGFmN2M1YTc2In0sImlhdCI6MTcyMjc5MTk4OX0.G9CQIM2wrQ5XC4S2Cme4qhBiDIlOUdJHuVgiIMXvLi4'
                },
            })
            const json = await response.json()
            setnotes(json)
        } catch (error) {
            console.log(error)
        }
    }

    //Add Notes
    const AddNotes = async (title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/addnotes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3YzMxZjI4Zjg5OTJmNGFmN2M1YTc2In0sImlhdCI6MTcyMjc5MTk4OX0.G9CQIM2wrQ5XC4S2Cme4qhBiDIlOUdJHuVgiIMXvLi4'
                },
                body: JSON.stringify(title, description, tag)
            })
            console.log("notes aded")
        } catch (error) {
            console.log(error)
        }
    }

    //delete notes
    const deleteNotes = async(id)=>{
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3YzMxZjI4Zjg5OTJmNGFmN2M1YTc2In0sImlhdCI6MTcyMjc5MTk4OX0.G9CQIM2wrQ5XC4S2Cme4qhBiDIlOUdJHuVgiIMXvLi4'
                },
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <NoteContext.Provider value={{ notes, fetchnotes, AddNotes, deleteNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;