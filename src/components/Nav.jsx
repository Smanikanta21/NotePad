import React from 'react'

const Nav = () => {
  return (
    <div className='items-center justify-center flex mt-2'>
        <div className='flex w-[90%] flex-row items-center justify-between z-10 text-3xl px-4 py-2 rounded-3xl shadow-2xl'>
            <div><a href="#">NotePad</a></div>
            <div className='flex gap-4'>
                <a href="#">Home</a>
                <a href="#">Contact</a>
                <a href="#">About</a>
            </div>
        </div>
    </div>
  )
}

export default Nav