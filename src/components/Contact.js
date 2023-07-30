import React, { useState, useEffect } from "react";
import axios from "axios";

const Contact = () => {

     const YOUR_API_KEY = process.env.YOUR_API_KEY;
   

    
    const [senderName,setSenderName] = useState("");
    const [senderEmail,setSenderEmail] = useState("");
    const [receiverName,setReceiverName] = useState("");
    const [receiverEmail,setReceiverEmail] = useState("");
    const [subject,setSubject] = useState("");
    const [message,setMessage] = useState("");
    
    const [errorMsg,setErrorMsg] = useState("");
    const [receiverMsg, setReceiverMsg] = useState(false);
    const [senderMsg, setSenderMsg] = useState(false);

    useEffect(() => {
      const timeId = setTimeout(() => {
        setErrorMsg("")
      }, 3000)
  
      return () => {
        clearTimeout(timeId);
      }
    }, [errorMsg]);
    
  
    const senderEmailValidation = (e) => {
      let pattern =       /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
      let senderEmailValue = e.target.value;
      setSenderEmail(senderEmailValue);
  
      if (senderEmail.match(pattern)) {
          setSenderMsg(true);
      } else {
        setSenderMsg(false);
      }

    
    };

    const receiverEmailValidation = (e) => {
      let pattern =       /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
      let receiverEmailValue = e.target.value;
      setReceiverEmail(receiverEmailValue);
  
      if (receiverEmail.match(pattern)) {
          setReceiverMsg(true);
      } else {
        setReceiverMsg(false);
      }
    };
  


    const handleSubmit = (e) => {
    
      e.preventDefault();
        
        let data = JSON.stringify({
          "email": receiverEmail,
          "name": receiverName,
          "fromName": senderName,
          "fromEmail": senderEmail,
          "subject": subject,
          "body": message
        });
        
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `https://100085.pythonanywhere.com/api/v1/mail/${YOUR_API_KEY}/?type=send-email`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios.request(config)
        .then((response) => {

          setSenderName("");
          setSenderEmail("");
          setReceiverName("");
          setReceiverEmail("");
          setSubject("");
          setMessage("");
  
          setReceiverMsg(false);
          setSenderMsg(false);
          
          if(JSON.stringify(response.status === 200)){
    
            setErrorMsg(JSON.stringify(response.data.message));
          }
        })
        .catch((error) => {
          setSenderName("");
          setSenderEmail("");
          setReceiverName("");
          setReceiverEmail("");
          setSubject("");
          setMessage("");
  
          setReceiverMsg(false);
          setSenderMsg(false);

         
          setErrorMsg("Something went wrong...!");
          
          
        });
  
        
       
        
    };

  return (
    <div className="flex flex-col items-center justify-center">
    
    <form
      onSubmit={handleSubmit}
      className="bg-slate-700 px-10 pt-5 pb-5  rounded-md flex flex-col items-center justify-center space-y-4 shadow-2xl z-[10]"
    >
      <h1 className="text-white text-[32px] font-bold">Send Email</h1>
      <input
        name="senderName"
        className="w-[300px] h-10 rounded-md outline-none"
        type="text"
        placeholder="Sender Name..."
        onChange={(e) => setSenderName(e.target.value)} required value={senderName}
        autoComplete="off" 
      />
      <div className="relative flex items-center justify-center">
      <input
        name="senderEmail"
        className="w-[300px] h-10 rounded-md outline-none"
        type="text"
        placeholder="Sender Email..."
        onChange={senderEmailValidation}
        required value={senderEmail}
        autoComplete="off" />
          {senderEmail === '' ? "" : senderMsg ? <img className="w-[24px] h-[24px] absolute right-1" src="tick.svg" alt="true" /> : <img className="w-[24px] h-[24px] absolute right-1" src="cross.svg" alt="true" />}
        </div>
      <input
        name="receiverName"
        className="w-[300px] h-10 rounded-md outline-none"
        type="text"
        placeholder="Receiver Name..."
        onChange={(e) => setReceiverName(e.target.value)} required value={receiverName}
      
        autoComplete="off"
      />
      <div className="relative flex items-center justify-center">
      <input
        name="receiverEmail"
        className="w-[300px] h-10 rounded-md outline-none"
        type="text"
        placeholder="Receiver Email..."
        onChange={receiverEmailValidation}
        required value={receiverEmail}
        autoComplete="off" />
        
        {receiverEmail === '' ? "" : receiverMsg ? <img className="w-[24px] h-[24px] absolute right-1" src="tick.svg" alt="true" /> : <img className="w-[24px] h-[24px] absolute right-1" src="cross.svg" alt="true" />}

        </div>
      <input
        name="subject"
        className="w-[300px] h-10 rounded-md outline-none"
        type="text"
        placeholder="Subject..."
        onChange={(e) => setSubject(e.target.value)}
        required value={subject} 
        autoComplete="off"
        />
      <textarea
        name="message"
        className="w-[300px] rounded-md h-40 outline-none overflow-scroll-y resize-none"
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
        required value={message} 
        autoComplete="off"
        />
      <button
        className="hover:bg-blue-600 rounded-md bg-blue-700 w-full px-10 py-2 text-white font-semibold"
        type="submit"
      >
        Send
      </button>
      {errorMsg === '' ? "" : <p className="absolute left-0 text-white font-semibold py-2 bg-black w-full rounded-md text-center">{errorMsg}</p> }
    </form>
     
    </div>
  );
};

export default Contact;