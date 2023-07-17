import { useEffect, useState, useContext } from "react";
import { mainContext } from "../context/mainContext";
import { useParams } from "react-router-dom";
import { collection, getDocs, limit, startAfter } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import ListingItem from "../components/ListingItem";

export default function AllListings() {

    const params = useParams();
    const [listings, setListings] = useState([]);
    const {setLoading} = useContext(mainContext);
  
    useEffect (() => {
      const fetchListings = async () => {
        try {
          
          setLoading(true);
  
          // Execute query
          const querySnap = await getDocs(collection(db, "listings"));
  
          const listings = [];
  
          querySnap.forEach((doc) => {
            return listings.push({
              id: doc.id,
              data: doc.data()
            })
          })
  
          setListings(listings);
  
          setLoading(false);
  
        } catch (error) {
            setLoading(false);
            toast.error("Could not fetch listings");
        }
  
      }
  
      fetchListings();
  
    }, [])
  
  
  
  
    return (
      <div className="w-full h-full flex-center flex-col">
        <div className="w-full h-20">
          <h1 className="text-[40px] font-bold p-5">All</h1>
        </div>
        <div className="w-full flex justify-start items-center flex-wrap gap-5 p-5">
            {listings.map((item) => {
                return <ListingItem key={item.id} listing={item.data} id={item.id} />
            })}
        </div>
      </div>
    )
}
