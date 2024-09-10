import React, { useState, useEffect } from "react";

function Test() {
    const [trainers,setTrainers]=useState(null);
    useEffect (()=>{
  
      const fetchTrainers=async ()=>{
      const response =await fetch ('http://localhost:5000/api/trainers')
      const json =await response.json()
  
      if (response.ok){
        setTrainers(json)
  
      }
  
  
      };
      fetchTrainers();
    },[])
  return (
    <div>
    {trainers && trainers.map((trainer)=>(
      <p key={trainer._id}>{trainer.firstName} hii</p>

    )) }
  </div>
  )
}

export default Test