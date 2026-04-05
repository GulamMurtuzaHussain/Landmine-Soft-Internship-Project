import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Navbar from './navbar'
import Footer from './footer'
import { ToastContainer, toast } from 'react-toastify'

const useScrollObserver = () => {
  /* 
    useState(false): Initializes a React state variable to track whether the target element is currently visible on the screen.
 
    useRef(null): Creates an empty container to hold a direct reference to the physical HTML DOM element, bypassing React's Virtual DOM.
 
    useEffect(..., []): Ensures the observer setup and teardown logic only runs exactly once when the component first mounts.
 
    new IntersectionObserver(...): Instantiates the native browser API that asynchronously monitors element visibility without degrading scroll performance.
 
    entry.isIntersecting: A boolean property provided by the browser inside the callback function. It returns true when the element crosses the visibility threshold.
 
    setIsVisible(true): The action triggered inside the callback when isIntersecting is true, updating React state to force a re-render.
 
    { threshold: 0.1 }: The configuration object telling the browser to fire the callback exactly when 10% of the element enters the viewport.
 
    observer.observe(sectionRef.current): The command that hands the physical HTML element (now stored in .current) to the browser to begin actively tracking it.
 
    observer.disconnect(): The cleanup function executed when the component unmounts to stop tracking and prevent memory leaks.
 
    <div ref={sectionRef}>: The JSX attribute that tags the actual HTML element, telling React to drop it into the useRef container once rendered.
 
    isVisible ? 'opacity-100' : 'opacity-0': The Tailwind CSS logic that conditionally applies the visible classes if the state is true, or the hidden classes if false, triggering the transition-all animation.
  
    */
  const [isVisible, setisVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setisVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    }
  }, []);

  return [sectionRef, isVisible];


  /* 
    You are not assigning a function to useState variables here. You are confusing the built-in useState() hook with the custom useScrollObserver() function we created.
 
    Here is the practical logic of what is actually happening in that code:
 
    It is just a function returning an array: Look at the very last line inside the useScrollObserver block. It says return [ref, isVisible];. Our custom function is simply packaging two pieces of data (a reference and a boolean) into a standard JavaScript array and handing it back.
 
    useState does the exact same thing: Under the hood, React's built-in useState(false) is just a function that returns an array with two items: [false, functionToChangeIt]. We are simply mimicking that familiar pattern.
 
   The Destructuring (The Catch): When you write const [heroRef, heroVisible] = useScrollObserver();, you are executing our custom function. The function runs, does all the heavy Intersection Observer math, and returns [ref, isVisible]. The [heroRef, heroVisible] part on the left side of the equals sign simply catches those two items from the returned array and renames them so you know they belong to the Hero section.
 
    You are just calling a regular JavaScript function and catching the array it returns. There is no special React magic happening on that specific line.    
  */
}


const Contact = () => {
  /*
  
    • Contact form (UI only)
    • Company email and phone number (dummy allowed)
    • Address (dummy allowed)
    • Google Map embed (optional)
    • Proper form validation UI
  
    */

  const handleChange = (e) => {
    // Backend Code
  }

  const handleSubmit = (e) => {
    // Backend Code
    e.preventDefault();
    toast.success("DONE")
  }

  const [CRef, CisVisible] = useScrollObserver();

  return (

    <div className='bg-black text-white h-screen overflow-x-hidden'>
      <Navbar />

      <div className='bg-black'>

        <ToastContainer position="bottom-right" />

        <div ref={CRef} className={`bg-[rgb(22,22,22)] w-[96vw] mx-auto rounded-2xl flex flex-col items-center gap-4 py-5 my-5 transition-all ease-in-out duration-300 h-fit justify-normal xl:h-[85vh] xl:justify-center ${CisVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} `}>

          <div>
            <h1 className='text-center text-4xl font-bold text-[rgb(213,210,210)]'>Contact us</h1>
            <p className='text-center text-[rgb(167,165,165)]'>Have any questions or feedback? Drop a message and we will get back to you.</p>
          </div>

          <form onSubmit={handleSubmit} className='flex flex-col border border-green-800 rounded-2xl justify-center items-center gap-2 bg-black p-5 max-xl:w-[90vw]'>

            <div className='flex gap-2 justify-between xl:w-[50vw] w-[90vw] max-xl:justify-around'>

              <div className='flex flex-col xl:w-[24vw] w-[40vw]'>
                <label htmlFor="name" className='font-bold text-[rgb(213,210,210)] pb-2'>Enter Your Name:</label>
                <input type="text" id='name' name='name' className='border-2 border-green-900 rounded-[5px] xl:h-[6vh] bg-[rgb(22,22,22)] focus:outline-none focus:border-green-500 transition-colors p-2 h-[4vh]' onChange={handleChange} required />
              </div>

              <div className='flex flex-col xl:w-[24vw] w-[40vw]'>
                <label htmlFor="email" className='font-bold text-[rgb(213,210,210)] pb-2'>Enter Your Email:</label>
                <input type="email" id='email' name='email' className='border-2 border-green-900 rounded-[5px] xl:h-[6vh] bg-[rgb(22,22,22)] focus:outline-none focus:border-green-500 transition-colors p-2 h-[4vh]' onChange={handleChange} required />
              </div>

            </div>

            <div className='flex flex-col self-start xl:w-[50vw] w-[85vw] max-xl:self-center'>
              <label htmlFor="subject" className='font-bold text-[rgb(213,210,210)] pb-2'>Enter the Query Subject:</label>
              <input type="text" id='subject' name='subject' className='border-2 border-green-900 rounded-[5px] xl:h-[6vh] bg-[rgb(22,22,22)] focus:outline-none focus:border-green-500 transition-colors p-2 h-[4vh]' onChange={handleChange} required />
            </div>

            <div className='flex flex-col self-start xl:w-[50vw] w-[85vw] max-sm:self-center'>
              <label htmlFor="query" className='font-bold text-[rgb(213,210,210)] pb-2'>Enter Your Query:</label>
              <textarea type="text" id='query' name='query' className='border-2 border-green-900 rounded-[5px] h-[10vh] bg-[rgb(22,22,22)] focus:outline-none focus:border-green-500 transition-colors resize-none p-2 ' onChange={handleChange} required />
            </div>

            <button type='submit' className='self-start border-green-800 text-green-800 hover:bg-green-800 hover:text-white transition-all duration-300 border-2 px-4 py-2 my-3 rounded-md font-bold'>Submit</button>

            <div className='self-start text-[rgb(167,165,165)]'>
              <h1 className='hover:text-white transition-all ease-in-out duration-300'>Or reach to us directly via</h1>
              <h1 className='hover:text-white transition-all ease-in-out duration-300'>Website: support@landminesoft.com</h1>
              <h1 className='hover:text-white transition-all ease-in-out duration-300'>Phone: +91‑90590‑24‑653</h1>
              <h1 className='hover:text-white transition-all ease-in-out duration-300'>Address: Hyderabad, Telangana 501218, India</h1>
            </div>

          </form>

        </div>

      </div>

      <div className='max-sm:block xl:block hidden bg-black'><Footer /></div>
      <div className='xl:hidden max-md:hidden md:block w-screen absolute bottom-0'><Footer /></div>
      
    </div>
  )
}

export default Contact
