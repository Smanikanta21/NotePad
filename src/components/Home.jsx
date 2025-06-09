import React, { use } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import { supabase } from '../server/suparbase'

const Home = () => {
  const [modal, setModal] = useState(false)
  const nav = useNavigate();

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    console.log(theme)
  }, [])


    return (
      <>
        <div>
          <div className='h-screen'>
              <div className='fixed bottom-6 right-5'>
                <button onClick={() => setModal(true)} className='text-2xl rounded-full bg-blue-600 p-2.5 shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-200 bottom-6 text-white'>Add Note</button>
              </div>
              {modal && (
                <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center z-50'>
                  <div className='bg-white p-6 rounded-lg shadow-2xl w-96 max-w-full'>
                    <h2 className='text-xl font-bold mb-4'>Add Note</h2>
                    <textarea className='w-full h-12 p-2 text-center border rounded-lg' id='tittle' placeholder='Enter Tittle'/>
                    <div className='flex justify-end mt-4 gap-2'>
                      <button
                        onClick={() => {const value = document.getElementById('tittle').value.trim()
                          if(value.length === 0){
                            alert('Please enter a tittle')
                          }else{
                           setModal(false)}}}
                        className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600'> Save</button>
                      <button
                        onClick={() => setModal(false)}
                        className='bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400'
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
    </>
  )
}

export default Home
