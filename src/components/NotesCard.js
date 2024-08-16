import React from 'react'
import {useContext} from 'react'
import NoteContext from '../Contexts/Notes/NoteContext';
export const NotesCard = (props) => {
    const {note}= props;
    const context = useContext(NoteContext)
    const {deleteNotes} = context
    const handleClick = () =>{
        deleteNotes(note._id)
    }
    return (
        <div className="col-md-3">
            <div className="card text-white bg-warning mb-3" >
                <div className="card-header">{note.title}</div>
                <div className="card-body">
                    <p className="card-text">{note.description}</p>
                </div>
                <i className="fa-solid fa-trash-can mx-3 my-3" onClick={handleClick} ></i>
            </div>
        </div>
    )
}
