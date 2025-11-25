"use client"
import { useEffect, useState } from 'react'
import { Eye, EyeClosed, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'
const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    
    const HandleGooglesignIn = async () => {
        setLoading(true);
        window.open(`${url}/auth/google`, '_self');
        setLoading(false);

    }
    const HandleLoginbutton = async () => {
        setLoading(true);
        try{
            const response = await axios.post(`${url}/auth/login`, 
                { email, password }, 
                { withCredentials: true, credentials: 'include' });
            console.log('login successfull')
            toast.success("Login successful");
            router.push('/home');
        }catch(error){
            console.error('Login failed:', error);
            toast.error("Login failed. Please check your credentials.");
        }
        setLoading(false);
    }


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-none">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }
    return (
        <div>
            <img src="/bg-assets.jpg" aria-hidden="true" className="fixed inset-0 -z-10 left-[-10%] md:left-[-20%] w-[70%] md:w-[60%] lg:w-[50%] -scale-x-100 object-cover pointer-events-none opacity-90 blur-2xl transform-gpu" alt="" />
            <div className='relative flex flex-col min-h-screen justify-center items-center z-20 ' >
                <div className='flex items-center h-12'><h1 className='md:flex text-4xl font-extrabold mb-9'>NotePad</h1></div>
                <div className='flex  md:flex-row flex-col justify-evenly rounded-xl md:rounded-none px-16 p-4 md:p-8 w-[90vw] md:w-[55vw] lg:w-[50vw] h-[60vh] md:h-[50vh] backdrop-blur-3xl shadow-xl' >
                    <form onSubmit={HandleLoginbutton} className='flex flex-col justify-center items-center gap-4 w-full md:w-auto'>
                        <h1 className='text-4xl font-bold'>Login</h1>
                        <input type="email" placeholder='Enter Email' className='border-b w-full px-2 py-2.5 md:w-[22vw] lg:w-[18vw] text-xl text-start transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-400' value={email} onChange={e => setEmail(e.target.value)} />
                        <div className="relative w-full md:w-[22vw] lg:w-[18vw]">
                            <input type={showPassword ? "text" : "password"} placeholder="Enter Password" className="border-b px-2  py-2.5 text-xl w-full md:w-[18vw] text-start transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-400" value={password} onChange={e => setPassword(e.target.value)} />
                            <button type="button" className="absolute right-2 top-3 text-sm text-black" onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <EyeClosed /> : <Eye />}</button>
                        </div>
                        <div className='flex'>
                            <a href="#" className=''>Forgot Password</a>
                        </div>
                        <button type="submit" className='py-2 md:py-3 md:m-0 px-6 rounded-xl text-xl bg-blue-600 text-white hover:shadow-2xl hover:cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out hover:opacity-90 '>Login</button>
                    </form>

                    {/* medium and large screens */}
                    <div className='hidden md:flex justify-center flex-col items-center gap-3 md:gap-5'>
                        <button className='p-2 flex flex-row items-center px-4.5 py-3 rounded-xl gap-3.5 bg-white hover:scale-115 hover:transition-transform cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out hover:opacity-90 ' onClick={HandleGooglesignIn}><img src="/google.png" className='w-7' alt="" />Sign In With Google</button>
                        <button className='p-2 flex flex-row items-center px-4.5 py-3.5 rounded-xl gap-3.5 bg-white hover:scale-115 hover:transition-transform cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out hover:opacity-90 '><img src="/github.png" alt="" className='w-7' /> Sign In With Github</button>
                        <Link href="/signup" className="p-2 flex flex-row items-center px-3.5 py-2 rounded-xl gap-3.5 bg-white hover:scale-115 transition-transform cursor-pointer shadow-xl hover:shadow-2xl"><UserRound size={30} /> Don't Have Account? <br /> Create Account</Link>
                    </div>

                    {/* Small Screens */}
                    <div className="md:hidden my-6 flex items-center">
                        <div className="flex-1 border-t border-black"></div>
                        <span className="px-4 text-sm text-gray-500">Or continue with</span>
                        <div className="flex-1 border-t border-black"></div>
                    </div>
                    <div className='md:hidden mt-5 px-4 w-full flex flex-col items-center justify-center gap-4'>
                        <div className='flex gap-6 p-2'>
                            <img src="/google.png" onClick={HandleGooglesignIn} className='w-8 shadow-2xl transition-all duration-300 ease-in-out hover:opacity-90 hover:scale-105' alt="" />
                            <img src="/github.png" alt="" className='w-8 shadow-2xl transition-all duration-300 ease-in-out hover:opacity-90 hover:scale-105' />
                        </div>
                        <div className='flex flex-col w-full items-center'>
                            <Link href="/signup" className='hover:text-blue-600'>Don't Have Account?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;