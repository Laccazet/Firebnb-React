import { useEffect, useState, useContext } from "react";
import { mainContext } from "../context/mainContext";
import { useParams, useLocation } from "react-router-dom";
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import ListingItem from "../components/ListingItem";



export default function Category() {

  const params = useParams();
  const location = useLocation();
  const [listings, setListings] = useState([]);
  const {setLoading} = useContext(mainContext);

  useEffect (() => {
    const fetchListings = async () => {
      try {
        
        setLoading(true);

        //Get reference
        const listingsRef = collection(db, "listings");

        // Create a query
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
          )

        // Execute query
        const querySnap = await getDocs(q);

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

  }, [params.categoryName])




  return (
    <div className="w-full h-full flex-center flex-col">
      <div className="w-[1370px] h-20">
        <h1 className="text-[40px] p-5">{location === "rooms" ? "Rooms" : "Houses"}</h1>
      </div>
      <div className="w-[1370px] flex justify-start items-center flex-wrap gap-5 p-5">
        {listings.map((item) => {
          return <ListingItem key={item.id} listing={item.data} id={item.id} />
        })}
      </div>
    </div>
  )
}
