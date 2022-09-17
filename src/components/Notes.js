import React, { useContext, useEffect, useRef ,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';
import AddNotes from './AddNotes';
import Noteitem from './Noteitem';
const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
   if(localStorage.getItem('token')){ 
      getNotes();
  }
    else{
      navigate('/Login');
    }
   
    //eslint-disable-next-line
  }, [])
  const updateNote = (currentNote) => {
    ref.current.click()
   setNote({id:currentNote._id, etitle:currentNote.title,description:currentNote.edescription,etag:currentNote.tag})
  }
  const ref = useRef(null)
  const refclose=useRef(null);
  const [note, setNote] = useState({ id:"",  etitle: "", edescription: "", etag: "default" })
  
  const handleclick = (e) => {
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refclose.current.click();
      // addNote(note.title,note.description,note.tag);
      props.showAlert("Note Update Successfully","success")

  }
  const onChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (

    <>
      <AddNotes showAlert={props.showAlert} />
      <button type="button" ref={ref} class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Notes</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
                <div className="mb-3">
                    <label htmlfor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlfor="description" className="form-label" >Description</label>
                    <textarea type="text" className="form-control"name="edescription" id="edescription" value={note.edescription} cols="30" rows="10"onChange={onChange} ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlfor="tag" className="form-label" >Tag</label>
                    <input className="form-control"name="etag" id="etag" value={note.etag} cols="30" rows="10"onChange={onChange} ></input>
                </div>
            </form>
            </div>
            <div className="modal-footer">
              <button  ref={refclose}type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleclick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div classNameName="row my-3">
        <h1>Your Notes</h1>
        <div className="container">
          {notes.length===0 && 'No Notes To Display'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note}  showAlert={props.showAlert} />
        })}
      </div></>
  )
}

export default Notes;
