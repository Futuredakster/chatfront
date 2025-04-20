
import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom';
import axios from 'axios';
import Signup from './Signup';
import Interface from './Interface';
import { useState, useEffect } from 'react';
import { AuthContext } from './assets/AuthContext';
import Login from './Login';
import Navbar from './Navbar';
import './App.css'

function App() {
  const [authState, setAuthState] = useState({username:"", id:0, status:false});

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      // Handle the case where there is no access token (e.g., redirect to login page)
      setAuthState({...authState, status:false});
    } else{
    axios.get("https://chatbot-t2dr.onrender.com/users/auth", {
      headers: {
        accessToken: accessToken,
      },
    })
      .then((response) => {
        console.log("got a response", response);
        if (response.data.error) {
          setAuthState({...authState, status:false});
        } else {
          setAuthState({username:response.data.username, id:response.data.id, status:true,movie_id:response.data.movie_id });
        }
      });
    }
    
  },[]); 
  return (
    <div className="w-screen h-screen">
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/interface" element={<Interface />} />
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App
