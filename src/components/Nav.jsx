import { React, useState, useEffect } from 'react'
import { LucideMenu, Sun, Moon,Ellipsis,NotebookText } from 'lucide-react'
import { Link } from 'react-router-dom'
const Nav = () => {
    const[theme,SetTheme]=useState(false)
    const[showMenu,SetShowMenu]=useState(false)
    const[savedTheme, setSavedTheme] = useState(localStorage.getItem('theme') || 'light');
    useEffect(() => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        SetTheme(savedTheme === 'dark');
      }
    }, []);
    const[mdMenu,setMdMenu]=useState(false)

    useEffect(()=> {
      document.body.classList.remove('light','dark')
      document.body.classList.add(theme ? 'dark':'light')
      const savedTheme = localStorage.getItem('theme');
    },[theme])
  return (
    <div className='items-center justify-center flex mt-2 relative'>
        <div className={`md:flex text-2xl font-medium justify-center items-center w-[90%] md:flex-row md:items-center md:justify-between z-10 md:text-3xl px-4 py-2 rounded-3xl shadow-2xl ${theme ? "bg-black text-white shadow-white shadow-2xl" : "bg-white text-black shadow-2xl"}`}>
            <div className='flex items-center'>
                <div className='md:hidden relative'><button onClick={()=>SetShowMenu(!showMenu)}><LucideMenu/></button></div>            
                <Link to="/" className='flex items-center mx-22 md:mx-0 md:gap-2'>
                    <NotebookText size={30} className='text-orange-400' />
                    <span className='text-lg'>NotiePad</span>
                </Link>
            </div>
            <div className='md:flex hidden md:gap-4 text-xl' id='nav-links'>
                <div className='flex items-center'><button onClick={()=> {SetTheme(prev => !prev)}}>{theme ? <Sun size={30}/> : <Moon size={30}/>}</button></div>
                <Link to="/" className="group relative transform transition-transform duration-300 hover:scale-110">
                  <span className="transition-colors duration-300 group-hover:text-orange-400">Home</span>
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/contact" className="group relative transform transition-transform duration-300 hover:scale-110">
                  <span className="transition-colors duration-300 group-hover:text-orange-400">Contact</span>
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/about" className="group relative transform transition-transform duration-300 hover:scale-110">
                  <span className="transition-colors duration-300 group-hover:text-orange-400">About</span>
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>  
                <Ellipsis size={30} className='hidden md:block mr-2' onClick={() => {const hide = document.getElementById('nav-links')
                  if (hide.style.display === 'none' || hide.style.display === '') {
                    hide.style.display = 'flex';
                  } else {
                    hide.style.display = 'none';
                  }
                }
                
              } />
            </div>
        </div>
        {showMenu && (
          <div className="absolute top-20 left-4 right-4 md:hidden bg-white p-4 rounded-xl shadow-lg z-50 flex flex-col gap-2">
            <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
          </div>
        )}
    </div>
  )
}

export default Nav