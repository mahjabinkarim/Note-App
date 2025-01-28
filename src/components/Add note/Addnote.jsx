import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import Popup from '../popup/Popup';
const Addnote = () => {

const [showpopup, setshowpopup ]= useState(false)

  return (
    <>
      <div onClick={()=>setshowpopup(!showpopup)} className='w-[200px] transition-all duration-[.4s] ml-14 h-[200px] rounded-md border-[2px] border-[#a0ebf8] flex gap-5 items-center justify-center hover:bg-[#d1cece7a] dark:hover:bg-[#58646b7a]    '>
        <FaPlus className='text-2xl text-[#5a5a59]' />
        <h2 className=' font-bold font-sans text-2xl text-[#5a5a59]  '>Add note</h2>
      </div>
      
      <Popup cardvalue={showpopup} popcross={()=>setshowpopup(false)}/>
       
    </>
  )
}

export default Addnote
