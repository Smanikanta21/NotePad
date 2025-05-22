import { React, useState } from 'react'
import { LucideMenu } from 'lucide-react'
import { Link } from 'react-router-dom'
const Nav = () => {
    const[showMenu,SetShowMenu]=useState(false)
  return (
    <div className='items-center justify-center flex mt-2 relative'>
        <div className='md:flex text-2xl font-medium justify-center items-center w-[90%] md:flex-row md:items-center md:justify-between z-10 md:text-3xl px-4 py-2 rounded-3xl shadow-2xl'>
            <div className='flex justify-between items-center'>
                <div className='md:hidden relative'><button onClick={()=>SetShowMenu(!showMenu)}><LucideMenu/></button></div>
                <div><Link to="/">NotePad</Link></div>
                <div></div>
            </div>
            <div className='md:flex hidden md:gap-4'>
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