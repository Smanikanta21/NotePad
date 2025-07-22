import React from 'react'
import { Settings } from 'lucide-react'
const Setting = () => {
    return (
        <div className='h-screen flex items-center justify-center'>
            <div className='w-[95vw] h-screen border md:mt-32 mt-36'>
                <div className='flex justify-center items-center'><h1 className='md:text-5xl pt-2 font-bold text-2xl'>Settings</h1></div>
                <div className='flex items-center justify-center w-full py-5 border'>
                    <h1 className='flex justify-center gap-2'><Settings/>Appearance</h1>
                </div>
            </div>
        </div>
    )
}
export default Setting;