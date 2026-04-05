import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Navbar from './navbar'
import Footer from './footer'
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


const Register = () => {

    const handleSubmit = () => {
        // Backend Code
        toast.success("REGISTER")
    }

    const handleChange = () => {
        // Backend Code
    }

    const [RRef, RisVisible] = useScrollObserver();

    return (

        <div className='bg-black text-white'>

            <Navbar />

            <div>

                <ToastContainer />

                <div ref={RRef} className={`bg-[rgb(22,22,22)] w-[96vw] mx-auto rounded-2xl flex flex-col justify-center items-center gap-4 my-5 transition-all ease-in-out duration-300 h-fit ${RisVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} xl:h-[130vh]`}>

                    <ToastContainer position="bottom-right" />

                    <div className={`mx-auto w-[90vw] xl:w-[70vw] max-xl:flex max-xl:flex-col max-xl:justify-center max-xl:items-center`}>

                        <div className=''>
                            <h1 className='text-center text-4xl font-bold text-[rgb(213,210,210)]'>Create Your Account</h1>
                            <p className='text-center text-[rgb(167,165,165)]'>Join thousands of developers applying for top roles.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="w-[55vw] mx-auto flex flex-col border border-green-800 rounded-2xl justify-center items-center gap-3 bg-black p-5 my-5 max-xl:w-[90vw] max-xl:self-center ">

                            {/* Row 1: Name & Email */}
                            <div className="flex gap-2 justify-between w-[50vw] max-xl:w-[85vw] max-xl:flex-col">

                                <div className="flex flex-col w-[24vw] max-sm:w-[40vw]">
                                    <label htmlFor="name" className="font-bold text-[rgb(213,210,210)] pb-2">Enter Your Name:</label>
                                    <input type="text" id="name" name="name" className="text-[rgb(213,210,210)] border-2 border-green-900 rounded-[5px] h-[6vh] bg-[rgb(22,22,22)] focus:outline-none focus:border-green-500 transition-colors p-2 max-xl:w-[85vw] max-xl:h-[4vh]" onChange={handleChange} required />
                                </div>

                                <div className="flex flex-col w-[24vw] max-sm:w-[40vw]">
                                    <label htmlFor="email" className="font-bold text-[rgb(213,210,210)] pb-2">Enter Your Email:</label>
                                    <input type="email" id="email" name="email" className="text-[rgb(213,210,210)] border-2 border-green-900 rounded-[5px] h-[6vh] bg-[rgb(22,22,22)] focus:outline-none focus:border-green-500 transition-colors p-2 max-xl:w-[85vw] max-xl:h-[4vh]" onChange={handleChange} required />
                                </div>

                            </div>

                            {/* Row 2: Password & Phone */}
                            <div className="flex gap-2 justify-between w-[50vw] max-xl:w-[85vw] max-xl:flex-col">

                                <div className="flex flex-col w-[24vw] max-sm:w-[40vw]">
                                    <label htmlFor="password" className="font-bold text-[rgb(213,210,210)] pb-2">Enter Your Password:</label>
                                    <input type="password" id="password" name="password" className="text-[rgb(213,210,210)] border-2 border-green-900 rounded-[5px] h-[6vh] bg-[rgb(22,22,22)] focus:outline-none focus:border-green-500 transition-colors p-2 max-xl:w-[85vw] max-xl:h-[4vh]" onChange={handleChange} required />
                                </div>

                                <div className="flex flex-col w-[24vw] max-sm:w-[43vw]">
                                    <label htmlFor="phone" className="font-bold text-[rgb(213,210,210)] pb-2">Enter Contact Number:</label>
                                    <input type="number" id="phone" name="phone" className="text-[rgb(213,210,210)] border-2 border-green-900 rounded-[5px] h-[6vh] bg-[rgb(22,22,22)] focus:outline-none focus:border-green-500 transition-colors p-2 max-xl:w-[85vw] max-xl:h-[4vh]" onChange={handleChange} required />
                                </div>

                            </div>

                            {/* Row 3: Location & City */}
                            <div className="flex gap-2 justify-between w-[50vw] max-xl:w-[85vw] max-xl:flex-col">

                                <div className="flex flex-col w-[24vw] max-sm:w-[40vw]">
                                    <label htmlFor="location" className="font-bold text-[rgb(213,210,210)] pb-2">Location:</label>
                                    <input type="text" id="location" name="location" className="text-[rgb(213,210,210)] border-2 border-green-900 rounded-[5px] h-[6vh] bg-[rgb(22,22,22)] focus:outline-none focus:border-green-500 transition-colors p-2 max-xl:w-[85vw] max-xl:h-[4vh]" onChange={handleChange} required />
                                </div>

                                <div className="flex flex-col w-[24vw] max-sm:w-[40vw]">
                                    <label htmlFor="city" className="font-bold text-[rgb(213,210,210)] pb-2">City:</label>
                                    <input type="text" id="city" name="city" className="text-[rgb(213,210,210)] border-2 border-green-900 rounded-[5px] h-[6vh] bg-[rgb(22,22,22)] focus:outline-none focus:border-green-500 transition-colors p-2 max-xl:w-[85vw] max-xl:h-[4vh]" onChange={handleChange} required />
                                </div>

                            </div>

                            {/* Row 4: College & Degree */}
                            <div className="flex gap-2 justify-between w-[50vw] max-xl:w-[85vw] max-xl:flex-col">

                                <div className="flex flex-col w-[24vw] max-sm:w-[40vw]">
                                    <label htmlFor="college" className="font-bold text-[rgb(213,210,210)] pb-2">College:</label>
                                    <input type="text" id="college" name="college" className="text-[rgb(213,210,210)] border-2 border-green-900 rounded-[5px] h-[6vh] bg-[rgb(22,22,22)] focus:outline-none focus:border-green-500 transition-colors p-2 max-xl:w-[85vw] max-xl:h-[4vh]" onChange={handleChange} required />
                                </div>

                                <div className="flex flex-col w-[24vw] max-sm:w-[40vw]">
                                    <label htmlFor="degree" className="font-bold text-[rgb(213,210,210)] pb-2">Degree:</label>
                                    <input type="text" id="degree" name="degree" className="text-[rgb(213,210,210)] border-2 border-green-900 rounded-[5px] h-[6vh] bg-[rgb(22,22,22)] focus:outline-none focus:border-green-500 transition-colors p-2 max-xl:w-[85vw] max-xl:h-[4vh]" onChange={handleChange} required />
                                </div>

                            </div>

                            {/* Row 5: Year of Passing & CGPA */}
                            <div className="flex gap-2 justify-between w-[50vw] max-xl:w-[85vw] max-xl:flex-col">
                                
                                <div className="flex flex-col w-[24vw] max-sm:w-[40vw]">
                                    <label htmlFor="yearOfPassing" className="font-bold text-[rgb(213,210,210)] pb-2">Year of Passing:</label>
                                    <input type="number" id="yearOfPassing" name="yearOfPassing" className="text-[rgb(213,210,210)] border-2 border-green-900 rounded-[5px] h-[6vh] bg-[rgb(22,22,22)] focus:outline-none focus:border-green-500 transition-colors p-2 max-xl:w-[85vw] max-xl:h-[4vh]" onChange={handleChange} required />
                                </div>

                                <div className="flex flex-col w-[24vw] max-sm:w-[40vw]">
                                    <label htmlFor="cgpa" className="font-bold text-[rgb(213,210,210)] pb-2">CGPA:</label>
                                    <input type="number" step="0.01" id="cgpa" name="cgpa" className="text-[rgb(213,210,210)] border-2 border-green-900 rounded-[5px] h-[6vh] bg-[rgb(22,22,22)] focus:outline-none focus:border-green-500 transition-colors p-2 max-xl:w-[85vw] max-xl:h-[4vh]" onChange={handleChange} required />
                                </div>

                            </div>

                            {/* Row 6: Pincode & Current Company */}
                            <div className="flex gap-2 justify-between w-[50vw] max-xl:w-[85vw] max-xl:flex-col">

                                <div className="flex flex-col w-[24vw] max-sm:w-[40vw]">
                                    <label htmlFor="pincode" className="font-bold text-[rgb(213,210,210)] pb-2">Pincode:</label>
                                    <input type="text" id="pincode" name="pincode" className="text-[rgb(213,210,210)] border-2 border-green-900 rounded-[5px] h-[6vh] bg-[rgb(22,22,22)] focus:outline-none focus:border-green-500 transition-colors p-2 max-xl:w-[85vw] max-xl:h-[4vh]" onChange={handleChange} required />
                                </div>

                                <div className="flex flex-col w-[24vw] max-sm:w-[52vw]">
                                    <label htmlFor="currentCompany" className="font-bold text-[rgb(213,210,210)] pb-2">Current Company (Optional):</label>
                                    <input type="text" id="currentCompany" name="currentCompany" className="text-[rgb(213,210,210)] border-2 border-green-900 rounded-[5px] h-[6vh] bg-[rgb(22,22,22)] focus:outline-none focus:border-green-500 transition-colors p-2 max-xl:w-[85vw] max-xl:h-[4vh]" onChange={handleChange} />
                                </div>

                            </div>

                            {/* Row 7: Current Position & Current Salary */}
                            <div className="flex gap-2 justify-between w-[50vw] max-xl:w-[85vw] max-xl:flex-col">

                                <div className="flex flex-col w-[24vw] max-sm:w-[52vw]">
                                    <label htmlFor="currentPosition" className="font-bold text-[rgb(213,210,210)] pb-2">Current Position (Optional):</label>
                                    <input type="text" id="currentPosition" name="currentPosition" className="text-[rgb(213,210,210)] border-2 border-green-900 rounded-[5px] h-[6vh] bg-[rgb(22,22,22)] focus:outline-none focus:border-green-500 transition-colors p-2 max-xl:w-[85vw] max-xl:h-[4vh]" onChange={handleChange} />
                                </div>

                                <div className="flex flex-col w-[24vw] max-sm:w-[52vw]">
                                    <label htmlFor="currentSalary" className="font-bold text-[rgb(213,210,210)] pb-2">Current Salary (Optional):</label>
                                    <input type="number" id="currentSalary" name="currentSalary" className="text-[rgb(213,210,210)] border-2 border-green-900 rounded-[5px] h-[6vh] bg-[rgb(22,22,22)] focus:outline-none focus:border-green-500 transition-colors p-2 max-xl:w-[85vw] max-xl:h-[4vh]" onChange={handleChange} />
                                </div>

                            </div>

                            {/* Submit & Links */}
                            <div className="flex flex-col w-[50vw] pt-3 max-xl:w-[85vw]">

                                <button type="submit" className="self-start border-green-800 text-green-800 hover:bg-green-800 hover:text-white transition-all duration-300 border-2 px-6 py-2 mb-4 rounded-md font-bold">
                                    Register
                                </button>

                                <div className="flex gap-2 self-start text-[rgb(167,165,165)] max-xl:justify-around">
                                    <span>Have an account already?</span>
                                    <Link to="/login" className="hover:text-white transition-all ease-in-out duration-300 underline underline-offset-4">
                                        Login
                                    </Link>
                                </div>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

            <Footer />

        </div>
    )
}

export default Register
