import { FiSearch } from "react-icons/fi";
import { PiCompassLight, PiTrendDownLight, PiUserLight } from "react-icons/pi";
import { SlFire } from "react-icons/sl";
import NavButton from "./NavButton";
import { useNavigate } from "react-router-dom";


export default function Header() {

    const navigate = useNavigate();

  return (
    <div className="w-full h-20 flex justify-between items-center border-b-[1px] border-gray-300 shrink-0">
        <div className="w-1/4 h-full flex justify-start items-center gap-1 pl-5">
            <SlFire size={50} color="#FFA41B" className="cursor-pointer" onClick={() => {navigate("/")}} />
            <h1 className="text-3xl font-bold text-[#FFA41B] cursor-pointer" onClick={() => {navigate("/")}}>Firebnb</h1>
        </div>

        <div className="w-[500px] h-full flex-center">
            <div className="w-[415px] h-12 flex justify-between items-center rounded-3xl shadow-md border-[1px] border-[#FFA41B]">
                <input placeholder="Country, Region, City..."
                className="w-10/12 h-11 outline-none text-xl rounded-l-3xl pl-5" />
                <div className="w-2/12 h-11 rounded-r-3xl flex justify-end items-center pr-1">
                    <button className="w-[40px] h-[40px] rounded-full bg-[#FFA41B] flex-center">
                        <FiSearch size={20} />
                    </button>
                </div>
            </div>
        </div>

        <div className="w-1/4 h-full flex-center">
            <ul className="w-full h-full flex justify-end items-center gap-5 pr-5">
                <NavButton text={"Explore"} nav={"/"} Icon={<PiCompassLight size={35} color="#FFA41B" />} />
                <NavButton text={"Offers"} nav={"/offers"} Icon={<PiTrendDownLight size={35} color="#FFA41B" />} />
                <NavButton text={"Profile"} nav={"/profile"} Icon={<PiUserLight size={35} color="#FFA41B" />} />
            </ul>
        </div>
    </div>
  )
}
