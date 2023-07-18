import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useNavigate, useParams } from "react-router";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import { IoIosBed, IoIosCar, IoIosWifi, IoMdPaw } from "react-icons/io";
import { BiSolidShower } from "react-icons/bi";



export default function Listing() {

    const [listing, setListing] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const params = useParams();


    useEffect(() => {
        const fetchListing = async () => {
          const docRef = doc(db, 'listings', params.listingId)
          const docSnap = await getDoc(docRef)
    
          if (docSnap.exists()) {
            setListing(docSnap.data())
            setLoading(false)
          }
        }
    
        fetchListing()
      }, [navigate, params.listingId])

  

    if (loading) {
        return <Loading />
    }

    return (
        <div className="w-full h-[1300px] lg:h-[900px]">
            <div className="w-full h-[1100px] lg:h-[700px] flex flex-col gap-5 lg:gap-0 lg:flex-row justify-between items-center px-8">

                <Swiper 
                modules={[Pagination]}
                slidesPerView={1}
                pagination={{clickable: true}}
                className="w-full lg:w-3/5 h-[600px] lg:h-5/6 m-10 lg:m-0 border-[3px] border-[#FFA41B]"
                >
                    {listing.imgUrls.map((url, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${url})`}} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>

                <div className="w-[350px] sm:w-[400px] lg:w-2/6 h-5/6 listing-info rounded-2xl shadow-lg">
                    <div className="w-full h-1/6 flex flex-col justify-center items-start pl-5">
                        <h1 className="font-bold text-[30px]">{listing.name}</h1>
                        <p className="font-bold text-[16px]">{listing.geolocation.location}</p>
                    </div>

                    <div className="w-full h-[25%]">
                        {listing.offer ? (
                            <div className="w-full h-full flex-center gap-2 font-bold">
                                <h1 className="text-[40px] sm:text-[60px] text-[#63B341]">{listing.discountedPrice}$</h1>
                                <h1 className="line-through text-[17px] sm:text-[25px] text-[#FF491B]">{listing.regularPrice}$</h1>
                                <span className="text-[30px] sm:text-[40px] text-[#FFA41B]">/night</span>
                            </div>
                        ) : (
                            <div className="w-full h-full flex-center font-bold">
                                <h1 className="text-[60px] text-[#63B341] flex-center gap-2">{listing.regularPrice}$ 
                                    <span className="text-[40px] text-[#FFA41B]">/night</span>
                                </h1>
                            </div>
                        )}
                    </div>

                    <div className="w-full h-3/6 flex-center flex-wrap">
                        <div className="w-2/4 h-1/4 flex flex-col justify-start items-center gap-1 pl-2">
                            <div className="w-1/4 h-full flex-center">
                                <IoIosBed size={60} />
                            </div>
                            <h1 className="text-[20px]">{listing.bedroom > 1 ? `${listing.bedroom} Bedrooms` : "1 Bedroom"}</h1>
                        </div>
                        <div className="w-2/4 h-1/4 flex flex-col justify-start items-center gap-1 pl-2">
                            <div className="w-1/4 h-full flex-center">
                                <BiSolidShower size={60} />
                            </div>
                            <h1 className="text-[20px]">{listing.bathroom > 1 ? `${listing.bathroom} Bathrooms` : "1 Bathroom"}</h1>
                        </div>
                        <div className="w-2/4 h-1/4 flex flex-col justify-start items-center gap-1 pl-2">
                            <div className="w-1/4 h-full flex-center">
                                <IoIosCar size={60} />
                            </div>
                            <h1 className="text-[20px]">{listing.parking ? `Free Park` : "No Park"}</h1>
                        </div>
                        <div className="w-2/4 h-1/4 flex flex-col justify-start items-center gap-1 pl-2">
                            <div className="w-1/4 h-full flex-center">
                                <IoMdPaw size={60} />
                            </div>
                            <h1 className="text-[20px]">{listing.pet ? `Allowed` : "Not Allowed"}</h1>
                        </div>
                        <div className="w-2/4 h-1/4 flex flex-col justify-start items-center gap-1 pl-2">
                            <div className="w-1/4 h-full flex-center">
                                <IoIosWifi size={60} />
                            </div>
                            <h1 className="text-[20px]">{listing.wifi ? `Available` : "Not available"}</h1>
                        </div>
                    </div>
                </div>

            </div>

            <div className="w-full h-[400px] flex justify-center items-start mt-5 lg:m-0">
                <div className="w-4/6 h-5/6 border-[3px] border-[#FFA41B]">
                    <MapContainer
                    style={{ width: "100%", height: "100%"}}
                    center={[listing.geolocation.lat, listing.geolocation.lng]}
                    zoom={15}
                    scroolWheelZoom={false}
                    >
                        <TileLayer
                        attribution= '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                        />

                        <Marker
                        position={[listing.geolocation.lat, listing.geolocation.lng]}
                        >
                            <Popup>{listing.geolocation.location}</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}
