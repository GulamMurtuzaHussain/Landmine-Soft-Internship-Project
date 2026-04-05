import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import { useState, useEffect, useRef } from 'react'
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


const Support = () => {

  const handleChange = (e) => {
    // Backend Code
  }

  const handleSubmit = (e) => {
    // Backend Code
    e.preventDefault();
    toast.success("DONE")
  }

  const [SRef, SisVisible] = useScrollObserver();

  return (

    <div className='bg-black text-white '>

      <Navbar />

      <ToastContainer position="bottom-right" />

      <div ref={SRef} className={`bg-[rgb(22,22,22)] w-[96vw] mx-auto rounded-2xl py-5 my-5 transition-all ease-in-out duration-300 h-fit ${SisVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} xl:h-[99vh]`}>

        <div>
          <h1 className='text-center text-4xl font-bold text-[rgb(213,210,210)]'>Support</h1>
          <p className='text-center text-[rgb(167,165,165)]'>Facing an issue with careers portal or applications? Raise a support request and the team will respond as soon as possible.</p>
        </div>

        <div className='flex justify-center items-center py-5 w-[95vw] mx-auto flex-col h-fit gap-5 xl:flex-row xl:gap-10 xl:h-[85vh]'>

          <div className='xl:w-[40vw] xl:h-[60vh] flex flex-col gap-5 w-[90vw] h-fit'>

            <div className='bg-black border xl:w-[40vw] xl:h-[22vh] border-green-800 flex flex-col gap-2 rounded-2xl p-5 w-[90vw] h-fit'>
              <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Application Status</h2>
              <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                <b>• Tracking:</b> You can track your application in the My Applications section of your profile. Status moves from Pending → In Progress → Rejected.
              </p>
            </div>

            <div className='bg-black border xl:w-[40vw] xl:h-[22vh] border-green-800 flex flex-col gap-2 rounded-2xl p-5 w-[90vw] h-fit'>
              <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Login or Signup Issues</h2>
              <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                <b>• Troubleshooting:</b> Try clearing your browser cache and logging in again. If it still fails, raise a support ticket with an error screenshot.
              </p>
            </div>

            <div className='bg-black border xl:w-[40vw] xl:h-[22vh] border-green-800 flex flex-col gap-2 rounded-2xl p-5 w-[90vw] h-fit'>
              <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Technical Problems</h2>
              <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                <b>• Reporting:</b> Mention your browser, device, and the exact steps to reproduce the issue. This helps us resolve the problem faster.
              </p>
            </div>
          </div>

          <div className='xl:w-[50vw] w-[90vw]'>

            <div className=''>
              <h1 className='text-center text-[24px] font-bold text-[rgb(213,210,210)] mb-1'>Create support ticket</h1>
              <p className='text-center text-[rgb(167,165,165)] mb-2'>Have any questions or feedback? Drop a message and we will get back to you.</p>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col border border-green-800 rounded-2xl justify-center items-center gap-2 bg-black p-5 max-xl:w-[90vw]'>

              <div className='flex xl:gap-3 xl:justify-between xl:w-[50vw] xl:px-5 w-[90vw] justify-around px-0 gap-1'>

                <div className='flex flex-col xl:w-[24vw] w-[40vw]'>
                  <label htmlFor="name" className='font-bold text-[rgb(213,210,210)] pb-2'>Enter Your Name:</label>
                  <input type="text" id='name' name='name' className='border-2 border-green-900 rounded-[5px] h-[6vh] bg-[rgb(22,22,22)] text-white px-3 focus:outline-none focus:border-green-500 transition-colors max-xl:h-[4vh]' onChange={handleChange} required />
                </div>

                <div className='flex flex-col xl:w-[24vw] w-[40vw]'>
                  <label htmlFor="options" className='font-bold text-[rgb(213,210,210)] pb-2'>Enter Your Issue Type:</label>
                  <select name="options" id="options" className='border-2 border-green-900 rounded-[5px] h-[6vh] bg-[rgb(22,22,22)] text-white px-3 focus:outline-none focus:border-green-500 transition-colors max-xl:h-[4vh]'>
                    <option value="technical">Technical</option>
                    <option value="account">Account / Login</option>
                    <option value="application">Application / Job Related</option>
                    <option value="other">Something else</option>
                  </select>
                </div>
              </div>

              <div className='flex flex-col self-start w-[50vw] mt-2 max-xl:w-[85vw] max-sm:self-center'>
                <label htmlFor="subject" className='font-bold text-[rgb(213,210,210)] pb-2'>Enter the Query Subject:</label>
                <input type="text" id='subject' name='subject' className='border-2 border-green-900 rounded-[5px] xl:w-[48vw] xl:h-[6vh] bg-[rgb(22,22,22)] text-white px-3 focus:outline-none focus:border-green-500 transition-colors h-[4vh] w-[85vw]' onChange={handleChange} required />
              </div>

              <div className='flex flex-col self-start w-[50vw] mt-2 max-xl:w-[85vw] max-sm:self-center'>
                <label htmlFor="query" className='font-bold text-[rgb(213,210,210)] pb-2'>Enter Your Query:</label>
                <textarea id='query' name='query' className='border-2 border-green-900 rounded-[5px] xl:w-[48vw] h-[10vh] bg-[rgb(22,22,22)] text-white p-3 focus:outline-none focus:border-green-500 transition-colors resize-none w-[85vw]' onChange={handleChange} required />
              </div>

              <button type='submit' className='self-start border-green-800 text-green-500 hover:bg-green-800 hover:text-white transition-all duration-300 border-2 px-4 py-2 my-3 rounded-md font-bold'>Submit</button>

              <div className='self-start text-[rgb(167,165,165)] mt-2'>
                <h1 className='hover:text-white transition-all ease-in-out duration-300'>For urgent issues, you can also email:</h1>
                <a href="mailto:support@landminesoft.com" className='hover:text-white transition-all ease-in-out duration-300 font-bold text-orange-400'>support@landminesoft.com</a>
              </div>

            </form>

          </div>

        </div>

      </div>

      <Footer />
      
    </div>
  )
}

export default Support
