import React from 'react';
import Pinnotes from '../../components/pin notes/Pinnotes';
import { SiPinboard } from "react-icons/si";

const Pin = () => {
  return (
    <>
    <div className='w-full h-full bg-cover backdrop-blur-lg '
    style={{
        backgroundImage: `url('/images/pinbg.jpg')`, // Background image from public folder
      }}>
        <div className='bg-[#fdf1f6c9] w-full h-full dark:bg-[#252933ef]'>
      <div className="flex flex-col items-center justify-center mb-10 pt-10 ">
        {/* Icon and Heading Container */}
        <div className="flex items-center">
          <SiPinboard className="text-4xl dark:text-[#eb0f0f] text-[#fc1d1d]" />
          <h2 className="font-bold font-sans text-4xl text-[#4b2d30] dark:text-[#858582]">
            Your Pin's
          </h2>
        </div>
      </div>
      <Pinnotes />
      </div>
      </div>
    </>
  );
};

export default Pin;

