import { React, useState, useEffect } from 'react'
import { LucideMenu, Sun, Moon, Ellipsis, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import { signOut } from '../lib/auth'
const Nav = () => {
  const [theme, SetTheme] = useState(false)
  const [showMenu, SetShowMenu] = useState(false)
  const [savedTheme, setSavedTheme] = useState(localStorage.getItem('theme') || 'light');
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      SetTheme(savedTheme === 'dark');
    }
  }, []);
  const [mdMenu, setMdMenu] = useState(false)


  const signout = async() =>{
    try{
      await axios.post('https://notepad-backend-3fo1.onrender.com/auth/logout', { withCredentials: true });
      console.log('signedout successfull')
      window.location.href = '/login';
    }
    catch(error){
      console.error('Error signing out:', error);
      alert('Error signing out, please try again.');
    }
  }

  useEffect(() => {
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(theme ? 'dark' : 'light')
    const savedTheme = localStorage.getItem('theme');
  }, [theme])
  return (
    <div className='flex flex-row justify-center items-center mt-4 fixed top-0 left-0 right-0'>
      <div className={`md:flex backdrop-blur-sm text-2xl font-medium items-center w-full max-w-6xl flex-row md:items-center md:justify-center z-10 md:text-3xl px-4 py-2 rounded-3xl shadow-2xl bg-transparent`}>
        <div className='w-[90%] flex justify-between items-center'>
          <div className='flex items-center justify-center'>
            <div className='md:hidden relative'><button onClick={() => SetShowMenu(!showMenu)}><LucideMenu /></button></div>
            <Link to="/" className='flex items-center mx-22 md:mx-0 gap-4 md:gap-2'>
              <div className='bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl'>
                  <FileText size={24} className='text-white' />
                </div>
                <div className="md:flex md:flex-col md:items-start md:gap-0.5">
                  <h1 className="text-xl font-bold text-gray-900">NotePad</h1>
                  <p className="text-sm hidden md:block text-gray-600">Collaborative workspace</p>
                </div>
            </Link>
          </div>
          <div className='flex flex-row gap-3 justify-center items-center'>
            {/* <div className='md:flex md:items-center'><button onClick={() => { SetTheme(prev => !prev) }}>{theme ? <Sun size={30} className='text-yellow-400' /> : <Moon size={30} className='text-blue-600' />}</button></div> */}
            <div className='md:flex hidden md:gap-4 text-xl items-center justify-center' id='nav-links'>
              <Link to="/home" className="group relative transform transition-transform duration-300 hover:scale-110">
                <span className="transition-colors duration-300 group-hover:text-blue-600">DashBoard</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/profile" className="group relative transform transition-transform duration-300 hover:scale-110">
                <span className="transition-colors duration-300 group-hover:text-blue-600">Profile</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/contact" className="group relative transform transition-transform duration-300 hover:scale-110">
                <span className="transition-colors duration-300 group-hover:text-blue-600">Contact</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/settings" className="group relative transform transition-transform duration-300 hover:scale-110">
                <span className="transition-colors duration-300 group-hover:text-blue-600">Settings</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <button
                className='text-red-700 cursor-pointer hover:bg-red-600 hover:text-white py-1 px-2.5 rounded-md transition-colors duration-400'
                onClick={async () => { signout() }}>SignOut</button>
            </div>
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="absolute top-20 left-4 right-4 md:hidden bg-white p-4 rounded-xl shadow-lg z-50 flex flex-col gap-2">
          <Link to="/home">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/settings">Settings</Link>
          <button
            className='text-red-700 cursor-pointer hover:bg-red-600 hover:text-white py-1 px-2.5 rounded-md transition-colors duration-400'
            onClick={async () => { signout() }}>SignOut</button>
        </div>
      )}
    </div>
  )
}

export default Nav