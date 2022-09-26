import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {

  const [mode,setMode]=useState('light');
  const[text,setText]=useState('Enable Dark Mode')
   const toggleMode =()=>{
    if(mode==='light'){
    setMode('dark')
    document.body.style.backgroundColor = '#042743';
      setText('Enable Light Mode')
      document.body.style.color='white'
    }
    else{
      setMode('light');
      setText('Enable Dark Mode ')
      document.body.style.backgroundColor = '#fff';
      document.body.style.color='black'
    }

   }

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar mode={mode} toggleMode={toggleMode} text={text}/>
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route  exact path="/" element={<Home showAlert={showAlert}/>}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/Login"  element={<Login  showAlert={showAlert}/>}></Route>
              <Route exact path="/SignUp"  element={<Signup showAlert={showAlert} />}></Route>
            </Routes>
          </div>
          <Footer/>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
