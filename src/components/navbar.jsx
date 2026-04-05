import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {

  const location = useLocation();
  const isAboutActive = location.pathname === '/about';
  const isServicesActive = location.pathname === '/services';
  const isCareersActive = location.pathname === '/careers';
  const isDemoActive = location.pathname === '/demo';
  const isContactActive = location.pathname === '/contact';
  const isSupportActive = location.pathname === '/support';
  const isLoginActive = location.pathname === '/login';

  const handleSandwich = () => {
    console.log("button")
    setsandwich(!sandwich)
  }

  const [sandwich, setsandwich] = useState(false);


  return (

    <div className='bg-black flex justify-between items-center text-[rgb(167,165,165)]'>

      <div className='w-fit h-fit items-center flex gap-15'>

        <div className='flex justify-center items-center gap-5'>
          <Link to='/'><img src={`${import.meta.env.BASE_URL}company_logo.png`} alt="logo" className='ml-5 w-20 h-20' /></Link>
          <button onClick={() => { handleSandwich() }} className='block text-[rgb(167,165,165)] font-bold border-2 border-orange-400 p-2 rounded-2xl hover:bg-orange-400 transition-all ease-in-out duration-300 hover:text-white xl:hidden'>More</button>
        </div>

        <div className={`hidden xl:flex xl:items-center xl:gap-10`}>
          <Link to='/about'><div className={`w-[7vw] h-[6vh] rounded-[10px] flex justify-center items-center ${isAboutActive ? "bg-orange-400 text-white" : ""} hover:bg-orange-400 transition-all ease-in-out duration-300 hover:text-white`}>About</div></Link>
          <Link to='/services'><div className={`w-[7vw] h-[6vh]  rounded-[10px] flex justify-center items-center ${isServicesActive ? "bg-orange-400 text-white" : ""} hover:bg-orange-400 transition-all ease-in-out duration-300 hover:text-white`}>Services</div></Link>
          <Link to='/careers'><div className={`w-[7vw] h-[6vh]  rounded-[10px] flex justify-center items-center ${isCareersActive ? "bg-orange-400 text-white" : ""} hover:bg-orange-400 transition-all ease-in-out duration-300 hover:text-white`}>Careers</div></Link>
          <button className={` className= ${isDemoActive ? "text-orange-400" : ""} w-[8vw] h-[5vh] border-2 border-amber-500 rounded-[10px] font-bold hover:text-orange-400 transition-all ease-in-out duration-300`}>Get a Demo</button>
        </div>

      </div>

      <div className='hidden xl:flex xl:items-center xl:gap-10 xl:mr-5 transition-all ease-in-out duration-300'>
        <Link to='/contact'><div className={`w-[7vw] h-[6vh] rounded-[10px] flex justify-center items-center ${isContactActive ? "bg-green-950 text-white" : ""} hover:bg-green-950 transition-all ease-in-out duration-300 hover:text-white`}>Contact Us</div></Link>
        <Link to='/support'><div className={`w-[7vw] h-[6vh] rounded-[10px] flex justify-center items-center ${isSupportActive ? "bg-green-950 text-white" : ""} hover:bg-green-950 transition-all ease-in-out duration-300 hover:text-white`}>Support</div></Link>
        <Link to='/login'><div className={`w-[7vw] h-[6vh] rounded-[10px] flex justify-center items-center ${isLoginActive ? "bg-green-950 text-white" : ""} hover:bg-green-950 transition-all ease-in-out duration-300 hover:text-white`}>Login</div></Link>
      </div>

      {/* SANDWICH */}
      <div className={`bg-black text-white w-[50vw] h-screen absolute top-1 z-1 flex flex-col gap-0 transition-all ease-in-out duration-300 ${sandwich ? " translate-x-0" : "-translate-x-full"} `}>

        <div className=''>
          <Link to='/'><img src={`${import.meta.env.BASE_URL}company_logo.png`} alt="logo" className='ml-5 w-20 h-20' /></Link>
        </div>

        <div className={`flex flex-col justify-center ml-5 max-sm:gap-5`}>
          <Link to='/about'><div className={`w-[7vw] h-[6vh] rounded-[10px] ${isAboutActive ? "text-orange-400" : ""} hover:bg-orange-400 transition-all ease-in-out duration-300 hover:text-white max-sm:w-[15vw] max-sm:h-[3vh] `}>About</div></Link>
          <Link to='/services'><div className={`w-[7vw] h-[6vh]  rounded-[10px] ${isServicesActive ? "text-orange-400" : ""} hover:bg-orange-400 transition-all ease-in-out duration-300 hover:text-white max-sm:w-[15vw] max-sm:h-[3vh] `}>Services</div></Link>
          <Link to='/careers'><div className={`w-[7vw] h-[6vh]  rounded-[10px] ${isCareersActive ? "text-orange-400" : ""} hover:bg-orange-400 transition-all ease-in-out duration-300 hover:text-white max-sm:w-[15vw] max-sm:h-[3vh] `}>Careers</div></Link>
        </div>

        <div className='transition-all ease-in-out duration-300 ml-5 mt-5 flex flex-col gap-5'>
          <Link to='/contact'><div className={`w-[18vw] h-[6vh] rounded-[10px] ${isContactActive ? "text-green-950" : ""} hover:bg-green-800 transition-all ease-in-out duration-300 hover:text-white max-sm:h-[3vh] max-sm:w-[25vw]`}>Contact Us</div></Link>
          <Link to='/support'><div className={`w-[18vw] h-[6vh] rounded-[10px] ${isSupportActive ? "text-green-950" : ""} hover:bg-green-800 transition-all ease-in-out duration-300 hover:text-white max-sm:h-[3vh] `}>Support</div></Link>
          <Link to='/login'><div className={`w-[18vw] h-[6vh] rounded-[10px] ${isLoginActive ? "text-green-950" : ""} hover:bg-green-800 transition-all ease-in-out duration-300 hover:text-white max-sm:h-[3vh] `}>Login</div></Link>
        </div>

        <button className={` className= ${isDemoActive ? "text-orange-400" : ""} w-[28vw] h-[5vh] border-2 border-amber-500 rounded-[10px] font-bold hover:text-orange-400 transition-all ease-in-out duration-300 ml-5 mt-5`}>Get a Demo</button>
        <button onClick={() => { handleSandwich() }} className={` className= ${isDemoActive ? "text-orange-400" : ""} w-[28vw] h-[5vh] border-2 border-green-900 rounded-[10px] font-bold hover:text-orange-400 transition-all ease-in-out duration-300 ml-5 mt-2`}>Close</button>

      </div>



    </div>
  )
}

export default Navbar
