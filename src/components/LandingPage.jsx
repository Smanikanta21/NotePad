import { Notebook } from "lucide-react";
import bg from '../assets/bg-assets.jpg'
import instagram from '../assets/insta.png'
import github from '../assets/github.png'
import linkedin from '../assets/linkedin.png'
import { useNavigate,Link } from "react-router-dom";
const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="relative min-h-screen">
                <div className="absolute inset-0 z-0">
                    <img src={bg} alt="" className="absolute -top-16 -left-24 md:-top-36 md:-left-52 w-64 md:w-2/4 -scale-x-100" />
                    <div className="absolute inset-0"></div>
                </div>
                <div className="relative z-10">
                    <div className="fixed top-0 left-0 w-full z-30 backdrop-blur-sm shadow-md border-b border-white/20 pb-3.5">
                        <nav className="flex md:ml-11 w-full md:w-11/12 md:flex-row gap-4 md:gap-7 justify-center pt-6 md:justify-around md:pt-2 flex-col items-center">
                            <div className="flex gap-5 flex-row justify-center items-center">
                                <Notebook className="bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" size={30} />
                                <a href="#" className="text-4xl font-bold">NotePad</a>
                            </div>

                            <div className="flex md:hidden items-center gap-8 font-mono text-xl text-blue-600">
                                <a href="#About">About</a>
                                <a href="#Stacks">Stacks</a>
                                <a href="#Contact">Contact</a>
                            </div>

                            <div className="md:flex hidden items-center gap-11 font-mono text-3xl text-blue-600">
                                <a href="#About" className="group transition duration-300 transform hover:scale-110 relative cursor-pointer">
                                  <span className="pb-1 border-b-2 border-transparent group-hover:border-blue-600 transition-all duration-300 hover:font-extrabold ">About</span>
                                </a>
                                <a href="#Stacks" className="group transition duration-300 transform hover:scale-110 relative cursor-pointer">
                                  <span className="pb-1 border-b-2 border-transparent group-hover:border-blue-600 transition-all duration-500 hover:font-extrabold ">Stacks</span>
                                </a>
                                <a href="#Contact" className="group transition duration-300 transform hover:scale-110 relative cursor-pointer">
                                  <span className="pb-1 border-b-2 border-transparent group-hover:border-blue-600 transition-all duration-500 hover:font-extrabold ">Contact</span>
                                </a>
                            </div>
                            <div className="hidden md:block hover:shadow-2xl hover:scale-105 transition duration-300 items-center p-3 text-white rounded-xl bg-blue-600">
                                <Link className="text-xl" to="/login">Get Started</Link>
                            </div>
                        </nav>
                    </div>
                    <div className="flex md:flex-row flex-col gap-6 md:gap-0 justify-center items-center h-screen lg:px-32 md:px-18 text-center backdrop-blur-md">
                        <h1 className="text-5xl md:mt-0 mt-10 px-6 md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">
                            Handwrite, brainstorm, and build ideas with your team — all in one beautiful, collaborative space
                        </h1>
                            <div className="block md:hidden items-center p-3 text-white rounded-xl bg-blue-600">
                                <Link className="text-xl " to="/login">Get Started</Link>
                            </div>
                    </div>

                    <div id="About" className="relative z-10 py-36 lg:py-60 px-6 md:px-32 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-6">About NotePad</h2>
                        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                            <span className="font-semibold">NotePad</span> is a collaborative handwriting and note-taking platform built for teams and individuals who value creativity and clarity.
                            Whether you're planning your next big idea, working on group projects, or just jotting thoughts on the go — NotePad offers a beautiful, intuitive space to work.
                        </p>
                        <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                            Built with a focus on real-time sync, handwriting support, and seamless cloud integration, NotePad makes capturing and sharing ideas effortless across all your devices.
                        </p>
                    </div>


                    <div id="Stacks" className="relative z-10 py-36 lg:py-48 px-6 md:px-32 text-center bg-gradient-to-b from-white via-indigo-50 to-purple-50">
                        <h2 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-10">Tech Stack</h2>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-16">
                            Here are the technologies powering <span className="font-semibold text-indigo-800">NotePad</span>.
                            Each tool was chosen to provide speed, flexibility, and a beautiful user experience.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                            <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-xl transition">
                                <p className="font-semibold text-indigo-700">React.js</p>
                            </div>
                            <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-xl transition">
                                <p className="font-semibold text-purple-700">Tailwind CSS</p>
                            </div>
                            <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-xl transition">
                                <p className="font-semibold text-pink-600">Firebase</p>
                            </div>
                            <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-xl transition">
                                <p className="font-semibold text-indigo-700">Vite</p>
                            </div>
                            <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-xl transition">
                                <p className="font-semibold text-purple-700">Lucide Icons</p>
                            </div>
                            <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-xl transition">
                                <p className="font-semibold text-pink-600">React Router</p>
                            </div>
                            {/* <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-xl transition">
                                <p className="font-semibold text-indigo-700">Authlib / Flask (alt auth)</p>
                            </div> */}
                            <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-xl transition">
                                <p className="font-semibold text-purple-700">Netlify / Vercel</p>
                            </div>
                        </div>
                    </div>

                    <section id="Contact" className="w-full px-6 py-16 md:py-24">
                        <div className="max-w-6xl mx-auto bg-indigo-50 rounded-[3rem] p-10 md:p-16 shadow-xl relative overflow-hidden" style={{ backgroundImage: 'url(https://keynote.tailwindui.com/_next/static/media/background-newsletter.488a0204.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top -80px' }}>

                            <div className="md:flex hidden justify-center w-full md:h-[60vh] py-20 ">
                                <div className="w-[80vw] h-full bg-cover gap-48 bg-center rounded-br-full flex justify-evenly pr-10 items-center rounded-tr-full" style={{ backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center top -280px', width: '80vw' }} >
                                    <div className="flex gap-4 px-8 flex-col">
                                        <h1 className="font-bold text-3xl">Contact Info</h1>
                                        <p>Email: siraparapuabhinay21@gmail.com</p>
                                        <div className="flex justify-center gap-4">
                                            <a href="https://www.instagram.com/abhi._.nay"><img src={instagram} alt="Instagram" className="rounded-lg w-10 h-10 hover:scale-120 cursor-pointer transition-transform" /></a>
                                            <a href="https://github.com/Smanikanta21"><img src={github} alt="GitHub" className="rounded-lg w-10 h-10 hover:scale-120 cursor-pointer transition-transform" /></a>
                                            <a href=""><img src={linkedin} alt="LinkedIn" className="rounded-lg w-10 h-10 hover:scale-120 cursor-pointer transition-transform" /></a>
                                        </div>
                                    </div>
                                    <div className=" shadow-2xl h-[30vh] flex-col w-[30vw]  overflow-hidden rounded-br-full rounded-tr-full flex justify-evenly items-center">
                                        <h1 className="text-3xl font-bold text-white drop-shadow-lg">Contact Me</h1>
                                        <textarea
                                        
                                            placeholder="Enter Message"
                                            className="border focus:outline-none focus:ring-2 text-center border-gray-300  resize h-[20vh] text-pretty leading-snug w-[20vw] focus:ring-blue-600 flex items-center justify-evenly px-6" />
                                    </div>
                                </div>
                            </div>

                            <div className="md:hidden py-20 flex justify-center items-center ">
                                <div className="flex flex-col w-11/12 max-w-md gap-6 p-6 rounded-xl shadow-lg border border-gray-200 text-center">
                                    <h1 className="text-2xl font-bold text-indigo-700">Contact Us</h1>
                                    <p className="text-gray-700 text-sm">Email: siraparapuabhinay21@gmail.com</p>
                                    <div className="flex justify-center gap-4">
                                        <a href="https://www.instagram.com/abhi._.nay"><img src={instagram} alt="Instagram" className="rounded-lg w-10 h-10 hover:scale-120 cursor-pointer transition-transform" /></a>
                                        <a href="https://github.com/Smanikanta21"><img src={github} alt="GitHub" className="rounded-lg w-10 h-10 hover:scale-120 cursor-pointer transition-transform" /></a>
                                        <a href=""><img src={linkedin} alt="LinkedIn" className="rounded-lg w-10 h-10 hover:scale-120 cursor-pointer transition-transform" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                                <div className="text-center lg:text-left">
                                    <h2 className="text-4xl md:text-5xl font-bold text-indigo-900">Stay up to date</h2>
                                    <p className="mt-4 text-lg text-indigo-800 max-w-md">
                                        Get updates on all of our events and be the first to get notified when tickets go on sale.
                                    </p>
                                </div>
                                <div className="w-full max-w-md">
                                    <p className="mb-2 text-indigo-800 font-semibold text-center lg:text-left">Sign up to our newsletter ↓</p>
                                    <form className="flex flex-col sm:flex-row items-center gap-3">
                                        <input type="email" placeholder="Email address" className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow w-full" />
                                        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition">Sign up today</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>




                <footer className="w-full bg-indigo-50 text-center py-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                        © {new Date().getFullYear()} NotePad — All rights reserved.
                    </p>
                </footer>

            </div>





        </>

    )
}

export default LandingPage;
// backdrop-blur-3xl