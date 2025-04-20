import { Link, useNavigate } from 'react-router-dom';
import React, { useContext } from "react";
import { AuthContext } from './assets/AuthContext';

const Navbar = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    navigate("/login"); 
  };

  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full bg-black text-white'>
      <h1 className='text-blue-400 text-2xl font-bold'>ChatApp</h1>
      <div>
        {!authState.status ? (
          <Link to="/login" className="text-white pr-4">Sign In</Link>
        ) : (
          <>
            <span className="pr-4">{authState.username}</span>
            <button
              onClick={logout}
              className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
