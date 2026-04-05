import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'


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


const Careers = () => {
    /*
        • Company culture overview
        • Why work with Landmine Soft
        • Open job positions (dummy roles allowed)
        • Apply button or form (UI only)
    */
    const scroll = useRef()

  // Handlers For Correct Sliding Of Cards.
  const scrollRight = () => {
    const scrollAmount = window.innerWidth * 0.50
    scroll.current.scrollBy({ left: scrollAmount, behaviour: "smooth" })
  }

  const scrollLeft = () => {
    const scrollAmount = window.innerWidth * 0.50;
    scroll.current.scrollBy({ left: -scrollAmount, behaviour: 'smooth' })
  }

    const [CCRef, CCisVisible] = useScrollObserver();
    const [WWURef, WWUisVisible] = useScrollObserver();
    const [OPRRef, OPRisVisible] = useScrollObserver();

    return (
        <div className='bg-black text-white h-full'>
            <Navbar />

            {/* COMPANY CULTURE */}
            <div ref={CCRef} className={`bg-[rgb(22,22,22)] w-[96vw] mx-auto rounded-2xl flex flex-col items-center py-5 my-5 transition-all ease-in-out duration-300 overflow-y-auto justify-normal ${CCisVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} max-sm:h-[60vh] xl:h-[65vh] xl:justify-center max-lg:h-fit `}>

                <h1 className='text-center text-4xl font-bold text-[rgb(213,210,210)]'>Company's Work Culture</h1>

                <div className='xl:grid xl:grid-cols-2 xl:grid-rows-2 mt-5 gap-10 flex flex-col'>

                    <div className='bg-black border xl:w-[40vw] xl:h-[22vh] border-orange-400 flex flex-col gap-2 rounded-2xl p-5 w-[85vw]'>
                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Extreme Ownership</h2>
                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• Build It, Own It:</b> We don't micromanage. Engineers take full responsibility for their architectures, codebase, and deployments from day one.
                        </p>
                    </div>

                    <div className='bg-black border xl:w-[40vw] xl:h-[22vh] border-orange-400 flex flex-col gap-2 rounded-2xl p-5 w-[85vw]'>
                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Pragmatic Engineering</h2>
                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• No Corporate Red Tape:</b> We prioritize writing clean, functional code and shipping real products over endless meetings and unnecessary documentation.
                        </p>
                    </div>

                    <div className='bg-black border xl:w-[40vw] xl:h-[22vh] border-orange-400 flex flex-col gap-2 rounded-2xl p-5 w-[85vw]'>
                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Flat & Transparent</h2>
                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• Direct Communication:</b> We value open, straightforward discussions. The best technical argument wins, regardless of whether it comes from a junior dev or a senior architect.
                        </p>
                    </div>

                    <div className='bg-black border xl:w-[40vw] xl:h-[22vh] border-orange-400 flex flex-col gap-2 rounded-2xl p-5 w-[85vw]'>
                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Results Over Hours</h2>
                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• Flexible Work Style:</b> We care about the quality of the software you deliver and the deadlines you meet, not how many hours you spend staring at a screen.
                        </p>
                    </div>

                </div>

            </div>

            {/* Why work with us? */}
            <div ref={WWURef} className={`bg-[rgb(22,22,22)] w-[96vw] mx-auto rounded-2xl flex flex-col items-center py-5 my-5 transition-all ease-in-out duration-300 overflow-y-auto justify-normal ${WWUisVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} xl:h-[65vh] xl:justify-center max-sm:h-[60vh] max-lg:h-fit `}>

                <h1 className='text-center text-4xl font-bold text-[rgb(213,210,210)]'>Why Work With Us?</h1>

                <div className='xl:grid xl:grid-cols-2 xl:grid-rows-2 mt-5 gap-10 flex flex-col'>

                    <div className='bg-black border xl:w-[40vw] xl:h-[22vh] border-orange-400 flex flex-col gap-2 rounded-2xl p-5 w-[85vw]'>
                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Business-Driven Engineering</h2>
                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• Beyond Writing Code:</b> We don't just clear tickets; we architect software specifically designed to solve your operational bottlenecks, scale your business, and drive revenue.
                        </p>
                    </div>

                    <div className='bg-black border xl:w-[40vw] xl:h-[22vh] border-orange-400 flex flex-col gap-2 rounded-2xl p-5 w-[85vw]'>
                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Rapid, Agile Delivery</h2>
                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• Speed to Market:</b> We use modern frameworks and streamlined CI/CD pipelines to get your product from concept to deployment faster without sacrificing architecture quality.
                        </p>
                    </div>

                    <div className='bg-black border xl:w-[40vw] xl:h-[22vh] border-orange-400 flex flex-col gap-2 rounded-2xl p-5 w-[85vw]'>
                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Zero Black-Box Development</h2>
                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• Total Transparency:</b> You get complete visibility into our codebase, agile sprints, and infrastructure metrics. We act as your dedicated technical partners, not an opaque agency.
                        </p>
                    </div>

                    <div className='bg-black border xl:w-[40vw] xl:h-[22vh] border-orange-400 flex flex-col gap-2 rounded-2xl p-5 w-[85vw]'>
                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Enterprise-Grade Reliability</h2>
                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• Bulletproof Systems:</b> We build scalable, highly optimized, and secure cloud-native applications capable of handling massive traffic spikes while protecting your data.
                        </p>
                    </div>

                </div>
            </div>

            {/* Open Roles */}
            <div ref={OPRRef} className={`bg-[rgb(22,22,22)] w-[96vw] mx-auto rounded-2xl flex flex-col items-center py-5 my-5 transition-all ease-in-out duration-300 h-[60vh] justify-center xl:h-[65vh] max-sm:gap-2 max-xl:h-fit ${OPRisVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                <h1 className='text-center text-4xl font-bold text-[rgb(213,210,210)]'>Open Roles</h1>

                <div className='flex xl:gap-5 gap-1'>

                    <button onClick={() => scrollLeft()} className='text-4xl text-[rgb(167,165,165)] cursor-pointer'><img src="left.svg" alt="" className='w-3.75' /></button>

                    <div ref={scroll} className=' bg-black mt-5 border-2 border-amber-600 flex overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden snap-x snap-mandatory rounded-2xl max-w-[85vw] h-[50vh xl:max-w-[50vw] xl:h-[50vh] max-xl:overflow-y-hidden max-xl:h-fit'>

                        <div className='snap-start bg-black flex flex-col gap-3 rounded-2xl p-6 min-w-[85vw] xl:min-w-[50vw] max-xl:h-fit'>

                            <h2 className='text-[24px] font-bold text-[rgb(213,210,210)] hover:text-white transition-all ease-in-out duration-300'>Frontend Developer (React)</h2>
                            <div className='text-[rgb(167,165,165)] flex flex-col gap-2'>
                                <p className='hover:text-white transition-all ease-in-out duration-300'><b>• Description:</b> Architect and build high-performance, responsive web applications. You will translate UI/UX wireframes into reusable React components and manage global state efficiently.</p>
                                <p className='hover:text-white transition-all ease-in-out duration-300'><b>• Salary:</b> ₹8,00,000 - ₹12,00,000 LPA</p>
                                <p className='hover:text-white transition-all ease-in-out duration-300'><b>• Duration:</b> Full-Time</p>
                                <p className='hover:text-white transition-all ease-in-out duration-300'><b>• Evaluation Process:</b> Resume Screening → Take-home UI Assignment → Technical System Design Interview → Final HR Round.</p>
                            </div>

                            <Link to='/login' className='mt-2'>
                                <button className='border-green-800 text-green-800 hover:bg-green-800 hover:text-white transition-all duration-300 border-2 px-4 py-2 rounded-md font-bold'>Login to apply →</button>
                            </Link>

                        </div>

                        <div className='snap-start bg-black flex flex-col gap-3 rounded-2xl p-6 min-w-[85vw] xl:min-w-[50vw] max-xl:h-fit'>

                            <h2 className='text-[24px] font-bold text-[rgb(213,210,210)] hover:text-white'>Cloud Infrastructure Engineer</h2>
                            
                            <div className='text-[rgb(167,165,165)] flex flex-col gap-2'>
                                <p className='hover:text-white transition-all ease-in-out duration-300'><b>• Description:</b> Design, deploy, and maintain scalable cloud infrastructure on AWS. Manage CI/CD pipelines, container orchestration (Docker/Kubernetes), and ensure system security.</p>
                                <p className='hover:text-white transition-all ease-in-out duration-300'><b>• Salary:</b> ₹10,00,000 - ₹15,00,000 LPA</p>
                                <p className='hover:text-white transition-all ease-in-out duration-300'><b>• Duration:</b> Full-Time</p>
                                <p className='hover:text-white transition-all ease-in-out duration-300'><b>• Evaluation Process:</b> Profile Review → Infrastructure Architecture Whiteboarding → Live Debugging Session → Final Round.</p>
                            </div>
                            <Link to='/login' className='mt-2'>
                                <button className='border-green-800 text-green-800 hover:bg-green-800 hover:text-white transition-all duration-300 border-2 px-4 py-2 rounded-md font-bold'>Login to apply →</button>
                            </Link>
                        </div>

                        <div className='snap-start bg-black flex flex-col gap-3 rounded-2xl p-6 min-w-[85vw] xl:min-w-[50vw] max-xl:h-fit'>

                            <h2 className='text-[24px] font-bold text-[rgb(213,210,210)] hover:text-white'>Backend API Engineer (Node.js)</h2>
                            
                            <div className='text-[rgb(167,165,165)] flex flex-col gap-2'>
                                <p className='hover:text-white transition-all ease-in-out duration-300'><b>• Description:</b> Build secure, highly scalable RESTful APIs and microservices. Handle database architecture (MongoDB/PostgreSQL), authentication schemes (JWT), and optimize server response times.</p>
                                <p className='hover:text-white transition-all ease-in-out duration-300'><b>• Salary:</b> ₹9,00,000 - ₹14,00,000 LPA</p>
                                <p className='hover:text-white transition-all ease-in-out duration-300'><b>• Duration:</b> Full-Time</p>
                                <p className='hover:text-white transition-all ease-in-out duration-300'><b>• Evaluation Process:</b> Code Portfolio Review → API Building Assessment → Technical Deep Dive → Culture Fit.</p>
                            </div>
                            <Link to='/login' className='mt-2'>
                                <button className='border-green-800 text-green-800 hover:bg-green-800 hover:text-white transition-all duration-300 border-2 px-4 py-2 rounded-md font-bold'>Login to apply →</button>
                            </Link>
                        </div>

                        <div className='snap-start bg-black flex flex-col gap-3 rounded-2xl p-6 min-w-[85vw] xl:min-w-[50vw] max-xl:h-fit'>

                            <h2 className='text-[24px] font-bold text-[rgb(213,210,210)] hover:text-white'>Software Engineering Intern (MERN)</h2>
                            
                            <div className='text-[rgb(167,165,165)] flex flex-col gap-2'>
                                <p className='hover:text-white transition-all ease-in-out duration-300'><b>• Description:</b> Work directly with senior engineers to build and ship production features. Gain practical experience debugging complex systems, writing clean code, and participating in code reviews.</p>
                                <p className='hover:text-white transition-all ease-in-out duration-300'><b>• Stipend:</b> ₹20,000 - ₹30,000 / Month</p>
                                <p className='hover:text-white transition-all ease-in-out duration-300'><b>• Duration:</b> 6 Months (Pre-Placement Offer eligible)</p>
                                <p className='hover:text-white transition-all ease-in-out duration-300'><b>• Evaluation Process:</b> GitHub Profile Review → 1-Hour Logic & DSA Interview → Manager Discussion.</p>
                            </div>

                            <Link to='/login' className='mt-2'>
                                <button className='border-green-800 text-green-800 hover:bg-green-800 hover:text-white transition-all duration-300 border-2 px-4 py-2 rounded-md font-bold'>Login to apply →</button>
                            </Link>

                        </div>

                    </div>

                    <button onClick={() => scrollRight()} className='text-4xl text-[rgb(167,165,165)] cursor-pointer'><img src="right.svg" alt="" className='w-3.75' /></button>
                
                </div>

            </div>

            <div className='max-xl:block xl:block hidden bg-black mt-10'><Footer /></div>
            {/* <div className='xl:hidden max-lg:hidden lg:block w-screen absolute bottom-0'><Footer /></div> */}
            
        </div>
    )
}

export default Careers
