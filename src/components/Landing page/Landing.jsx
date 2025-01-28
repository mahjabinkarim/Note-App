import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  // Redux slice data
  const sliceUser = useSelector((state) => state.userData.value);
  const navigate = useNavigate();

  // Button click handler
  const handleGetStarted = () => {
    if (sliceUser?.uid) {
      navigate('/home'); // User logged in: Go to home
    } else {
      navigate('/Login'); // User not logged in: Go to login
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-center bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/landingpage-bg2.jpg')`, // Background image from public folder
      }}
    >
      {/* App Name */}
      <h1 className="text-5xl font-extrabold font-brandname pt-3 ml-5 text-[#02a9eb] mb-4">Pinora</h1>

      {/* Tagline */}
      <p className="text-2xl w-[350px] font-medium ml-5 font-open sans text-[#1686f0] mb-8">
        Organize Your Thoughts  Empower Your Mind
      </p>

      {/* Short Description */}
      <div className='bg-[#ade5ff57] w-[300px] ml-14 p-1 mb-5 rounded-2xl '>
      <p className="text-[#0b2e5cc0] max-w-xl mx-auto text-sm leading-relaxed">
        Capture Ideas, Anytime, Anywhere with Pinora – your go-to companion for
        staying organized and inspired. Whether it's work notes, creative
        sparks, or everyday tasks, "Simplify Life, One Note at a Time." Keep
        your thoughts in check, unleash your potential, and "Never Let an Idea
        Slip Away." Let Pinora empower your mind and inspire your journey!
      </p>
      </div>
      {/* Get Started Button */}
      <button
        onClick={handleGetStarted}
        className="px-8 py-4 bg-[#02c4ff4d] text-[#082d57] font-bold rounded-lg shadow-lg hover:bg-[#0092beb0] hover:text-[#6ff5ff96] transition duration-300"
      >
        Get Started
      </button>
    </div>
  );
};

export default Landing;
