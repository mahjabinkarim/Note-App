import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import { useSelector } from 'react-redux'
import SideNav from '../../components/sidenav/Sidenav'

const LayaoutOne = () => {
    const sliceuser = useSelector((state)=> state.userData.value)
    const navigate = useNavigate()
    useEffect (()=>{
        if(sliceuser  ==  null){
            navigate('/Login')
        }
    },[])
  return (
    <>
      <Navbar />
      <div className="flex">
        <SideNav />
        <div className="flex-grow  dark:bg-[#252933]  ">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default LayaoutOne
