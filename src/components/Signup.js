import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

  //const host = "http://localhost:5000"
  const [credintials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",

  })
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credintials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    console.log(json);
 if(json.success){
    // redirect
    localStorage.setItem('token', json.authtoken);
    props.showAlert("Account Created Successfully","success")
    navigate("/Login");
 }
 else{
  props.showAlert("Invilades Credintials","danger")
 }
  }
  const onChange = (e) => {
    setCredentials({ ...credintials, [e.target.name]: e.target.value })

  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3" >
          <label htmFor="name" className="form-label">Enter Your Name</label>
          <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} />
        </div>

        <div className="mb-3">
          <label htmFor="cpassword" className="form-label">Comform Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>



    </div>
  )
}

export default Signup