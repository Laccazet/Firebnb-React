import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Slider() {

    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            const linstingsRef = collection(db, "listings");
            const q = query(linstingsRef, orderBy("timestamp", "desc"), limit(5));
            const querySnap = await getDocs(q);
    
            let listings = [];
    
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
    
            setListings(listings);
            setLoading(false);
        }

        fetchListings();
    }, [])


    if (loading) {
        return
    }

  return (
    <Swiper 
    modules={[Pagination]}
    slidesPerView={1}
    pagination={{clickable: true}}
    className="w-full h-full"
    >
        {listings.map((listing, index) => {
            return (
                <SwiperSlide key={index}>
                    <div onClick={() => navigate(`/category/${listing.data.type}/${listing.id}`)}
                    className="w-full h-full bg-cover flex justify-start items-center p-5" style={{background: `url(${listing.data.imgUrls[0]}) center no-repeat`}}>
                        <h1 className="text-[30px] bg-[rgba(0,0,0,0.77)] font-bold text-[#FFA41B]">{listing.data.name}</h1>
                    </div>
                </SwiperSlide>
            )
        })}
    </Swiper>
  )
}
