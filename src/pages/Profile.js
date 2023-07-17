import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {

  const navigate = useNavigate();

  const auth = getAuth();

  const logOut = () => {
    auth.signOut();
    navigate("/");
  }

  return (
    <div className="w-full h-full flex-center">

      <div className="w-3/12 h-full pt-5 pl-5">
      <div className="w-full h-[300px] border-[1px] border-[#FFA41B] rounded-3xl flex-center flex-col">
        <div className="w-full h-2/6 flex justify-start items-center pl-4">
          <h1 className="text-[40px] font-bold text-[#FFA41B]">My Profile</h1>
        </div>

        <div className="w-full h-4/6 flex justify-center items-start flex-col gap-3 pl-4">
          <div className="w-2/4">
            <h1 className="text-lg">Name</h1>
            <h1 className="text-xl font-bold">{auth.currentUser.displayName}</h1>
          </div>
          <div className="w-2/4">
            <h1 className="text-lg">Email</h1>
            <h1 className="text-xl font-bold">{auth.currentUser.email}</h1>
          </div>
          <button className="log-out-button hover:bg-transparent hover:text-black transition-all" onClick={logOut}>Log Out</button>
        </div>
      </div>
      </div>

      <div className="w-9/12 h-full flex justify-center items-start pt-5">
        <div className="w-[700px] h-[300px] border-[1px] border-[#FFA41B] rounded-3xl"></div>
      </div>

    </div>
  )
  }