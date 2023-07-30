import React, { useState , useEffect } from "react";
import axios from 'axios'


const Finder = () => {

  const YOUR_API_KEY = process.env.YOUR_API_KEY;
  

  const [name,setName] = useState("");
  const [domain,setDomain] = useState("");

  const [msg,setMsg] = useState("");

  useEffect(() => {
    const timeId = setTimeout(() => {
        setMsg("")
    }, 3000)

    return () => {
      clearTimeout(timeId);
    }
  }, [msg]);


  const handleName = (e) => {
    const inputName = e.target.value;
    setName(inputName)
    
   }
  const handleDomain = (e) => {
    const inputDomain = e.target.value;
    setDomain(inputDomain)
    
   }

   const handleSubmit = async(e) => {
    e.preventDefault();
    
    
    let data = JSON.stringify({
      "name": name,
      "domain": domain
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://100085.pythonanywhere.com/api/v1/mail/${YOUR_API_KEY}/?type=email-finder`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      if(JSON.stringify(response.data.success === 'true')){

        setMsg(JSON.stringify(response.data.message));
      }
    })
    .catch((error) => {
      if(error.code === "ERR_BAD_REQUEST"){
        setMsg("Something Went Wrong...!")
      }else {
        setMsg(error.message)
      }
      
    });

    setName("");
    setDomain("");
   }

  

  return (
    <div className="flex flex-col items-center justify-center">
    
    <form onSubmit={handleSubmit}
      
      className="bg-slate-700 px-10 pt-5 pb-5  rounded-md flex flex-col items-center justify-center space-y-5 shadow-2xl z-[10]"
    >
      <h1 className="text-white text-[32px] font-bold">Email Finder</h1>
      <input onChange={handleName} value={name}
        name="name"
        className="w-[300px] h-10 rounded-md outline-none"
        type="text"
        placeholder="Name..."
         required 
         autoComplete="off"
      />
      <input onChange={handleDomain} value={domain}
        name="domain"
        className="w-[300px] h-10 rounded-md outline-none"
        type="text"
        placeholder="Domain..."
         required 
         autoComplete="off"
      />
      
      <button
        className="hover:bg-blue-600 rounded-md bg-blue-700 w-full px-10 py-2 text-white font-semibold"
        type="submit"
      >
        Check
      </button>
    
       {msg === '' ? "" : <p className="absolute left-0 text-white font-semibold py-2 bg-black w-full rounded-md text-center">{msg}</p> }  
    
    
      
      
    </form>
    
    </div>
  );
};

export default Finder;
