import React from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar'

const Mainmenu = () => {
  return (
    <div className='h-screen w-screen flex justify-center bg-gray-100'>
      <Navbar/>
        <div className='bg-white shadow-lg rounded-2xl p-8 w-96 self-center flex flex-col space-y-4'>

          <h1 className='text-4xl font-bold mb-5 text-center'>
            Menus
          </h1>
          
          <Menubtn btnname="1. Calculator" to="/calculator"/>
          <Menubtn btnname="2. Grade checker" to="/gradechecker"/>
          <Menubtn btnname="3. To-Do List" />
          <Menubtn btnname="4. About us" />
          <Menubtn btnname="5. Exit" to = "/"/>

        </div>

    </div>
  )
}

export function Menubtn({ btnname, to }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (btnname.includes("Exit")) {
      const confirmed = window.confirm("Are you sure you want to exit?");
      if (!confirmed) return; // cancel navigation
    }
    navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className="text-left pl-5 text-2xl font-bold bg-emerald-600 text-white rounded-md p-2 hover:bg-emerald-700 transition duration-300"
    >
      {btnname}
    </button>
  );
}



export default Mainmenu
