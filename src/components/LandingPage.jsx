import { Notebook } from "lucide-react";
import bg from '../assets/bg-assets.jpg'
const LandingPage=()=>{
    return (
        <>
            <div className="relative min-h-screen">
                <div className="absolute inset-0 z-0">
                    <img src={bg} alt="" className="absolute -top-16 -left-24 md:-top-36 md:-left-52 w-64 md:w-2/4 -scale-x-100" />
                    <div className="absolute inset-0"></div>
                </div>
                <div className="relative z-10">
                    <div className="fixed top-0 left-0 w-full z-30 backdrop-blur-sm pb-3.5">
                      <nav className="flex md:ml-11 w-full md:w-11/12 md:flex-row gap-7 justify-center pt-6 md:justify-around md:pt-12 flex-col items-center">
                          <div className="flex md:hidden items-center gap-10 font-mono text-xl text-blue-600">
                              <a href="#About">About</a>
                              <a href="#">Contact</a>
                              <a href="#">Stacks</a>
                          </div>
                          <div className="flex gap-5 flex-row justify-center items-center">
                              <Notebook className="bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" size={30}/>
                              <a href="#" className="text-4xl font-bold">NotePad</a>
                          </div>
                          <div className="md:flex hidden items-center gap-11 font-mono text-3xl text-blue-600">
                              <a href="#About">About</a>
                              <a href="#">Contact</a>
                              <a href="#">Stacks</a>
                          </div>
                          <div className="hidden md:block items-center p-3 text-white rounded-xl bg-blue-600">
                              <a className="text-xl " href="#">Get Started</a>
                          </div>
                      </nav>
                    </div>
                    <div className="flex justify-center items-center h-screen lg:px-32 md:px-18 text-center backdrop-blur-md">
                        <h1 className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">
                            Handwrite, brainstorm, and build ideas with your team — all in one beautiful, collaborative space
                        </h1>
                    </div>
                </div>
            </div>


            <div id="About" className=" relative z-20 py-36 lg:py-60 px-6 md:px-32 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-6">About NotePad</h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                    <span className="font-semibold">NotePad</span> is a collaborative handwriting and note-taking platform built for teams and individuals who value creativity and clarity.
                    Whether you're planning your next big idea, working on group projects, or just jotting thoughts on the go — NotePad offers a beautiful, intuitive space to work.
                </p>
                <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                    Built with a focus on real-time sync, handwriting support, and seamless cloud integration, NotePad makes capturing and sharing ideas effortless across all your devices.
                </p>
            </div>


            <div>

            </div>


        </>
            
    )
}

export default LandingPage;