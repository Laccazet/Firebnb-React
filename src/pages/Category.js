import { useEffect, useState, useContext } from "react";
import { mainContext } from "../context/mainContext";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import ListingItem from "../components/ListingItem";



export default function Category() {

  const params = useParams();

  const [listings, setListings] = useState([]);
  const {setLoading} = useContext(mainContext);
  const [lastFetchedListings, setLastFetchedListings] = useState(null);

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
          limit(4)
          )

        // Execute query
        const querySnap = await getDocs(q);

        const lastVisible = querySnap.docs[querySnap.docs.length-1];
        setLastFetchedListings(lastVisible);

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


  const onFetchMoreListings = async () => {
    try {
      
      setLoading(true);

      //Get reference
      const listingsRef = collection(db, "listings");

      // Create a query
      const q = query(
        listingsRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListings),
        limit(4)
        )

      // Execute query
      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length-1];
      setLastFetchedListings(lastVisible);

      const listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

      setListings((prev) => [...prev, ...listings]);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      toast.error("Could not fetch listings");
    }

  }


  return (
    <div className="w-full h-full flex-center flex-col mb-10">
      <div className="w-[290px] sm:w-[560px] xmd:w-[830px] lg:w-[1100px] h-20">
        <h1 className="text-[40px] p-5">{params.categoryName === "room" ? "Rooms" : "Houses"}</h1>
      </div>
      <div className="w-[290px] sm:w-[560px] xmd:w-[830px] lg:w-[1100px] flex justify-start items-center flex-wrap gap-5 p-5">
        {listings.map((item) => {
          return <ListingItem key={item.id} listing={item.data} id={item.id} />
        })}
      </div>
      <button className="w-24 h-11 bg-[#FFA41B] mt-10 rounded-lg" onClick={onFetchMoreListings}>Load More</button>
    </div>
  )
}
