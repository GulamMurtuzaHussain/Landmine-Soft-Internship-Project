import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaX, FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {

  return (

    <div className='flex flex-col  w-full bg-black pt-5'>

      <div>

        <div className='border border-black flex justify-between px-5'>

          <div className='flex flex-col gap-1'>
            <h1 className='text-[rgb(213,210,210)]'>Landmine Soft</h1>
            <h3 className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200'>Hyderabad, Telangana 501218, India</h3>
          </div>

          <div className='flex flex-col gap-1'>
            <h3 className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200'>contact@landminesoft.com</h3>
            <h3 className='text-end text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200'>+91‑90590‑24‑653</h3>
          </div>

        </div>

      </div>

      <div className='flex items-center justify-between gap-10 pr-6 pt-1 max-sm:flex-col max-sm:gap-5 max-sm:mt-2'>

        <div className='flex gap-10 pl-5'>
          <Link to='/faq' className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200'>FAQ</Link>
          <Link to='/privacypolicy' className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200'>Privacy Policy</Link>
          <Link to='/terms&conditions' className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200'>Terms & Conditions</Link>
        </div>

        <div className='flex gap-10 text-[20px]'>
        <a href="https://www.facebook.com/landminesoft" className='hover:text-blue-400 text-[rgb(167,165,165)] transition-all ease-in-out duration-200'><FaFacebook /></a>
        <a href="https://instagram.com/landminesoft" className='hover:text-pink-400 text-[rgb(167,165,165)] transition-all ease-in-out duration-200'><FaInstagram /></a>
        <a href="https://www.linkedin.com/company/landminesoft" className='hover:text-blue-500 text-[rgb(167,165,165)] transition-all ease-in-out duration-200'><FaLinkedin /></a>
        <a href="https://x.com/landminesoft" className='hover:text-white text-[rgb(167,165,165)] transition-all ease-in-out duration-200'><FaXTwitter /></a>
        </div>

      </div>
      
      <div className='border border-dashed border-red mt-5 border-gray-900'></div>
      <div className='text-center pt-5 text-[rgb(128,128,128)]'>© 2026 Landmine Soft. All rights reserved.</div>
      
    </div>
  )
}

export default Footer
