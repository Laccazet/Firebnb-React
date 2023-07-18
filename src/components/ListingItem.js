import { IoIosBed, IoIosCar, IoIosWifi, IoMdPaw } from "react-icons/io"
import { Link } from "react-router-dom"

export default function ListingItem( {listing, id} ) {


  return (
    <Link to={`/category/${listing.type}/${id}`} className='w-[350px] h-[450px] sm:w-[250px] sm:h-[350px] flex-center flex-col rounded-2xl hover:shadow-md '>

        <div style={{backgroundImage: `url("${listing.imgUrls[0]}")`}}
        className='w-full h-4/6 rounded-2xl border-[1px] border-[#FFA41B] bg-cover bg-center' />

        <div className='w-full h-2/6'>
            <div className='w-full h-3/6 pl-2'>
                <h1 className='font-bold'>{listing.name}</h1>
                {listing.offer
                ? <h1 className='text-[20px] text-[#63B341]'>
                {(listing.discountedPrice.toLocaleString())}$ <span className="text-[12px] text-[#FF491B] line-through">
                {(listing.regularPrice).toLocaleString()}$
                </span>
                <span className="text-black text-[15px]"> /night</span>
                </h1>
                : <h1 className='text-[20px] text-[#63B341]'>{listing.regularPrice}$<span className="text-black text-[15px]"> /night</span></h1>
                }
            </div>

            <div className='w-full h-3/6 flex-center flex-wrap'>
                <div className="w-2/4 h-2/4 flex justify-start items-center gap-1 pl-2">
                    <div className="w-1/4 h-full flex-center">
                        <IoIosBed size={25} />
                    </div>
                    <h1 className="text-[12px]">{listing.bedroom > 1 ? `${listing.bedroom} Bathrooms` : "1 Bedroom"}</h1>
                </div>
                <div className="w-2/4 h-2/4 flex justify-start items-center gap-1 pl-2">
                    <div className="w-1/4 h-full flex-center">
                        <IoIosWifi size={25} />
                    </div>
                    <h1 className="text-[12px]">{listing.wifi ? `Available` : "Not available"}</h1>
                </div>
                <div className="w-2/4 h-2/4 flex justify-start items-center gap-1 pl-2">
                    <div className="w-1/4 h-full flex-center">
                        <IoIosCar size={25} />
                    </div>
                    <h1 className="text-[12px]">{listing.parking ? `Free Park` : "No Park"}</h1>
                </div>
                <div className="w-2/4 h-2/4 flex justify-start items-center gap-1 pl-2">
                    <div className="w-1/4 h-full flex-center">
                        <IoMdPaw size={25} />
                    </div>
                    <h1 className="text-[12px]">{listing.pet ? `Allowed` : "Not Allowed"}</h1>
                </div>
            </div>
        </div>
    </Link>
  )
}
