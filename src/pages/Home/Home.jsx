import React from 'react'
import Addnote from '../../components/Add note/Addnote'
import Singelnotes from '../../components/Singel notes/Singelnotes'
import { LuNotepadText } from "react-icons/lu";
import { SiPinboard } from "react-icons/si";
import Pinnotes from '../../components/pin notes/Pinnotes';
const Home = () => {
  return (
    <>
    <div className='bg-cover w-full h-full backdrop-blur-sm '
    style={{
        backgroundImage: `url('/images/homebg.jpg')`, // Background image from public folder
      }}>
        <div className=' dark:bg-[#252933ea] bg-[#ffffffc2] w-full h-full pt-8'>
    <div className=' w-full'>
    <Addnote/>
    </div>
    <div className='flex gap-4 items-center'>
    <SiPinboard  className='ml-14 mt-8 text-3xl dark:text-[#da0e0e] text-[#202020] ' />
    <h2 className='font-bold  mt-8 font-sans text-2xl text-[#202020] dark:text-[#858582] '>Pin Notes</h2>
    </div>
    <Pinnotes/>
    <div className='flex gap-4 items-center'>
    <LuNotepadText className='ml-14 mt-8 text-3xl dark:text-[#858582] text-[#202020] ' />
    <h2 className='font-bold  mt-8 font-sans text-2xl text-[#202020] dark:text-[#858582] '>All Notes</h2>
    </div>
    <Singelnotes/>
    </div>
    </div>
    </>
    
  )
}

export default Home
