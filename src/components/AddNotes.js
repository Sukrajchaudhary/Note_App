import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext'
 const AddNotes = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: " " })
    const handleclick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        props.showAlert("Note Added Successfully","success")

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h1 className='my-3'>Add A Notes</h1>
            <form>
                <div className="mb-3">
                    <label htmlfor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlfor="description" className="form-label" >Description</label>
                    <textarea className="form-control"name="description" value={note.description} id="description" cols="30" rows="10"onChange={onChange} ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlfor="tag" className="form-label" >Tag</label>
                    <input className="form-control"name="tag" id="tag" cols="30" value={note.tag} rows="10"onChange={onChange} ></input>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleclick}>Add Notes</button>
            </form>
        </div>
    )
}

export default AddNotes;