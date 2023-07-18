import { useState, useContext } from "react"
import { mainContext } from "../context/mainContext";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { PiUserLight } from "react-icons/pi";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const {setLoading} = useContext(mainContext);

  const handleChange = (e) => {setEmail(e.target.value)}

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      toast.success("Email was send")
    } catch (error) {
      setLoading(false);
      toast.error("Could not sent reset email")
    }
  }

  return (
    <div className="w-full h-[500px] flex-center">
      <form onSubmit={handleSubmit}
      className="w-[350px] xmd:w-[400px] h-[250px] flex-center flex-col gap-5 border-[1px] border-[#FFA41B] rounded-3xl shadow-md">
        <h1 className="text-2xl text-[#FFA41B] font-bold">Forgot Password</h1>
        <div className="input-container">
          <PiUserLight />
          <input className="sign-input" placeholder="Email" value={email} onChange={handleChange} />
        </div>
        <button className="sign-button hover:bg-transparent hover:text-black transition-all" type="submit">Send Reset Link</button>
        <Link to={"/sign-in"} className="text-[#FFA41B]">Sign In</Link>
      </form>
    </div>
  )
  }