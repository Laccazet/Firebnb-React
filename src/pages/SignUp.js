import { PiIdentificationCardThin, PiUserLight, PiKeyThin, PiEyeThin } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { mainContext } from "../context/mainContext";
import OAuth from "../components/OAuth";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

export default function SignUp() {

  const navigate = useNavigate();
  const {setLoading} = useContext(mainContext);

  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const {name, email, password} = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name
      })

      const copyFormData = {...formData};
      delete copyFormData.password;
      copyFormData.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), copyFormData);
      setLoading(false);
      navigate("/");
      toast.success("Signed Up!")

    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }

  }


  return (
    <div className="w-full h-[700px] flex-center gap-10">

      <div className="w-[500px] h-[500px] flex-center">
        <form className="sign-in flex-center shadow-xl" onSubmit={handleSubmit}>
          <h1 className=" text-[40px]">Sign Up</h1>

          <div className="input-container">
            <PiIdentificationCardThin size={20} />
            <input className="sign-input" placeholder="Name" id="name" value={name} onChange={handleChange} />
          </div>

          <div className="input-container">
            <PiUserLight size={20} />
            <input className="sign-input" placeholder="Email" id="email" value={email} onChange={handleChange} />
          </div>

          <div className="flex-center input-container">
            <PiKeyThin size={20} />
            <input className="sign-input" placeholder="Password" type={visible ? "text" : "password"} id="password" value={password} onChange={handleChange} />
            <PiEyeThin size={20} className="cursor-pointer" onClick={() => setVisible(prev => !prev) } />
          </div>

          <button className="sign-button hover:bg-transparent hover:text-black transition-all" type="submit">Sign Up</button>

          <OAuth />

          <Link to={"/sign-in"} className="w-[290px] flex-center text-[#FFA41B]">
            <p>Sign In Instead</p>
          </Link>

        </form>
      </div>

      <div className="w-[500px] h-[500px] hidden xmd:flex justify-center items-center flex-col">
        <img src={require("../assets/icon.png")} alt="" width={350} />
        <h1 className="font-bold text-[#FFA41B] text-[70px]">Firebnb</h1>
        <h1 className="text-[#FFA41B] text-[30px]">Join Us</h1>
      </div>

    </div>
  )
  }