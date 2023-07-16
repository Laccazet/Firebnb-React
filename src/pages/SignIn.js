import { PiUserLight, PiKeyThin, PiEyeThin } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignIn() {

  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const {email, password} = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <div className="w-full h-full flex-center gap-10">

      <div className="w-[500px] h-[500px] flex-center">
        <form className="sign-in flex-center shadow-xl">
          <h1 className=" text-[40px]">Sign In</h1>

          <div className="input-container">
            <PiUserLight size={20} />
            <input className="sign-input" placeholder="Email" id="email" value={email} onChange={handleChange} />
          </div>

          <div className="flex-center input-container">
            <PiKeyThin size={20} />
            <input className="sign-input" placeholder="Password" type={visible ? "text" : "password"} id="password" value={password} onChange={handleChange} />
            <PiEyeThin size={20} className="cursor-pointer" onClick={() => setVisible(prev => !prev) } />
          </div>

          <Link to={"/forgot-password"} className="w-[290px] flex justify-start items-center text-[#FFA41B] mb-10">
            <p className="text-sm">Forgot your password?</p>
          </Link>

          <button className="sign-button hover:bg-transparent hover:text-black transition-all" type="submit">Sign In</button>

          <Link to={"/sign-up"} className="w-[290px] flex-center text-[#FFA41B]">
            <p>Sign Up Instead</p>
          </Link>

        </form>
      </div>

      <div className="w-[500px] h-[500px] flex-center flex-col">
        <img src={require("../assets/icon.png")} alt="" width={350} />
        <h1 className="font-bold text-[#FFA41B] text-[70px]">Firebnb</h1>
        <h1 className="text-[#FFA41B] text-[30px]">Welcome</h1>
      </div>

    </div>
  )
  }