import React from "react";
import {useNavigate} from "react-router-dom"

const PrincipalDashboard = () => {

  const navigate = useNavigate();
  return (
    <div className="flex-1 flex items-center flex-col">
      <h1 className="text-center text-3xl font-semibold pt-6 tracking-wide">
        Principal Dashboard
      </h1>
      <div className="flex justify-evenly w-full flex-1 items-center -mt-6">
        <div className="card outline outline-indigo-500 min-h-56 text-gray-300 hover:bg-info hover:outline-none hover:text-black w-96 hover:cursor-pointer " onClick={()=> navigate('/principal/teacher')}>
          <div className="card-body">
            <h2 className="card-title ">Teacher</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            
          </div>
        </div>
        <div className="card outline outline-indigo-500 min-h-56 text-gray-300 hover:bg-info hover:outline-none hover:text-black w-96 hover:cursor-pointer" onClick={()=> navigate('/principal/student')}>
          <div className="card-body">
            <h2 className="card-title ">Student</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            
          </div>
        </div>
        <div className="card outline outline-indigo-500 min-h-56 text-gray-300 hover:bg-info hover:outline-none hover:text-black w-96 hover:cursor-pointer" onClick={()=> navigate('/principal/classroom')}>
          <div className="card-body">
            <h2 className="card-title">Classroom</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalDashboard;
