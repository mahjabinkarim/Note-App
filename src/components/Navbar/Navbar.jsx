import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { setUserData } from '../../slice/userslice'; 
import logo from '../../../public/images/logo1.png'
const Navbar = () => {
  const sliceuser = useSelector((state) => state.userData.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Logout function
  const handleLogout = () => {
    dispatch(setUserData(null)); // Redux state reset
    localStorage.removeItem('userData'); // Local storage reset
    navigate('/Login'); // Navigate to login page
  };
  

  return (
    <>
      <nav className='py-[9px] px-[50px] bg-[#c9dbf34d] sticky dark:bg-[#2b2a2a] dark:text-[#d6f1fc] transition-all duration-[.4s]'>
        <div className='flex justify-between'>
          {/* Logo */}
          <div className='h-[80px] w-[80px] overflow-hidden'>
            <Link to='/'>
              <img src={logo} alt="logo" />
            </Link>
          </div>

          {/* User Info and Logout */}
          <div className='flex gap-5 items-center'>
            {/* Profile Picture */}
            <div className='h-[80px] w-[80px] overflow-hidden rounded-full bg-slate-500 border-2 border-[#cde0e9]'>
              <img src={sliceuser?.photoURL} alt="profile pic" />
            </div>
            {/* User Name */}
            <div>
              <h2 className='text-[18px] font-semibold font-abeezee text-[#184972] dark:text-[#d6f1fc]'>
                {sliceuser?.displayName}
              </h2>
            </div>
            {/* Logout Icon */}
            <div>
              <RiLogoutCircleRLine
                onClick={handleLogout}
                className='cursor-pointer text-3xl text-[#aaa7a7] hover:text-[#e70505]'
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

