import React from 'react'
import { useContext , useEffect} from 'react'
import NotesContext from '../Contexts/Notes/NoteContext'
import { NotesCard } from './NotesCard'
export default function Notes  () {
const context = useContext(NotesContext)
const {notes,fetchnotes,AddNotes} = context;
useEffect(() => {
    fetchnotes();
}, [AddNotes])

  return (
    <div className='row my-5'>
        {notes.map((note)=>{
            return <NotesCard key={note._id} note={note}/>
        })}
        
    </div>
  )
}
