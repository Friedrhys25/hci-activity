import React from 'react'
import { useNavigate } from "react-router-dom";

const Todolistpage = () => {
    const navigate = useNavigate();

    const handleExit = () => {
   if (window.confirm("Are you sure you want to exit?")) {
     navigate("/mainmenu");
   }
 };

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-gray-100'>
        <div className='bg-white shadow-lg rounded-2xl p-8 w-96 text-center'>
            <h1 className='text-2xl font-bold mb-4'>To-Do List</h1>

            <textarea id="todotext"  className='border rounded-sm  h-20 w-full mt-5 '></textarea>

            <div className='flex flex-row justify-between'>
                <button className='bg-emerald-600 text-white px-4 py-2  ml-2 mr-2  rounded-lg w-full font-bold hover:bg-emerald-700 transition mt-5'>
                    Add
                </button>
                
                <button className='bg-emerald-600 text-white px-4 py-2  ml-2 mr-2  rounded-lg w-full font-bold hover:bg-emerald-700 transition mt-5'>
                    Clear
                </button>

            </div>
            
            <button onClick={handleExit} className='bg-red-600 text-white px-4 py-2 rounded-lg w-full font-bold hover:bg-red-700 transition mt-5'>
                Exit
            </button>

        </div>
    </div>
  )
}

export default Todolistpage
