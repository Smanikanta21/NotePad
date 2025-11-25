"use client"
import { React, useState, useEffect } from 'react'
import { LogIn, EyeClosed, Eye } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'
const SignupPage = () => {
  const router = useRouter();

  const[loading,setLoading] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [confshowPassword, setConfShowPassword] = useState(false);
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const HandleGooglesignIn = async () => {
    setLoading(true)
    window.open(`${url}/auth/google`, '_self');
    setLoading(false)
  }

  const CreateSignUp = async (e) => {
    e.preventDefault();
    setLoading(true)
    try{
      await axios.post(`${url}/auth/signup`, { name, email, password });
    router.push('/login');
    setLoading(false)
    }catch(error){
      console.error('Error signing up:', error);
      setLoading(false)
      toast.error('Error signing up, please try again.');
    }

  };


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-transparent">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }
  return (
    <div>
      <img src={'/bg-assets.jpg'} aria-hidden="true" className='fixed inset-0 -z-10 left-[-10%] md:left-[-20%] w-[70%] md:w-[60%] lg:w-[50%] -scale-x-100 object-cover pointer-events-none opacity-90 blur-2xl transform-gpu' alt="background" />
      <div className='relative flex flex-col h-screen justify-center items-center z-20'>
        <div className='flex items-center h-12'>
          <h1 className='md:flex text-4xl font-extrabold mb-9'>NotePad</h1>
        </div>
        <div className='flex md:flex-row flex-col justify-evenly rounded-xl md:rounded-none px-6 md:px-16 w-[90vw] md:w-[60vw] h-auto md:h-[65vh] py-6 md:py-18 backdrop-blur-3xl shadow-xl'>
          {/* Input tags */}
          <div className='flex flex-col justify-center items-center gap-4'>
            <h1 className='text-4xl font-bold'>Sign Up</h1>
            <input type="text" placeholder='Enter Name' onChange={(e) => setName(e.target.value)} className='border-b p-2.5 w-full text-lg md:w-[18vw] text-start transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-400' />
            <input type="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} className='border-b p-2.5 w-full text-lg md:w-[18vw] text-start transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-400' />
            <div className="relative w-full md:w-[22vw] lg:w-[18vw]">
              <input type={showPassword ? "text" : "password"} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} className="border-b p-2.5 text-lg w-full md:w-[18vw] text-start transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-400" />
              <button type="button" className="absolute right-2 top-3 text-sm text-black" onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <EyeClosed /> : <Eye />}</button>
            </div>
            <div className="relative w-full md:w-[22vw] lg:w-[18vw]">
              <input type={confshowPassword ? "text" : "password"} placeholder="Confirm Password" onChange={(e) => setConfPassword(e.target.value)} className="border-b p-2.5 text-lg w-full md:w-[18vw] text-start transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-400" />
              <button type="button" className="absolute right-2 top-3 text-sm text-black" onClick={() => setConfShowPassword(prev => !prev)}>{confshowPassword ? <EyeClosed /> : <Eye />}</button>
            </div>
            <button onClick={CreateSignUp} className='py-3 px-6 w-[60vw] md:w-auto rounded-xl text-xl bg-blue-600 mt-3 md:m-0 text-white shadow-xl hover:shadow-2xl hover:cursor-pointer hover:scale-115 hover:opacity-90 transition-transform duration-300 ease-in-out'>Create Account</button>
          </div>
            <div className='hidden md:flex justify-center flex-col items-center gap-5'>
            <button className='p-2 flex flex-row items-center px-4.5 py-3 rounded-xl gap-3.5 bg-white hover:scale-115 hover:opacity-90 hover:transition-transform hover:cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out' onClick={HandleGooglesignIn}><img src={'/google.png'} className='w-7' alt="" />Sign Up With Google</button>
            <button className='p-2 flex flex-row items-center px-4.5 py-3.5 rounded-xl gap-3.5 bg-white hover:scale-115 hover:opacity-90 hover:transition-transform hover:cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out'><img src={'/github.png'} alt="" className='w-7' /> Sign Up With Github</button>
            <Link href='/login' className='p-2 flex flex-row items-center px-3.5 py-2 rounded-xl gap-3.5 bg-white hover:scale-115 hover:transition-transform hover:cursor-pointer shadow-xl hover:shadow-2xl '><LogIn size={30} />Already have an account?<br /> Login</Link>
          </div>
          <div className="md:hidden my-6 flex items-center">
            <div className="flex-1 border-t border-black"></div>
            <span className="px-4 text-sm text-gray-500">Or continue with</span>
            <div className="flex-1 border-t border-black"></div>
          </div>
          <div className='md:hidden gap-3 mt-5 flex flex-col items-center justify-center w-full px-4'>
            <div className='flex gap-6'>
              <button
                onClick={HandleGooglesignIn}
                className='w-8 transition-all duration-300 ease-in-out hover:opacity-90 hover:scale-115'
              >
                <img src={'/google.png'} alt="Google" />
              </button>
              <img src={'/github.png'} alt="GitHub" className='w-8 transition-all duration-300 ease-in-out hover:opacity-90 hover:scale-115' />
            </div>
            <div className='flex flex-col'>
              <Link href='/login' className='hover:text-blue-600' >Already have an account</Link>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full bg-indigo-50 text-center py-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} NotePad — All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default SignupPage;