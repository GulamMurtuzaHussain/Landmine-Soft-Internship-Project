import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import { FaLaptopCode, FaMobileScreen, FaPenRuler, FaServer, FaDatabase } from 'react-icons/fa6'
import { useState, useEffect, useRef } from 'react'

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


const Services = () => {
    /*
        List of services (cards or sections), such as:
            o Web Development
            o Mobile App Development
            o UI/UX Design
            o Backend & API Development

        • Each service should include:
            o Short description
            o Title
            o Icon or illustration
    */

    const [servicesRef, servicesisVisible] = useScrollObserver();

    return (

        <div className='bg-black max-xl:h-screen h-full'>

            <Navbar />

            <div ref={servicesRef} className={`bg-[rgb(22,22,22)] w-[96vw] mx-auto border rounded-2xl flex flex-col xl:justify-center items-center py-5 my-5 transition-all ease-in-out duration-300 h-[62vh] overflow-y-auto justify-normal ${servicesisVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} xl:h-[99vh] lg:h-[80vh]`}>

                <h1 className='text-center text-4xl font-bold text-[rgb(213,210,210)]'>Our Services</h1>

                <div className='xl:grid xl:grid-cols-2 xl:grid-rows-2 mt-5 gap-10 flex flex-col'>

                    <div className='bg-black border xl:w-[40vw] h-fit border-orange-400 gap-2 rounded-2xl p-5 flex flex-col justify-center items-center w-[80vw]'>
                        <img src="web_dev.png" alt="webdev" className='w-20 h-20' />
                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Web Development</h2>
                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3 text-center'>
                            Building responsive, high-performance web applications using modern front-end frameworks and clean component architectures.
                        </p>
                    </div>

                    <div className='bg-black border xl:w-[40vw] h-fit border-orange-400 gap-2 rounded-2xl p-5 flex flex-col justify-center items-center w-[80vw]'>
                        <img src="mobile_dev.png" alt="mobiledev" className='w-20 h-20' />
                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Mobile Development</h2>
                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3 text-center'>
                            Creating native and cross-platform mobile applications optimized for speed, reliability, and seamless user experiences on iOS and Android.
                        </p>
                    </div>

                    <div className='bg-black border xl:w-[40vw] h-fit border-orange-400 gap-2 rounded-2xl p-5 flex flex-col justify-center items-center w-[80vw]'>
                        <img src="ux_logo.png" alt="uiux" className='w-20 h-20' />
                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>UI/UX Design</h2>
                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3 text-center'>
                            Designing intuitive, user-centric interfaces with a focus on logical wireframing, modern aesthetics, and frictionless user journeys.
                        </p>
                    </div>

                    <div className='bg-black border xl:w-[40vw] h-fit border-orange-400 gap-2 rounded-2xl p-5 flex flex-col justify-center items-center w-[80vw]'>
                        <img src="backend_logo.png" alt="backend" className='w-20 h-20' />
                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Backend APIs & Architecture</h2>
                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3 text-center'>
                            Architecting secure, scalable RESTful APIs and robust database structures to power complex, data-heavy applications.
                        </p>
                    </div>

                </div>

            </div>

            <div className='max-sm:block xl:block hidden bg-black'><Footer /></div>
            <div className='xl:hidden max-md:hidden md:block w-screen absolute bottom-0'><Footer /></div>

        </div>
    )
}

export default Services
