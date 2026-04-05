import React from 'react'
import Footer from './footer'
import Navbar from './navbar'
import { useState, useRef, useEffect } from 'react'


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



const Terms = () => {

    const [TCRef, TCisVisible] = useScrollObserver();

    return (

        <div className='bg-black h-screen'>

            <Navbar />

            {/* TERMS & CONDITIONS */}
            <div ref={TCRef} className={`bg-[rgb(22,22,22)] w-[96vw] mx-auto rounded-2xl mt-10 mb-10 flex flex-col justify-center gap-1 transition-all ease-in-out duration-300 h-fit xl:h-[75vh] max-xl:gap-5 max-xl:pb-5 ${TCisVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} `}>

                <h1 className='text-center pt-5 text-4xl font-bold text-[rgb(213,210,210)]'>Terms & Conditions</h1>

                <div className='flex xl:flex-row xl:justify-around xl:mt-5 xl:pb-10 flex-col justify-center items-center gap-5'>

                    {/* Card 1: Service Agreement & IP */}
                    <div className='bg-black border border-orange-400 flex flex-col gap-2 rounded-2xl p-5 w-[85vw] h-[25vh] xl:w-[40vw] xl:h-[60vh] max-xl:justify-normal max-xl:overflow-auto'>

                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center mb-2'>Service Agreement & IP</h2>

                        <div className='flex flex-col gap-1'>
                            <h3 className='font-bold text-[rgb(213,210,210)] pl-3'>• Acceptance of Terms</h3>
                            <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-6 leading-relaxed'>
                                By accessing the Landmine Soft Hyderabad website or engaging our engineering services, you agree to be bound by these standard terms and conditions.
                            </p>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <h3 className='font-bold text-[rgb(213,210,210)] pl-3'>• Intellectual Property</h3>
                            <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-6 leading-relaxed'>
                                All custom source code, system architectures, and digital assets remain the exclusive intellectual property of Landmine Soft until full project payment is cleared.
                            </p>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <h3 className='font-bold text-[rgb(213,210,210)] pl-3'>• Project Timelines</h3>
                            <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-6 leading-relaxed'>
                                Delivery estimates are contingent upon timely client communication and requirement approvals. Scope creep will require timeline and budget renegotiation.
                            </p>
                        </div>

                    </div>

                    {/* Card 2: Liabilities & Governing Law */}
                    <div className='bg-black border border-orange-400 flex flex-col gap-2 rounded-2xl p-5 w-[85vw] h-[25vh] xl:w-[40vw] xl:h-[60vh] max-xl:justify-normal max-xl:overflow-auto'>
                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center mb-2'>Liabilities & Governing Law</h2>

                        <div className='flex flex-col gap-1'>
                            <h3 className='font-bold text-[rgb(213,210,210)] pl-3'>• Limitation of Liability</h3>
                            <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-6 leading-relaxed'>
                                Landmine Soft is not liable for indirect damages, data loss, or business interruptions resulting from the use or inability to use our delivered software platforms.
                            </p>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <h3 className='font-bold text-[rgb(213,210,210)] pl-3'>• Client Responsibilities</h3>
                            <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-6 leading-relaxed'>
                                Clients must provide accurate technical requirements, necessary API access credentials, and timely feedback to ensure project success and adherence to deadlines.
                            </p>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <h3 className='font-bold text-[rgb(213,210,210)] pl-3'>• Jurisdiction</h3>
                            <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-6 leading-relaxed'>
                                These terms are governed by the laws of India. Any legal disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.
                            </p>
                        </div>

                    </div>

                </div>

            </div>

            <div className='max-sm:block xl:block hidden bg-black'><Footer /></div>
            <div className='xl:hidden max-md:hidden md:block w-screen absolute bottom-0'><Footer /></div>
            
        </div>
    )
}

export default Terms
