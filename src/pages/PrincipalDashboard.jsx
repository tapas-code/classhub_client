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
            <h2 className="card-title ">Manage Teachers</h2>
            <p className="pt-2">Easily add, update, or delete teacher profiles. Assign teachers to specific classrooms. </p>
            
          </div>
        </div>
        <div className="card outline outline-indigo-500 min-h-56 text-gray-300 hover:bg-info hover:outline-none hover:text-black w-96 hover:cursor-pointer" onClick={()=> navigate('/principal/student')}>
          <div className="card-body">
            <h2 className="card-title ">Manage Students</h2>
            <p className="pt-2">Handle student information with ease. Assign students to the appropriate classrooms.</p>
            
          </div>
        </div>
        <div className="card outline outline-indigo-500 min-h-56 text-gray-300 hover:bg-info hover:outline-none hover:text-black w-96 hover:cursor-pointer" onClick={()=> navigate('/principal/classroom')}>
          <div className="card-body">
            <h2 className="card-title">Manage Classrooms</h2>
            <p className="pt-2">Create and organize classrooms. Assign teachers and students to specific classes.</p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalDashboard;
