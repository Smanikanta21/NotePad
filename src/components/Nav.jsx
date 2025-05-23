import { React, useState, useEffect } from 'react'
import { LucideMenu, Sun, Moon,Ellipsis } from 'lucide-react'
import { Link } from 'react-router-dom'
const Nav = () => {
    const[theme,SetTheme]=useState(false)
    const[showMenu,SetShowMenu]=useState(false)

    useEffect(()=> {
      document.body.classList.remove('light','dark')
      document.body.classList.add(theme ? 'dark':'light')
    },[theme])
  return (
    <div className='items-center justify-center flex mt-2 relative'>
        <div className={`md:flex text-2xl font-medium justify-center items-center w-[90%] md:flex-row md:items-center md:justify-between z-10 md:text-3xl px-4 py-2 rounded-3xl shadow-2xl ${theme ? "bg-black text-white shadow-white shadow-2xl" : "bg-white text-black shadow-2xl"}`}>
            <div className='flex justify-between items-center'>
                <div className='md:hidden relative'><button onClick={()=>SetShowMenu(!showMenu)}><LucideMenu/></button></div>
                <div><Link to="/">NotePad</Link></div>
                <div className='md:hidden'><button onClick={()=> {SetTheme(prev => !prev)}}>{theme ? <Sun/> : <Moon/>}</button></div>
            </div>
            <div className='md:flex hidden md:gap-4'>
                <div className='flex justify-center items-center'><button onClick={()=> {SetTheme(prev => !prev)}}>{theme ? <Sun size={30}/> : <Moon size={30}/>}</button></div>
                <Link to="/home">Home</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/about">About</Link>
            </div>
        </div>
        {showMenu && (
          <div className="absolute top-20 left-4 right-4 md:hidden bg-white p-4 rounded-xl shadow-lg z-50 flex flex-col gap-2">
            <Link to="/home">Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
          </div>
        )}
    </div>
  )
}

export default Nav