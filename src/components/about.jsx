import Footer from './footer'
import Navbar from './navbar'
import { useRef, useState, useEffect } from 'react'

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

const About = () => {
    /*
        Company vision & mission
        • What problems the company solves
        • Team section (dummy profiles allowed)
        • Core values
    */

    const [CVMRef, CVMisVisible] = useScrollObserver();
    const [PVSRef, PVSisVisible] = useScrollObserver();
    const [TRef, TisVisible] = useScrollObserver();
    const [OCVRef, OCVisVisible] = useScrollObserver();


    const team_scroll = useRef()

  // Handlers For Correct Sliding Of Cards.
  const scrollRight = () => {
    const scrollAmount = window.innerWidth * 0.50
    team_scroll.current.scrollBy({ left: scrollAmount, behaviour: "smooth" })
  }

  const scrollLeft = () => {
    const scrollAmount = window.innerWidth * 0.50;
    team_scroll.current.scrollBy({ left: -scrollAmount, behaviour: 'smooth' })
  }

    return (
        <div className='bg-black text-white'>
            <Navbar />

            {/* COMPANY V&M */}
            <div ref={CVMRef} className={`bg-[rgb(22,22,22)] w-[96vw] mx-auto rounded-2xl mt-10 mb-10 flex flex-col justify-center gap-1 transition-all ease-in-out duration-300 h-fit xl:h-[75vh] max-xl:gap-5 max-xl:pb-5 ${CVMisVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} `}>

                <h1 className='text-center pt-5 text-4xl font-bold text-[rgb(213,210,210)]'>Company's Vision & Mission</h1>

                <div className='flex flex-col justify-center items-center gap-5 xl:flex-row xl:justify-around xl:mt-5 xl:pb-10'>

                    <div className='bg-black border xl:w-[40vw] xl:h-[60vh] border-orange-400 flex flex-col gap-2 rounded-2xl p-5 w-[85vw] h-[25vh] max-xl:justify-normal max-xl:overflow-auto'>

                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Vision</h2>

                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• Architecting the Future of Cloud Infrastructure:</b> To become the premier engineering partner for startups and enterprises transitioning to highly scalable, secure, and modern cloud-native ecosystems.
                        </p>

                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• Pioneering Practical AI:</b> To lead the industry in integrating functional, AI-driven automation that solves actual operational bottlenecks rather than just chasing technological trends.
                        </p>

                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• Setting the Engineering Standard:</b> To establish a new benchmark for clean code architecture, system performance, and uncompromised data security within the Indian tech ecosystem.
                        </p>

                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• From Services to Ecosystems:</b> To evolve beyond custom software development into building proprietary, high-impact digital products and SaaS platforms that serve global markets.
                        </p>

                    </div>

                    <div className='bg-black border border-orange-400 flex flex-col gap-2 rounded-2xl p-5 w-[85vw] h-[25vh] xl:w-[40vw] xl:h-[60vh] max-xl:justify-normal max-xl:overflow-auto'>

                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Mission</h2>

                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• End-to-End Product Engineering:</b> We architect, build, and deploy robust, custom web platforms and applications using modern frameworks to meet exact business requirements.
                        </p>

                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• Legacy System Modernization:</b> We rescue, refactor, and migrate outdated, slow software into fast, maintainable, and cost-effective modern tech stacks.
                        </p>

                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• Zero Black-Box Development:</b> We operate as a true technical partner by maintaining strict transparency in our codebases, agile delivery timelines, and infrastructure metrics.
                        </p>

                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• Deploying Bulletproof Software:</b> We prioritize lightning-fast application load times, highly optimized database structures, and enterprise-grade security protocols in every project we touch.
                        </p>

                    </div>

                </div>

            </div>

            {/* PROBLEMS WE SOLVE */}
            <div ref={PVSRef} className={`bg-[rgb(22,22,22)] w-[96vw] h-fit mx-auto rounded-2xl flex flex-col items-center py-5 transition-all ease-in-out duration-300 overflow-y-auto justify-normal max-lg:h-[65vh] xl:justify-center ${PVSisVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                <h1 className='text-center text-4xl font-bold text-[rgb(213,210,210)]'>What Do We Solve?</h1>

                <div className='xl:grid xl:grid-cols-2 xl:grid-rows-2 mt-5 gap-10 flex flex-col'>

                    <div className='bg-black border xl:w-[40vw] h-fit border-orange-400 flex flex-col gap-2 rounded-2xl p-5 w-[80vw]'>
                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Legacy System Bottlenecks</h2>
                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• Modernizing Outdated Tech Stacks:</b> We rescue and refactor slow, hard-to-maintain legacy applications into fast, scalable platforms using modern frameworks and clean architecture.
                        </p>
                    </div>

                    <div className='bg-black border xl:w-[40vw] h-fit border-orange-400 flex flex-col gap-2 rounded-2xl p-5 w-[80vw]'>
                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Cloud Inefficiency & High Costs</h2>
                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• Optimizing Cloud Infrastructure:</b> We fix poorly architected deployments, reducing server burn rates and ensuring your databases and APIs can handle massive traffic spikes without crashing.
                        </p>
                    </div>

                    <div className='bg-black border xl:w-[40vw] h-fit border-orange-400 flex flex-col gap-2 rounded-2xl p-5 w-[80vw]'>
                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Manual Process Overhead</h2>
                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• Practical AI & Automation:</b> We eliminate repetitive, error-prone manual workflows by integrating secure, custom AI solutions and internal tools to drastically speed up your daily operations.
                        </p>
                    </div>

                    <div className='bg-black border xl:w-[40vw] h-fit border-orange-400 flex flex-col gap-2 rounded-2xl p-5 w-[80vw]'>
                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Unreliable Engineering Delivery</h2>
                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• Transparent, End-to-End Partnership:</b> We solve the "black-box" agency problem by guaranteeing strict codebase transparency, agile timelines, and enterprise-grade security from day one.
                        </p>
                    </div>

                </div>

            </div>

            {/* TEAM */}
            <div ref={TRef} className={`bg-[rgb(22,22,22)] w-[96vw] mx-auto rounded-2xl my-10 flex items-center transition-all ease-in-out duration-300 h-fit justify-center xl:h-[50vh] xl:flex-row xl:justify-around max-xl:gap-5 flex-col max-xl:py-5 ${TisVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                <h1 className='text-4xl font-bold text-[rgb(213,210,210)]'>Meet The Team</h1>

                <div className='flex gap-2'>

                    <button onClick={() => scrollLeft()} className='text-4xl text-[rgb(167,165,165)] cursor-pointer'><img src="left.svg" alt="" className='w-3.75' /></button>

                    <div ref={team_scroll} className='xl:max-w-[42vw] xl:h-[40vh] border-amber-600 rounded-2xl overflow-x-auto scroll-smooth border [&::-webkit-scrollbar]:hidden snap-x snap-mandatory flex gap-5 h-fit max-xl:max-w-[80vw]'>

                        <div className='snap-start bg-black border border-amber-600 rounded-2xl flex flex-col justify-center items-center xl:min-w-[42vw] max-xl:min-w-[80vw] max-xl:h-[30vh] max-xl:p-5'>
                            <img src={`${import.meta.env.BASE_URL}p1.jpg`} alt="p1" className="w-25 h-25 rounded-full object-cover mb-5 " />
                            <h1 className='text-2xl font-bold text-[rgb(213,210,210)]'>Jeremy Shoie</h1>
                            <h1 className='text-xl text-[rgb(167,165,165)] font-medium'>CEO & Software Engineer</h1>
                            <h1 className='text-[15px] text-[rgb(167,165,165)] '>10+ years of experience in Programming </h1>
                        </div>

                        <div className='snap-start bg-black border border-amber-600 rounded-2xl flex flex-col justify-center items-center xl:min-w-[42vw] max-xl:min-w-[80vw] max-xl:h-[30vh] max-xl:p-5'>
                            <img src={`${import.meta.env.BASE_URL}p2.jpg`} alt="p2" className='w-25 h-25 object-cover rounded-full border-amber-400  mb-5 ' />
                            <h1 className='text-2xl font-bold text-[rgb(213,210,210)]'>Amilia Francis</h1>
                            <h1 className='text-xl text-[rgb(167,165,165)] font-medium'>HR</h1>
                            <h1 className='text-[15px] text-[rgb(167,165,165)]'>4+ years of experience in Management</h1>
                        </div>

                        <div className='snap-start bg-black border border-amber-600 rounded-2xl flex flex-col justify-center items-center xl:min-w-[42vw] max-xl:min-w-[80vw] max-xl:h-[30vh] max-xl:p-5'>
                            <img src={`${import.meta.env.BASE_URL}p3.jpg`} alt="p1" className='w-25 h-25 object-cover rounded-full border-amber-400  mb-5 ' />
                            <h1 className='text-2xl font-bold text-[rgb(213,210,210)]'>Jacob Jordan</h1>
                            <h1 className='text-xl text-[rgb(167,165,165)] font-medium'>Software Engineer</h1>
                            <h1 className='text-[15px] text-[rgb(167,165,165)] '>7 years of experience in Backend Dev. </h1>
                        </div>

                        <div className='snap-start bg-black border border-amber-600 rounded-2xl flex flex-col justify-center items-center xl:min-w-[42vw] max-xl:min-w-[80vw] max-xl:h-[30vh] max-xl:p-5'>
                            <img src={`${import.meta.env.BASE_URL}p4.jpg`} alt="p1" className='w-25 h-25 object-cover rounded-full border-amber-400  mb-5 ' />
                            <h1 className='text-2xl font-bold text-[rgb(213,210,210)]'>Elina Rose</h1>
                            <h1 className='text-xl text-[rgb(167,165,165)] font-medium'>Cloud & DevOps Engineer</h1>
                            <h1 className='text-[15px] text-[rgb(167,165,165)] '>3 years of experience in Cloud & DevOps </h1>
                        </div>

                    </div>

                    <button onClick={() => scrollRight()} className='text-4xl text-[rgb(167,165,165)] cursor-pointer'><img src="right.svg" alt="" className='w-3.75' /></button>
                
                </div>

            </div>

            {/* OUR CORE VALUES */}
            <div ref={OCVRef} className={`bg-[rgb(22,22,22)] w-[96vw] h-fit mx-auto rounded-2xl flex flex-col items-center py-5 transition-all ease-in-out duration-300 overflow-y-auto justify-normal max-lg:h-[65vh] xl:justify-center ${OCVisVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} `}>

                <h1 className='text-center text-4xl font-bold text-[rgb(213,210,210)]'>Our Core Values</h1>
                
                <div className='xl:grid xl:grid-cols-2 xl:grid-rows-2 mt-5 gap-10 flex flex-col'>

                    <div className='bg-black border xl:w-[40vw] h-fit border-orange-400 flex flex-col gap-2 rounded-2xl p-5 w-[80vw]'>
                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Engineering Excellence</h2>
                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• Quality Without Compromise:</b> We believe in writing clean, scalable, and maintainable code. We don't cut corners, ensuring every product is built on a rock-solid foundation.
                        </p>
                    </div>

                    <div className='bg-black border xl:w-[40vw] h-fit border-orange-400 flex flex-col gap-2 rounded-2xl p-5 w-[80vw]'>
                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Radical Transparency</h2>
                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• No Black-Box Development:</b> We maintain complete openness in our processes, timelines, and codebase, ensuring you always know exactly what we are building and why.
                        </p>
                    </div>

                    <div className='bg-black border xl:w-[40vw] h-fit border-orange-400 flex flex-col gap-2 rounded-2xl p-5 w-[80vw]'>
                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Outcome Over Output</h2>
                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• Driving Real Business Value:</b> We don't just blindly close development tickets. We engineer solutions specifically designed to solve your bottlenecks and scale your operations.
                        </p>
                    </div>

                    <div className='bg-black border xl:w-[40vw] h-fit border-orange-400 flex flex-col gap-2 rounded-2xl p-5 w-[80vw]'>
                        <h2 className='text-[20px] font-bold text-[rgb(213,210,210)] hover:text-white text-center'>Continuous Innovation</h2>
                        <p className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 pl-3'>
                            <b>• Modern Stacks & Practical AI:</b> We constantly adapt to the bleeding edge of technology, integrating practical AI and cloud-native tools to future-proof your applications.
                        </p>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default About
