import React from 'react'
import Binnotes from '../../components/bin notes/Binnotes'

const Bin = () => {
  return (
    <>
    <div style={{
        backgroundImage: `url('/images/binbg.jpg')`, // Background image from public folder
      }}>
    <div className=' w-full min-h-screen h-auto bg-[#ccedf3e5] items-center  dark:bg-[#2b2a2af5] dark:text-[#d6f1fc] shadow-[inset_2px_-1px_0px_13px_#00000024] transition-all duration-[.4s]'>
      <h1 className='text-5xl m-auto pt-5 text-center items-center font-bold'>Your Bin</h1>
      
      <Binnotes/>
    </div>
    </div>
    </>
  )
}

export default Bin
