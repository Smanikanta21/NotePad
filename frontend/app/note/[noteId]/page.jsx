"use client"
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { FloatingDock } from "../../components/ui/floating-dock";
import {IconHome, } from "@tabler/icons-react"

const NoteDetail = () => {
    const params = useParams()
    const noteId = params?.noteId
    const router = useRouter()
    const url = process.env.NEXT_PUBLIC_BACKEND_URL
    const [note, setNote] = useState(null)
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState('')
    const[vscodeready,setVscodeReady]=useState(false);
    const[togglevscode,setToggleVscode]=useState(false);


    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await fetch(`${url}/notes/note/${noteId}`, {
                    method: 'GET',
                    credentials: 'include',
                })
                if (res.ok) {
                    const data = await res.json()
                    console.log(data);
                    setNote(data.note)
                    setContent(data.note.content || '')
                    setTimeout(() => {
                        setVscodeReady(true);
                    }, 5000)
                } else if (res.status === 401) {
                    router.push('/login')
                } else {
                    console.error('Failed to fetch note:', res.status, res.statusText)
                    toast.error('Failed to fetch note')
                }
            } catch (error) {
                toast.error('Error fetching note: ' + error.message)
                console.error('Error fetching note:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchNote()
        console.log(content);
    }, [noteId])

    const toggleVscode = () => {
        setToggleVscode(!togglevscode);
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`${url}/notes/update/${noteId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ content }),
            })
            if (res.ok) {
                toast.success('Note saved successfully')
            } else {
                toast.error('Failed to save note')
            }
        } catch (error) {
            toast.error('Error saving note: ' + error.message)
        }
    }

    if (loading) return <p className="text-center mt-10">Loading...</p>
    if (!note) return <p className="text-center mt-10">Note not found</p>

    return (
        <div className="flex flex-row bg-gray-100">
            <div className={`bg-white shadow-lg rounded-lg p-6 ${togglevscode ? 'w-1/2' : 'w-full'} h-screen`}>
                <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
            </div>
            {togglevscode && <div className='bg-white shadow-lg rounded-lg w-1/2 h-screen'>
                {vscodeready ? (
                    <iframe
                        src="http://localhost:8080"
                        title="VS Code Editor"
                        className="w-full h-screen border-0"
                    ></iframe>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-xl mb-4">Setting up your VS Code environment...</p>
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
                    </div>
                )}
            </div>}
        </div>
    )
}

export default NoteDetail
