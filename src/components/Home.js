import React, { useState} from "react";
import Contact from "./Contact";

import Finder from "./Finder";



const Home = () => {
  
  const [home,setHome] = useState(true);
  const [finder,setFinder] = useState(false);
  const [sendEmail,setSendEmail] = useState(false);

const emailHandler = () => {
  setSendEmail(true);
  setHome(false);
  setFinder(false);
}
const validateHandler = () => {
  setSendEmail(false);
  setHome(false);
  setFinder(true);
}

const homeHandler = () => {
  setHome(true);
  setFinder(false);
  setSendEmail(false);
}

  

  return (

    <div className="relative flex flex-col items-center justify-center">
    {home ? "" : 
    <div onClick={homeHandler} className="bg-blue-700  hover:bg-blue-600  absolute w-[55px] h-10 top-0 left-0 cursor-pointer ml-[-50px] rounded-l-lg z-[9]">
    <img className="w-10 h-10 px-1" src="back-arrow.svg" alt="back"/>
    </div>
    }
    {home &&  <div
      
      className="bg-slate-700 px-10 pt-5 pb-5  rounded-md flex flex-col items-center justify-center space-y-4 shadow-2xl"
    >
      <h1 className="text-white text-[32px] font-bold">DoWell Email API</h1>
      <div className="flex flex-col items-center justify-center w-full space-y-3">
      
      <div onClick={validateHandler}
        className="hover:bg-blue-600 rounded-md bg-blue-700   text-white font-semibold w-full py-2 text-center cursor-pointer"
      >
        Email Finder
      </div>
      <div onClick={emailHandler}
        className="hover:bg-blue-600 rounded-md bg-blue-700   text-white font-semibold w-full py-2 text-center cursor-pointer"
      >
        Send Email
      </div>

      </div>
    </div>
  }
  {sendEmail && <Contact /> }
  {finder && <Finder /> }
    </div>
  
  );
};

export default Home;
