import React from 'react'
import bg from '../assets/bg-assets.jpg'
import google from '../assets/google.png'
import github from '../assets/github.png'
import { LogIn } from 'lucide-react'
import { BrowserRouter,Link } from 'react-router-dom'

const SignupPage = () => {
  console.log("Signup rendered")
  return (
    <div>
      <div className='z-10 fixed md:-top-96 md:flex md:justify-center w-full'>
        <img src={bg} className='md:w-[70vw]' alt="background" />
      </div>
      <div className='relative flex flex-col h-screen justify-center items-center z-20'>
        <div className='flex items-center h-12'>
          <h1 className='md:flex text-4xl font-extrabold mb-9'>NotePad</h1>
        </div>
        <div className='flex md:flex-row flex-col justify-evenly rounded-xl md:rounded-none px-16 md:w-[60vw] h-[60vh] md:h-[50vh] backdrop-blur-3xl shadow-xl'>
          <div className='flex flex-col justify-center items-center gap-4'>
            <h1 className='text-4xl font-bold'>Sign Up</h1>
            <input type="text" placeholder='Enter Name' className='border-b py-2.5 md:w-[15vw] text-start' />
            <input type="email" placeholder='Enter Email' className='border-b py-2.5 md:w-[15vw] text-start' />
            <input type="password" placeholder='Enter Password' className='border-b py-2.5 md:w-[15vw] text-start' />
            <button className='py-3 px-6 rounded-xl text-xl bg-blue-600 text-white hover:shadow-2xl hover:cursor-pointer hover:scale-110 transition-transform'>Create Account</button>
          </div>
          <div className='hidden md:flex justify-center flex-col items-center gap-5'>
            <button className='p-2 flex flex-row items-center px-4.5 py-3 rounded-xl gap-3.5 bg-white hover:scale-105 hover:transition-transform hover:cursor-pointer hover:shadow-xl '><img src={google} className='w-7' alt="" />Sign Up With Google</button>
            <button className='p-2 flex flex-row items-center px-4.5 py-3.5 rounded-xl gap-3.5 bg-white hover:scale-105 hover:transition-transform hover:cursor-pointer hover:shadow-xl '><img src={github} alt="" className='w-7' /> Sign Up With Github</button>
            <Link to='/login' className='p-2 flex flex-row items-center px-3.5 py-2 rounded-xl gap-3.5 bg-white hover:scale-105 hover:transition-transform hover:cursor-pointer hover:shadow-xl '><LogIn size={30}/>Already have an account?<br /> Login</Link>
          </div>
          <div className='md:hidden gap-3 flex flex-col items-center justify-center'>
            <div className='flex gap-3'>
              <img src={google} className='w-8' alt="Google" />
              <img src={github} alt="GitHub" className='w-8' />
            </div>
            <div className='flex flex-col'>
              <Link to='/login' className='hover:text-blue-600' >Already have an account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage;