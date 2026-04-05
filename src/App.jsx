import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/footer'
import About from './components/about'
import Services from './components/services'
import Contact from './components/contact'
import Login from './components/login'
import Register from './components/register'
import Careers from './components/careers'
import FAQ from './components/faq'
import Privacy from './components/privacy'
import Terms from './components/t&c'
import Support from './components/support'
import { Link, useLocation } from 'react-router-dom'


// Handler For Handling Sliding Up Effect
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

function Home() {

  // Handlers For Correct Sliding Of Cards.
  const scrollRight = (ref) => {
    const scrollAmount = window.innerWidth * 0.41

    ref.current.scrollBy({ left: scrollAmount, behaviour: "smooth" })
  }

  const scrollLeft = (ref) => {
    const scrollAmount = window.innerWidth * 0.41;

    ref.current.scrollBy({ left: -scrollAmount, behaviour: 'smooth' })
  }

  // Handler To Enable/Disable The Sandwich Navigation Bar
  const handleSandwich = () => {
    console.log("button")
    setSandwich(!sandwich)
  }

  // Variables Used To Determine What Is The Current Page, For Highlighting That Specific Title In The Navigation Bar
  const location = useLocation();
  const isAboutActive = location.pathname === '/about';
  const isServicesActive = location.pathname === '/services';
  const isCareersActive = location.pathname === '/careers';
  const isDemoActive = location.pathname === '/demo';
  const isContactActive = location.pathname === '/contact';
  const isSupportActive = location.pathname === '/support';
  const isLoginActive = location.pathname === '/login';


  // Variable For Sandwich Navigation Bar
  const [sandwich, setSandwich] = useState(false);
 const images = [
  `${import.meta.env.BASE_URL}tech/5.png`,
  `${import.meta.env.BASE_URL}tech/6.png`,
  `${import.meta.env.BASE_URL}tech/7.png`,
  `${import.meta.env.BASE_URL}tech/8.png`,
  `${import.meta.env.BASE_URL}tech/9.png`,
  `${import.meta.env.BASE_URL}tech/10.png`,
  `${import.meta.env.BASE_URL}tech/11.png`,
  `${import.meta.env.BASE_URL}tech/12.png`,
  `${import.meta.env.BASE_URL}tech/13.png`,
  `${import.meta.env.BASE_URL}tech/14.png`,
  `${import.meta.env.BASE_URL}tech/15.png`,
  `${import.meta.env.BASE_URL}tech/16.png`,
  `${import.meta.env.BASE_URL}tech/17.png`,
  `${import.meta.env.BASE_URL}tech/18.png`,
  `${import.meta.env.BASE_URL}tech/19.png`,
  `${import.meta.env.BASE_URL}tech/20.png`,
  `${import.meta.env.BASE_URL}tech/21.png`,
  `${import.meta.env.BASE_URL}tech/22.png`,
  `${import.meta.env.BASE_URL}tech/23.png`,
  `${import.meta.env.BASE_URL}tech/1.png`,
  `${import.meta.env.BASE_URL}tech/2.png`,
  `${import.meta.env.BASE_URL}tech/3.png`,
  `${import.meta.env.BASE_URL}tech/4.png`
];

  // only works for src
  // useEffect(() => {

  //   const imageModules = import.meta.glob("/tech/*.{png}",{
  //     eager: true
  //   })

  //   const loadedImages = Object.values(imageModules).map((module)=> module.default)
  //   setImages(loadedImages);
  // }, [])




  // Variables For Activating Slide Up Effect On The Containers
  const [aboutRef, aboutisVisible] = useScrollObserver();
  const [servicesRef, servicesisVisible] = useScrollObserver();
  const [whyusRef, whyusisVisible] = useScrollObserver();
  const [techRef, techisVisible] = useScrollObserver();
  const [projectRef, projectisVisible] = useScrollObserver();
  const [testimonialsRef, testimonialsisVisible] = useScrollObserver();
  const [ctaRef, ctaisVisible] = useScrollObserver();

  // Variables For Sending As Parameters To The Scroll Handlers 
  const service_scroll = useRef();
  const whyus_scroll = useRef();
  const tech_scroll = useRef();
  const project_scroll = useRef();
  const testimonial_scroll = useRef();


  return (
    <>
      {/* Main Container */}
      <div className='max-sm:overflow-x-hidden'>

        {/* HERO SECTION */}
        <div className='text-white h-[80vh] Transition flex flex-col xl:h-screen'>

          {/* HOME PAGE BG PICTURE */}
          <img src={`${import.meta.env.BASE_URL}bg2.png`} alt="bg" className='absolute -z-10 object-cover w-screen h-[80vh] xl:h-screen' />
          {/* NAVBAR */}
          <div className='flex justify-between items-center'>


            <div className='w-fit h-fit items-center flex gap-15'>

              <div className='flex justify-center items-center gap-5'>
                <Link to='/'><img src={`${import.meta.env.BASE_URL}company_logo.png`} alt="logo" className='ml-5 w-20 h-20' /></Link>
                <button onClick={() => { handleSandwich() }} className='block text-[rgb(167,165,165)] font-bold border-2 border-orange-400 p-2 rounded-2xl hover:bg-orange-400 transition-all ease-in-out duration-300 hover:text-white lg:hidden'>More</button>
              </div>

              <div className={`hidden lg:flex lg:items-center lg:gap-10 `}>
                <Link to='/about'><div className={`w-[7vw] h-[6vh] rounded-[10px] flex justify-center items-center ${isAboutActive ? "bg-orange-400 text-white" : ""} hover:bg-orange-400 transition-all ease-in-out duration-300 hover:text-white`}>About</div></Link>
                <Link to='/services'><div className={`w-[7vw] h-[6vh]  rounded-[10px] flex justify-center items-center ${isServicesActive ? "bg-orange-400 text-white" : ""} hover:bg-orange-400 transition-all ease-in-out duration-300 hover:text-white`}>Services</div></Link>
                <Link to='/careers'><div className={`w-[7vw] h-[6vh]  rounded-[10px] flex justify-center items-center ${isCareersActive ? "bg-orange-400 text-white" : ""} hover:bg-orange-400 transition-all ease-in-out duration-300 hover:text-white`}>Careers</div></Link>
                <button className={` className= ${isDemoActive ? "text-orange-400" : ""} w-[8vw] h-fit p-2 border-2 border-amber-500 rounded-[10px] font-bold hover:text-orange-400 transition-all ease-in-out duration-300`}>Get a Demo</button>
              </div>

            </div>

            <div className='hidden lg:flex lg:items-center lg:gap-10 lg:mr-5 transition-all ease-in-out duration-300'>

              <Link to='/contact'><div className={`w-[7vw] h-[6vh] rounded-[10px] flex justify-center items-center ${isContactActive ? "bg-green-950 text-white" : ""} hover:bg-green-800 transition-all ease-in-out duration-300 hover:text-white`}>Contact Us</div></Link>
              <Link to='/support'><div className={`w-[7vw] h-[6vh] rounded-[10px] flex justify-center items-center ${isSupportActive ? "bg-green-950 text-white" : ""} hover:bg-green-800 transition-all ease-in-out duration-300 hover:text-white`}>Support</div></Link>
              <Link to='/login'><div className={`w-[7vw] h-[6vh] rounded-[10px] flex justify-center items-center ${isLoginActive ? "bg-green-950 text-white" : ""} hover:bg-green-800 transition-all ease-in-out duration-300 hover:text-white`}>Login</div></Link>

            </div>


          </div>


          {/* SANDWICH */}
          <div className={`bg-black text-white w-[50vw] h-screen absolute z-1 flex flex-col gap-0 transition-all ease-in-out duration-300 ${sandwich ? " translate-x-0" : "-translate-x-full"}`}>


            <div className=''>
              <Link to='/'><img src={`${import.meta.env.BASE_URL}company_logo.png`} alt="logo" className='ml-5 w-20 h-20' /></Link>
            </div>

            <div className={`flex flex-col justify-center ml-5`}>

              <Link to='/about'><div className={`w-[7vw] h-[6vh] rounded-[10px] ${isAboutActive ? "bg-orange-400 text-white" : ""} hover:bg-orange-400 transition-all ease-in-out duration-300 hover:text-white`}>About</div></Link>
              <Link to='/services'><div className={`w-[7vw] h-[6vh]  rounded-[10px] ${isServicesActive ? "bg-orange-400 text-white" : ""} hover:bg-orange-400 transition-all ease-in-out duration-300 hover:text-white`}>Services</div></Link>
              <Link to='/careers'><div className={`w-[7vw] h-[6vh]  rounded-[10px] ${isCareersActive ? "bg-orange-400 text-white" : ""} hover:bg-orange-400 transition-all ease-in-out duration-300 hover:text-white`}>Careers</div></Link>

            </div>


            <div className='transition-all ease-in-out duration-300 ml-5'>

              <Link to='/contact'><div className={`w-[18vw] h-[6vh] rounded-[10px] ${isContactActive ? "bg-green-950 text-white" : ""} hover:bg-green-800 transition-all ease-in-out duration-300 hover:text-white max-sm:w-[25vw]`}>Contact Us</div></Link>
              <Link to='/support'><div className={`w-[18vw] h-[6vh] rounded-[10px] ${isSupportActive ? "bg-green-950 text-white" : ""} hover:bg-green-800 transition-all ease-in-out duration-300 hover:text-white`}>Support</div></Link>
              <Link to='/login'><div className={`w-[18vw] h-[6vh] rounded-[10px] ${isLoginActive ? "bg-green-950 text-white" : ""} hover:bg-green-800 transition-all ease-in-out duration-300 hover:text-white`}>Login</div></Link>

            </div>

            <button className={` className= ${isDemoActive ? "text-orange-400" : ""} w-[28vw] h-fit border-2 border-amber-500 rounded-[10px] font-bold hover:text-orange-400 transition-all ease-in-out duration-300 ml-5 p-1`}>Get a Demo</button>
            <button onClick={() => { handleSandwich() }} className={` className= ${isDemoActive ? "text-orange-400" : ""} w-[28vw] h-fit p-1 border-2 border-green-900 rounded-[10px] font-bold hover:text-orange-400 transition-all ease-in-out duration-300 ml-5 mt-2`}>Close</button>


          </div>

          {/* WELCOME TEXT */}
          <div className='my-auto flex flex-col gap-2 pl-5'>

            <div><h1 className='m-0 leading-none text-[clamp(2rem,5vw,5rem)] font-bold max-sm:text-5xl'>Landmine Soft</h1></div>
            <div><h1 className='m-0 leading-none text-[clamp(2rem,3vw,4rem)] font-bold max-sm:text-2xl'>Building Intelligent Products for a Digital-First World</h1></div>
            <div><h1 className='m-0 leading-none text-[clamp(1rem,1.6vw,2rem)] font-medium max-sm:text-lg mt-1'>We design and build AI-powered software, modern web platforms, and cloud-native solutions tailored to your business.</h1></div>

            <div className='flex gap-5 text-[18px] font-normal max-sm:text-[15px] mt-1'>

              <button className='w-[20vw] h-fit p-3 border-2 border-orange-400 rounded-[10px] hover:shadow-[0_0_2px_2px_rgba(255,193,7,25)] max-sm:w-[50vw] max-sm:h-fit'>Schedule a Free Consultation</button>
              <button className='w-[12vw] border-2 border-green-800 rounded-[10px] hover:shadow-[0_0_2px_2px_rgba(34,197,94,25)] max-sm:w-[34vw]'>View Our Projects</button>

            </div>
          </div>

        </div>

        {/* MAIN CONTENT */}
        <div className='bg-black border'>

          {/* ABOUT US */}
          <div ref={aboutRef} className={`text-white w-[96vw] mx-auto items-center transition-all ease-in duration-300 rounded-2xl
           ${aboutisVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} flex flex-col justify-center items-center h-fit gap-5 pt-2 my-10 xl:h-[60vh] xl:flex xl:flex-row xl:gap-40 xl:mt-10 `}>

            <img src={`${import.meta.env.BASE_URL}meeting/meeting.jpg`} alt="" className='w-full h-full absolute -z-10 object-cover rounded-2xl' />
            <div className='w-full h-full absolute -z-1 bg-[rgba(0,0,0,0.65)]'></div>

            {/* SHOW BELOW LAPTOP */}
            <div className='block xl:hidden'><h1 className='block text-[clamp(2rem,4vw,4rem)] font-bold text-[rgb(213,210,210)] xl:hidden'>About Us</h1></div>

            <div className='xl:w-[60vw] h-fit text-[clamp(1rem,1.5vw,1.5rem)] font-normal text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 w-[80vw] xl:font-bold xl:text-[rgb(249,243,243)]'><h1>Landmine Soft is a software development agency specializing in high-performance web applications and scalable IT solutions. We focus on delivering clean code, intuitive user interfaces, and robust architectures that solve real business problems. From responsive frontend designs to complex SaaS platforms, we build practical, fast, and reliable digital products without unnecessary complexity.</h1></div>

            {/* SHOW ABOVE LAPTOP */}
            <div><h1 className=' font-bold text-[rgb(213,210,210)] hidden xl:block text-[clamp(2rem,4vw,4rem)]'>About Us</h1></div>

          </div>

          {/* SERVICES */}
          <div ref={servicesRef} className={`rounded-2xl w-[96vw] mx-auto items-center transition-all ease-in duration-300 h-fit justify-center flex flex-col gap-5 py-2 my-10 xl:flex-col xl:justify-center xl:items-center xl:py-5 xl:gap-10 ${servicesisVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            <div className='xl:w-[35vw] flex flex-col gap-0 w-[85vw] '>

              <h1 className='text-[clamp(2rem,4vw,4rem)] font-bold text-[rgb(213,210,210)] max-xl:text-center text-center'>Services</h1>
              <h3 className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 max-xl:text-sm max-xl:text-center text-center'>Crafting digital excellence that drives business transformation forward.</h3>

            </div>

            {/* CARDS */}
            <div className='flex gap-2'>
              <button onClick={() => scrollLeft(service_scroll)} className='text-4xl text-[rgb(167,165,165)] cursor-pointer xl:hidden'><img src="left.svg" alt="" className='w-3.75' /></button>

              <div ref={service_scroll} className=' rounded-2xl flex overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden snap-x snap-mandatory max-w-[80vw] h-fit  max-xl:hover:shadow-[0_0_2px_2px_rgba(255,193,7,25)] max-xl:bg-amber-600 xl:grid xl:grid-cols-2 xl:grid-rows-3 xl:min-w-[95vw] xl:h-fit xl:gap-5 xl:p-3 '>

                <div className='snap-start xl:hover:shadow-[0_0_2px_2px_rgba(255,193,7,25)] bg-amber-600 xl:min-w-[45vw] xl:h-[20vh] rounded-2xl flex flex-col gap-5 items-center justify-center
                 min-w-[80vw] h-max py-5 text-center'>
                  <h1 className='text-[18px] font-bold Transition text-black hover:text-white'>Agentic AI, RAG & LLM Solutions</h1>
                  <p className='mx-3.75 break-keep text-black Transition hover:text-white'>We build intelligent autonomous agents, retrieval‑augmented generation systems, and custom language models that automate workflows and decision‑making.</p>
                </div>

                <div className='snap-start xl:hover:shadow-[0_0_2px_2px_rgba(255,193,7,25)] bg-amber-600 xl:min-w-[45vw] xl:h-[20vh] rounded-2xl flex flex-col gap-5 items-center justify-center min-w-[80vw] h-max py-5 text-center'>
                  <h1 className='text-[18px] font-bold Transition text-black hover:text-white'>Web & Software Product Development</h1>
                  <p className='mx-3.75 break-keep text-black Transition hover:text-white'>We design and ship full‑stack web products and platforms with clean architecture, scalable APIs, and modern frontends tailored to your business.</p>
                </div>

                <div className='snap-start xl:hover:shadow-[0_0_2px_2px_rgba(255,193,7,25)] bg-amber-600 xl:min-w-[45vw] xl:h-[20vh] rounded-2xl flex flex-col gap-5 items-center justify-center min-w-[80vw] h-max py-5 text-center'>
                  <h1 className='text-[18px] font-bold Transition text-black hover:text-white'>Cloud Platforms & DevOps</h1>
                  <p className='mx-3.75 break-keep text-black Transition hover:text-white'>We architect, migrate, and optimize secure cloud platforms with CI/CD pipelines, observability, and best‑practice security baked in.</p>
                </div>

                <div className='snap-start xl:hover:shadow-[0_0_2px_2px_rgba(255,193,7,25)] bg-amber-600 xl:min-w-[45vw] xl:h-[20vh] rounded-2xl flex flex-col gap-5 items-center justify-center min-w-[80vw] h-max py-5 text-center'>
                  <h1 className='text-[18px] font-bold Transition text-black hover:text-white'>AI‑Powered Analytics & Automation</h1>
                  <p className='mx-3.75 break-keep text-black Transition hover:text-white'>We turn raw data into usable insights with ML pipelines, dashboards, and workflow automation that unlock faster, smarter decisions.</p>
                </div>

                <div className='snap-start xl:hover:shadow-[0_0_2px_2px_rgba(255,193,7,25)] bg-amber-600 xl:min-w-[45vw] xl:h-[20vh] rounded-2xl flex flex-col gap-5 items-center justify-center min-w-[80vw] h-max py-5 text-center'>
                  <h1 className='text-[18px] font-bold Transition text-black hover:text-white'>Mobile & Web App Experiences</h1>
                  <p className='mx-3.75 break-keep text-black Transition hover:text-white'>We craft high‑performance web and mobile interfaces that feel fast, intuitive, and consistent across devices and browsers.</p>
                </div>

                <div className='snap-start xl:hover:shadow-[0_0_2px_2px_rgba(255,193,7,25)] bg-amber-600 xl:min-w-[45vw] xl:h-[20vh] rounded-2xl flex flex-col gap-5 items-center justify-center min-w-[80vw] h-max py-5 text-center'>
                  <h1 className='text-[18px] font-bold Transition text-black hover:text-white'>Architecture Consulting & Tech Strategy</h1>
                  <p className='mx-3.75 break-keep text-black Transition hover:text-white'>We help you choose the right stack, design future‑proof architectures, and plan delivery roadmaps for your AI and software initiatives.</p>
                </div>

              </div>

              <button onClick={() => scrollRight(service_scroll)} className='text-4xl text-[rgb(167,165,165)] cursor-pointer xl:hidden'><img src="right.svg" alt="" className='w-3.75' /></button>

            </div>

          </div>

          {/* WHY US */}
          <div ref={whyusRef} className={`rounded-2xl w-[96vw] bg-[rgb(22,22,22)] mx-auto flex items-center transition-all ease-in duration-300 flex-col justify-center h-fit gap-5 py-2 my-10 xl:flex xl:justify-center xl:items-center xl:py-5 ${whyusisVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} `}>

            <img src={`${import.meta.env.BASE_URL}meeting/choose.jpg`} alt="" className='h-full w-full absolute -z-10 object-cover rounded-2xl' />
            <div className='h-full w-full absolute -z-1 bg-[rgba(0,0,0,0.65)]'></div>

            <div className='flex flex-col gap-2 xl:w-[40vw] w-[85vw]'>
              <h1 className='text-[clamp(2rem,4vw,4rem)] font-bold text-[rgb(213,210,210)] text-center'>Why Choose Us?</h1>
              <h3 className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 max-xl:text-sm text-center'>Building your product with an experienced team that commits to timelines and outcomes.</h3>
            </div>

            <div className='flex gap-2 max-xl:items-center'>

              <button onClick={() => scrollLeft(whyus_scroll)} className='text-4xl text-[rgb(167,165,165)] cursor-pointer  max-xl:w-5 max-xl:h-5 max-xl:rounded-full max-xl:bg-black'> <img src="left.svg" alt="" className='w-3.75 max-xl:mx-auto' /> </button>

              <div ref={whyus_scroll} className='max-xl:bg-[rgba(0,0,0,0.54)] rounded-2xl flex overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden snap-x snap-mandatory max-w-[80vw] h-fit xl:grid xl:grid-cols-2 xl:grid-rows-3 xl:max-w-[95vw] xl:h-fit xl:gap-10'>

                <div className='bg-[rgba(0,0,0,0.54)] snap-start xl:min-w-[40vw] xl:h-fit rounded-2xl flex flex-col gap-5 items-center justify-center
                 min-w-[80vw] h-max py-5 text-center'>
                  <h1 className='text-[18px] font-medium text-[rgb(213,210,210)] hover:text-white Transition'>Experienced engineering team</h1>
                  <p className='mx-3.75 break-keep text-[rgb(167,165,165)] hover:text-white Transition'>Work with developers who build AI, web, and cloud projects in real productionclean architecture, readable code, and modern best practices by default.</p>
                </div>

                <div className='bg-[rgba(0,0,0,0.54)] snap-start xl:min-w-[40vw] xl:h-fit rounded-2xl flex flex-col gap-5 items-center justify-center
                 min-w-[80vw] h-max py-5 text-center'>
                  <h1 className='text-[18px] font-medium text-[rgb(213,210,210)] hover:text-white Transition'>Clear timelines & commitments</h1>
                  <p className='mx-3.75 break-keep text-[rgb(167,165,165)] hover:text-white Transition'>Every project starts with a defined scope, milestones, and delivery dates, so you always know what is shipping next and when.</p>
                </div>

                <div className='bg-[rgba(0,0,0,0.54)] snap-start xl:min-w-[40vw] xl:h-fit rounded-2xl flex flex-col gap-5 items-center justify-center
                 min-w-[80vw] h-max py-5 text-center'>
                  <h1 className='text-[18px] font-medium text-[rgb(213,210,210)] hover:text-white Transition'>End‑to‑end ownership</h1>
                  <p className='mx-3.75 break-keep text-[rgb(167,165,165)] hover:text-white Transition'>From requirements and UX to development, testing, and deployment, our team stays responsible for the outcome—not just individual tasks.</p>
                </div>

                <div className='bg-[rgba(0,0,0,0.54)] snap-start xl:min-w-[40vw] xl:h-fit rounded-2xl flex flex-col gap-5 items-center justify-center
                 min-w-[80vw] h-max py-5 text-center'>
                  <h1 className='text-[18px] font-medium text-[rgb(213,210,210)] hover:text-white Transition'>Transparent communication</h1>
                  <p className='mx-3.75 break-keep text-[rgb(167,165,165)] hover:text-white Transition'>Regular stand‑ups, demo calls, and status updates keep you in the loop, with one point of contact for decisions and escalations.</p>
                </div>

                <div className='bg-[rgba(0,0,0,0.54)] snap-start xl:min-w-[40vw] xl:h-fit rounded-2xl flex flex-col gap-5 items-center justify-center
                 min-w-[80vw] h-max py-5 text-center'>
                  <h1 className='text-[18px] font-medium text-[rgb(213,210,210)] hover:text-white Transition'>Mobile & Web App Experiences</h1>
                  <p className='mx-3.75 break-keep text-[rgb(167,165,165)] hover:text-white Transition'>We craft high‑performance web and mobile interfaces that feel fast, intuitive, and consistent across devices and browsers.</p>
                </div>

                <div className='bg-[rgba(0,0,0,0.54)] snap-start xl:min-w-[40vw] xl:h-fit rounded-2xl flex flex-col gap-5 items-center justify-center
                 min-w-[80vw] h-max py-5 text-center'>
                  <h1 className='text-[18px] font-medium text-[rgb(213,210,210)] hover:text-white Transition'>Architecture Consulting & Tech Strategy</h1>
                  <p className='mx-3.75 break-keep text-[rgb(167,165,165)] hover:text-white Transition'>We help you choose the right stack, design future‑proof architectures, and plan delivery roadmaps for your AI and software initiatives.</p>
                </div>

              </div>

              <button onClick={() => scrollRight(whyus_scroll)} className='text-4xl text-[rgb(167,165,165)] cursor-pointer max-xl:w-5 max-xl:h-5 max-xl:rounded-full max-xl:bg-black'> <img src="right.svg" alt="" className='w-3.75 max-xl:mx-auto' /> </button>

            </div>

            {/* <div className='w-[30vw] xl:flex xl:flex-col gap-2 xl:hidden'>
              <h1 className='text-4xl font-bold text-[rgb(213,210,210)]'>Why Choose Us?</h1>
              <h3 className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200'>Building your product with an experienced team that commits to timelines and outcomes.</h3>
            </div> */}

          </div>

          {/*  TECH WE USE */}
          <div ref={techRef} className={`rounded-2xl w-[96vw] mx-auto flex items-center  my-10 transition-all ease-in duration-300 flex-col justify-center h-fit gap-5 py-2 xl:h-[40vh]  xl:justify-around xl:gap-10 ${techisVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} `}>

            <div className=' xl:w-[40vw] flex flex-col gap-0 w-[85vw]'>
              <h1 className='text-[clamp(2rem,4vw,4rem)] font-bold text-[rgb(213,210,210)] text-center'>Technologies We Use</h1>
              <h3 className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 max-xl:text-sm text-center'>From AI/ML experimentation to full‑scale product engineering and cloud platforms, our team helps you ship reliable, production‑ready software.</h3>
            </div>


            <div className='flex justify-center items-center gap-2'>

              <marquee behavior="smooth" direction="left" scrollamount="10">

                <div ref={tech_scroll} className='flex items-center justify-center gap-10 max-w-[80vw] h-20 leading-none xl:max-w-full xl:h-fit xl:gap-10'>

                  {[...images, ...images].map((image, index) => (
                    <img key={index} src={image} alt='techicons' className='w-20 h-20' />
                  ))}

                </div>

              </marquee>

            </div>

          </div>

          {/*  PROJECT */}
          <div ref={projectRef} className={`rounded-2xl w-[96vw] mx-auto flex items-center my-10 transition-all ease-in duration-300 flex-col justify-center h-fit gap-5 py-2 xl:h-[40vh] xl:flex-row xl:justify-around xl:gap-10 ${projectisVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} `}>

            <div className=' flex flex-col gap-0 w-[85vw] xl:w-[30vw] xl:hidden'>
              <h1 className='text-[clamp(2rem,4vw,4rem)] font-bold text-[rgb(213,210,210)] text-center'>Our Work</h1>
              <h3 className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 max-xl:text-sm max-xl:text-center'>A glimpse into the solutions we’ve built-turning ideas into clean, functional, and impactful digital products.</h3>
            </div>


            <div className='flex justify-center gap-2'>
              <button onClick={() => scrollLeft(project_scroll)} className='text-4xl text-[rgb(167,165,165)] cursor-pointer'> <img src="left.svg" alt="" className='w-3.75' /> </button>

              <div ref={project_scroll} className='xl:max-w-[40vw] xl:h-fit bg-green-400 hover:shadow-[0_0_2px_2px_rgba(34,197,94,25)] border border-green-800 rounded-2xl flex xl:gap-10 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden snap-x snap-mandatory max-w-[80vw] h-fit'>

                <div className='snap-start xl:min-w-[40vw] xl:h-[30vh] max-xl:text-center rounded-2xl flex flex-col gap-1 items-center justify-center min-w-[80vw] h-fit p-2'>
                  <h1 className='text-[18px] text-black text-center hover:text-white font-bold'>Enterprise RAG Knowledge Base</h1>
                  <p className='mx-3.75 break-keep text-black text-center hover:text-white'><b>Problem:</b> Slow manual search through dense compliance PDFs.</p>
                  <p className='mx-3.75 break-keep text-black text-center hover:text-white'><b>Solution:</b>  Built a RAG pipeline and vector database enabling instant, natural-language document querying with source citations.</p>
                  <p className='mx-3.75 break-keep text-black text-center hover:text-white'><b>Outcome:</b> Cut document retrieval time by 85%.</p>
                  <p className='mx-3.75 break-keep text-black text-center hover:text-white'><b>Tech: </b> Python, LangChain, OpenAI, Pinecone, React.</p>
                </div>

                <div className='snap-start xl:min-w-[40vw] xl:h-[30vh] max-xl:text-center rounded-2xl flex flex-col gap-1 items-center justify-center min-w-[80vw] h-fit p-2'>
                  <h1 className='text-[18px] text-black text-center hover:text-white font-bold'>Enterprise RAG Knowledge Base</h1>
                  <p className='mx-3.75 break-keep text-black text-center hover:text-white'><b>Problem:</b> Slow manual search through dense compliance PDFs.</p>
                  <p className='mx-3.75 break-keep text-black text-center hover:text-white'><b>Solution:</b>  Built a RAG pipeline and vector database enabling instant, natural-language document querying with source citations.</p>
                  <p className='mx-3.75 break-keep text-black text-center hover:text-white'><b>Outcome:</b> Cut document retrieval time by 85%.</p>
                  <p className='mx-3.75 break-keep text-black text-center hover:text-white'><b>Tech: </b> Python, LangChain, OpenAI, Pinecone, React.</p>
                </div>

                <div className='snap-start xl:min-w-[40vw] xl:h-[30vh] max-xl:text-center rounded-2xl flex flex-col gap-1 items-center justify-center min-w-[80vw] h-fit p-2'>
                  <h1 className='text-[18px] text-black text-center hover:text-white font-bold'>Enterprise RAG Knowledge Base</h1>
                  <p className='mx-3.75 break-keep text-black text-center hover:text-white'><b>Problem:</b> Slow manual search through dense compliance PDFs.</p>
                  <p className='mx-3.75 break-keep text-black text-center hover:text-white'><b>Solution:</b>  Built a RAG pipeline and vector database enabling instant, natural-language document querying with source citations.</p>
                  <p className='mx-3.75 break-keep text-black text-center hover:text-white'><b>Outcome:</b> Cut document retrieval time by 85%.</p>
                  <p className='mx-3.75 break-keep text-black text-center hover:text-white'><b>Tech: </b> Python, LangChain, OpenAI, Pinecone, React.</p>
                </div>

              </div>

              <button onClick={() => scrollRight(project_scroll)} className='text-4xl text-[rgb(167,165,165)] cursor-pointer'> <img src="right.svg" alt="" className='w-3.75' /> </button>

            </div>

            <div className=' w-[30vw] xl:flex xl:flex-col gap-0 hidden'>
              <h1 className='text-[clamp(2rem,4vw,4rem)] font-bold text-[rgb(213,210,210)]'>Our Work</h1>
              <h3 className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200'>A glimpse into the solutions we’ve built-turning ideas into clean, functional, and impactful digital products.</h3>
            </div>

          </div>

          {/* TESTIMONIALS */}
          <div ref={testimonialsRef} className={`rounded-2xl w-[96vw]  mx-auto flex items-center mt-10 transition-all ease-in duration-300 flex-col justify-center h-fit gap-5 py-2 xl:h-fit xl:flex-row xl:gap-0 ${testimonialsisVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} `}>

            <div className=' flex flex-col gap-0 w-[85vw] xl:w-[30vw]'>
              <h1 className='text-[clamp(2rem,4vw,4rem)] font-bold text-[rgb(213,210,210)] max-xl:text-center'>Testimonials</h1>
              <h3 className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 max-xl:text-center'>Hear what our partners say.</h3>
            </div>

            <div className='flex justify-center gap-2'>
              <button onClick={() => scrollLeft(testimonial_scroll)} className='text-4xl text-[rgb(167,165,165)] cursor-pointer'> <img src="left.svg" alt="" className='w-3.75' /> </button>

              <div ref={testimonial_scroll} className='xl:max-w-[50vw] xl:h-fit xl:gap-2 xl:bg-none max-xl:bg-black xl:p-2 border max-xl:border-amber-200 rounded-2xl flex overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden snap-x snap-mandatory max-w-[80vw] h-fit'>

                <div className='xl:bg-[rgb(22,22,22)] snap-start xl:min-w-[20vw] xl:h-[50vh] xl:border xl:border-amber-200 xl:hover:shadow-[0_0_2px_2px_rgba(255,215,120,0.7)] rounded-2xl flex flex-col gap-25 items-center justify-around
                 min-w-[80vw] h-max py-5 text-center'>
                  <p className='italic text-[16px] text-[rgb(167,165,165)] hover:text-white '>"Landmine Soft entirely transformed our legacy systems. Their migration to a cloud-native architecture reduced our server costs by 40% and eliminated downtime."</p>
                  <div className='w-full'>
                    <p className='w-full border border-white border-dashed'></p>

                    <h1 className='text-[18px] font-bold mt-2 text-[rgb(167,165,165)] hover:text-white'>Sarah Jenkins</h1>
                    <p className='text-sm text-gray-700'>CTO, FinTech Solutions</p>
                  </div>
                </div>

                <div className='xl:bg-[rgb(22,22,22)] snap-start xl:min-w-[20vw] xl:h-[50vh] xl:border xl:border-amber-200 xl:hover:shadow-[0_0_2px_2px_rgba(255,215,120,0.7)]  rounded-2xl flex flex-col gap-25 items-center justify-around
                 min-w-[80vw] h-max py-5 text-center'>
                  <p className='italic text-[16px] text-[rgb(167,165,165)] hover:text-white '>"The custom AI forecasting dashboard they built for us is incredible. We've reduced our warehouse overstock by almost 20% in just one quarter. Highly recommended."</p>
                  <div className='w-full'>
                    <p className='w-full border border-white border-dashed'></p>

                    <h1 className='text-[18px] font-bold mt-2 text-[rgb(167,165,165)] hover:text-white'>David Chen</h1>
                    <p className='text-sm text-gray-700'>Director of Operations, RetailCorp</p>
                  </div>
                </div>


                <div className='xl:bg-[rgb(22,22,22)] snap-start xl:min-w-[20vw] xl:h-[50vh] xl:border xl:border-amber-200 xl:hover:shadow-[0_0_2px_2px_rgba(255,215,120,0.7)] rounded-2xl flex flex-col gap-25 items-center justify-around min-w-[80vw] h-max py-5 text-center'>
                  <p className='italic text-[16px] text-[rgb(167,165,165)] hover:text-white'>
                    "Their AI automation saved our team countless hours every week. Processes that used to take half a day now run in minutes."
                  </p>
                  <div className='w-full'>
                    <p className='w-full border border-white border-dashed'></p>
                    <h1 className='text-[18px] font-bold mt-2 text-[rgb(167,165,165)] hover:text-white'>Michael Carter</h1>
                    <p className='text-sm text-gray-700'>Head of Product, Nexa Systems</p>
                  </div>
                </div>

                <div className='xl:bg-[rgb(22,22,22)] snap-start xl:min-w-[20vw] xl:h-[50vh] xl:border xl:border-amber-200 xl:hover:shadow-[0_0_2px_2px_rgba(255,215,120,0.7)] rounded-2xl flex flex-col gap-25 items-center justify-around min-w-[80vw] h-max py-5 text-center'>
                  <p className='italic text-[16px] text-[rgb(167,165,165)] hover:text-white'>
                    "We needed a scalable platform fast, and they delivered beyond expectations. The final product was clean, stable, and incredibly fast."
                  </p>
                  <div className='w-full'>
                    <p className='w-full border border-white border-dashed'></p>
                    <h1 className='text-[18px] font-bold mt-2 text-[rgb(167,165,165)] hover:text-white'>Priya Sharma</h1>
                    <p className='text-sm text-gray-700'>Founder, ElevateX</p>
                  </div>
                </div>

                <div className='xl:bg-[rgb(22,22,22)] snap-start xl:min-w-[20vw] xl:h-[50vh] xl:border xl:border-amber-200 xl:hover:shadow-[0_0_2px_2px_rgba(255,215,120,0.7)] rounded-2xl flex flex-col gap-25 items-center justify-around min-w-[80vw] h-max py-5 text-center'>
                  <p className='italic text-[16px] text-[rgb(167,165,165)] hover:text-white'>
                    "From architecture planning to deployment, the whole experience felt effortless. They think like true technical partners."
                  </p>
                  <div className='w-full'>
                    <p className='w-full border border-white border-dashed'></p>
                    <h1 className='text-[18px] font-bold mt-2 text-[rgb(167,165,165)] hover:text-white'>James Walker</h1>
                    <p className='text-sm text-gray-700'>CEO, BluePeak Digital</p>
                  </div>
                </div>

                <div className='xl:bg-[rgb(22,22,22)] snap-start xl:min-w-[20vw] xl:h-[50vh] xl:border xl:border-amber-200 xl:hover:shadow-[0_0_2px_2px_rgba(255,215,120,0.7)] rounded-2xl flex flex-col gap-25 items-center justify-around min-w-[80vw] h-max py-5 text-center'>
                  <p className='italic text-[16px] text-[rgb(167,165,165)] hover:text-white'>
                    "Their cloud migration strategy was brilliant. We saw better performance, lower costs, and zero headaches during the transition."
                  </p>
                  <div className='w-full'>
                    <p className='w-full border border-white border-dashed'></p>
                    <h1 className='text-[18px] font-bold mt-2 text-[rgb(167,165,165)] hover:text-white'>Aisha Khan</h1>
                    <p className='text-sm text-gray-700'>Operations Manager, Vertex Labs</p>
                  </div>
                </div>

              </div>

              <button onClick={() => scrollRight(testimonial_scroll)} className='text-4xl text-[rgb(167,165,165)] cursor-pointer'> <img src="right.svg" alt="" className='w-3.75' /> </button>

            </div>

          </div>


          {/* CTA */}
          <div ref={ctaRef} className={`rounded-2xl w-[96vw]  mx-auto flex items-center mt-10 transition-all ease-in duration-300 flex-col justify-center h-fit gap-3 py-2 mb-5 xl:h-[20vh] ${ctaisVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            <div className=' xl:w-[50vw] flex flex-col justify-center items-center w-[85vw]'>
              <h1 className='text-4xl font-bold text-[rgb(213,210,210)] max-sm:text-center'>Want To Know More About Us?</h1>
            </div>

            <div className='flex justify-center gap-10 max-sm:gap-5'>

              <Link className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 xl:w-[8vw] xl:h-[7vh] rounded-2xl xl:flex xl:items-center xl:justify-center xl:text-black xl:font-medium xl:bg-[rgb(60,197,224)] xl:hover:shadow-[0_0_2px_2px_rgba(34,211,238,0.7)]'>Get a Demo</Link>
              <Link to='/about' className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 xl:w-[8vw] xl:h-[7vh] rounded-2xl xl:flex xl:items-center xl:justify-center xl:text-black xl:font-medium xl:bg-[rgb(60,197,224)] xl:hover:shadow-[0_0_2px_2px_rgba(34,211,238,0.7)]'>Our Work</Link>
              <Link to='/contact' className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 xl:w-[8vw] xl:h-[7vh] rounded-2xl xl:flex xl:items-center xl:justify-center xl:text-black xl:font-medium xl:bg-[rgb(60,197,224)] xl:hover:shadow-[0_0_2px_2px_rgba(34,211,238,0.7)]'>Contact Us</Link>
              <Link to='/support' className='text-[rgb(167,165,165)] hover:text-white transition-all ease-in-out duration-200 xl:w-[8vw] xl:h-[7vh] rounded-2xl xl:flex xl:items-center xl:justify-center xl:text-black xl:font-medium xl:bg-[rgb(60,197,224)] xl:hover:shadow-[0_0_2px_2px_rgba(34,211,238,0.7)]'>Support</Link>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

function App() {
  return (

    // ROUTES TO ACCESS ALL PAGES
    <Routes>
      <Route path='/about' element={<About />} />
      <Route path='/services' element={<Services />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/careers' element={<Careers />} />
      <Route path='/faq' element={<FAQ />} />
      <Route path='/privacypolicy' element={<Privacy />} />
      <Route path='/terms&conditions' element={<Terms />} />
      <Route path='/support' element={<Support />} />
      <Route path='/' element={<Home />} />
    </Routes>

  )
}


export default App
