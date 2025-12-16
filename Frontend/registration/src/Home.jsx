import React from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="App bg-slate-800 min-h-screen text-slate-200 p-6">
      <h1 className="text-3xl text-center ">Student Registration</h1>
      <h2 className="text-center font-thin text-[14px] mt-6">
        Register today. Shape your tomorrow.
      </h2>
      <div className="mt-6 flex align-middle justify-center ">
        <button
          className=" bg-white/10 p-2 rounded hover:bg-white/15 duration-75"
          onClick={() => navigate("/register")}
        >
          Register Now
        </button>
      </div>
    </div>
  );
}

export default Home;
