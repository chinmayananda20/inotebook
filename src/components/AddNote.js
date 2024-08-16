import React, { useState } from 'react'
import { useContext } from 'react'
import NoteContext from '../Contexts/Notes/NoteContext'
export const AddNote = () => {
    const context = useContext(NoteContext);
    const {AddNotes} = context;
    const [note, setnote] = useState({title:'',description:'',tag:''})
    const handleClick = (e)=>{
        e.preventDefault();
        AddNotes(note)
    }
    const onChange = (e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
        <h1>Add a note</h1>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" onChange={onChange} id="title" name="title" aria-describedby="emailHelp"/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Description</label>
          <input type="text" className="form-control"  onChange={onChange} name = "description" id="description"/>
        </div>
        
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>

    </div>
  )
}
