import { Link } from "react-router-dom";
import { GiHouse, GiSofa} from "react-icons/gi";
import { BiSolidOffer } from "react-icons/bi";
import AllListings from "../components/AllListings";
import Slider from "../components/Slider";

export default function Explore() {
  return (
    <div className="w-full min-h-full flex-center flex-col pt-7 pb-7 gap-10 ">

      <div className="w-full xmd:w-4/6 h-[300px] flex justify-evenly items-center flex-col">

        <div className="w-full h-[50px] pl-10">
          <h1 className="text-[30px] font-bold">Categories</h1>
        </div>

        <div className="w-full h-[180px] sm:h-[235px] flex justify-center gap-5 sm:gap-0 sm:justify-between items-center px-10">
          <Link to={"/category/house"} className="w-[130px] sm:w-[160px] lg:w-[200px] h-full rounded-[25px] category-item">
            <div className="w-full h-[140px] sm:h-[200px] flex-center category-image transition-all">
              <GiHouse size={100} />
            </div>
            <div className="w-full h-[40px] sm:h-[35px] flex-center">
              <h1 className="text-[25px] font-bold text-[#FFA41B]">House</h1>
            </div>
          </Link>

          <Link to={"/category/room"} className="w-[130px] sm:w-[160px] lg:w-[200px] h-full rounded-[25px] category-item">
            <div className="w-full h-[140px] sm:h-[200px] flex-center category-image transition-all">
              <GiSofa size={100} />
            </div>
            <div className="w-full h-[35px] flex-center">
              <h1 className="text-[25px] font-bold text-[#FFA41B]">Room</h1>
            </div>
          </Link>

          <Link to={"/offers"} className="w-[130px] sm:w-[160px] lg:w-[200px] h-full rounded-[25px] category-item">
            <div className="w-full h-[140px] sm:h-[200px] flex-center category-image transition-all">
              <BiSolidOffer size={100} />
            </div>
            <div className="w-full h-[35px] flex-center">
              <h1 className="text-[25px] font-bold text-[#FFA41B]">Offers</h1>
            </div>
          </Link>
        </div>

        </div>

      <div className="w-11/12 xmd:w-4/6 h-[250px] border-[3px] border-[#FFA41B]">
        <Slider />
      </div>

      <div className="w-[290px] sm:w-[560px] xmd:w-[830px] lg:w-[1100px] min-h-[500px]">
        <AllListings />
      </div>

    </div>
  )
}