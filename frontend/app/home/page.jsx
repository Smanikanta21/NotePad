"use client"
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Nav from '../../components/Nav'
import { toast } from 'react-toastify'
const Home = () => {
    const [modal, setModal] = useState(false)
    const router = useRouter();
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [bringnotes, setBringNotes] = useState([])
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await fetch(`${url}/notes/fetchnotes`, {
                    method: 'GET',
                    credentials: 'include',
                })
                if (res.status === 401) {
                    router.push('/login')
                    return;
                }

                if (res.ok) {
                    const data = await res.json();
                    setBringNotes(data);
                } else {
                    console.error('Failed to fetch notes:', res.status, res.statusText);
                    toast.error('Failed to fetch notes');
                }
            } catch (error) {
                toast.error('Error fetching notes: ' + error.message);
                console.error('Error fetching notes:', error);
            }
        }
        fetchNotes();
    }, [])

    useEffect(() => {
        const theme = localStorage.getItem('theme')
        console.log(theme)
    }, [])

    const modalRef = useRef(null)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setModal(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [modalRef])


    const createNotes = async () => {
        const value = document
            .getElementById("title")
            .value.trim();
        if (value.length === 0) {
            toast.error("Please enter a title");
            return;
        }

        try {
            const res = await fetch(
                `${url}/notes/create`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ title: value }),
                }
            );

            if (res.ok) {
                const data = await res.json();
                toast.success("Note created successfully");
                document.getElementById("title").value = "";
                setModal(false);

                const notesRes = await fetch(`${url}/notes/fetchnotes`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (notesRes.ok) {
                    const notesData = await notesRes.json();
                    setBringNotes(notesData);
                }
            } else {
                toast.error("Failed to create note");
            }
        } catch (error) {
            console.error("Error creating note:", error.message);
            toast.error("Error creating note, please try again.");
        }
    }

    return (
        <>
            <Nav />
            <div>
                <div className="h-screen">
                    <div className="mt-20 mx-4 p-4">
                        {bringnotes.length === 0 ? (
                            <p className="h-screen flex justify-center items-center text-xl text-center text-gray-500">No notes yet.</p>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {bringnotes.map((note, idx) => (
                                    <div onClick={() => router.push(`/note/${note._id}`)} key={idx} className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-200">
                                        <h3 className="text-lg font-semibold">{note.title}</h3>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="fixed bottom-6 right-5">
                        <button onClick={() => setModal(true)} className="text-2xl rounded-full bg-blue-600 px-4 py-3 font-bold cursor-pointer shadow-md hover:shadow-2xl hover:scale-110 transition-all duration-200 bottom-6 text-white">Add Note</button>
                    </div>
                    {modal && (
                        <div className="fixed inset-0 bg-opacity-50 flex items-center backdrop-blur-xs justify-center z-50">
                            <div ref={modalRef} className="bg-white p-6 rounded-lg  shadow-2xl w-96 max-w-full">
                                <h2 className="text-xl font-bold mb-4">Add Note</h2>
                                <textarea className="w-full h-12 p-2 text-center border rounded-lg" id="title" placeholder="Enter Title" />
                                <div className="flex flex-col mt-4 gap-2">
                                    <div>
                                        <p className="font-bold">Tags:</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-6 h-6 rounded-xl cursor-pointer bg-red-500 hover:scale-110 transition-transform duration-200"></div>
                                        <div className="w-6 h-6 rounded-xl cursor-pointer bg-green-500 hover:scale-110 transition-transform duration-200"></div>
                                        <div className="w-6 h-6 rounded-xl cursor-pointer bg-blue-500 hover:scale-110 transition-transform duration-200"></div>
                                        <div className="w-6 h-6 rounded-xl cursor-pointer bg-yellow-500 hover:scale-110 transition-transform duration-200"></div>
                                        <div className="w-6 h-6 rounded-xl cursor-pointer bg-purple-500 hover:scale-110 transition-transform duration-200"></div>
                                        <div className="w-6 h-6 rounded-xl cursor-pointer bg-pink-500 hover:scale-110 transition-transform duration-200"></div>
                                        <div className="w-6 h-6 rounded-xl cursor-pointer bg-gray-500 hover:scale-110 transition-transform duration-200"></div>
                                        <div className="w-6 h-6 rounded-xl cursor-pointer bg-black hover:scale-110 transition-transform duration-200"></div>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4 gap-2">
                                    <button onClick={createNotes} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer">{" "}Save</button>
                                    <button onClick={() => setModal(false)} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer">Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Home
