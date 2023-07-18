import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import ProfileListing from "../components/ProfileListing";

export default function Profile() {

  const auth = getAuth();

  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, "listings");

      console.log(auth.currentUser.uid);

      const q = query(
        listingsRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc"),
        )

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

    }

    fetchUserListings();
  }, [auth.currentUser.uid])

  const logOut = () => {
    auth.signOut();
    navigate("/");
  }

  if (loading) {
    return;
  }

  return (
    <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center lg:items-start">

      <div className="w-11/12 md:w-8/12 lg:w-4/12 mdl:w-3/12 h-full flex flex-col gap-y-5 pt-5 lg:pl-5">
        <div className="w-full h-[300px] border-[1px] border-[#FFA41B] rounded-3xl flex-center flex-col">
          <div className="w-full h-2/6 flex justify-start items-center pl-4">
            <h1 className="text-[40px] font-bold text-[#FFA41B]">My Profile</h1>
          </div>

          <div className="w-full h-4/6 flex justify-center items-start flex-col gap-3 pl-4">
            <div className="w-2/4">
              <h1 className="text-lg">Name</h1>
              <h1 className="text-xl font-bold">{auth.currentUser.displayName}</h1>
            </div>
            <div className="w-2/4">
              <h1 className="text-lg">Email</h1>
              <h1 className="text-xl font-bold">{auth.currentUser.email}</h1>
            </div>
            <button className="log-out-button hover:bg-transparent hover:text-black transition-all" onClick={logOut}>Log Out</button>
          </div>
        </div>

        <Link to={"/create-listing"} className="w-full">
          <button className="w-full h-14 rounded-2xl border-[1px] border-[#FFA41B] font-bold text-white bg-[#FFA41B]
          hover:bg-transparent hover:text-[#FFA41B] transition-all">
          + Add your house or room to Firebnb</button>
        </Link>
      </div>

      <div className="w-11/12 md:w-8/12 mdl:w-9/12 h-full flex justify-center items-start pt-5 mb-10">
        <div className="w-[700px] min-h-[300px] flex flex-col gap-5">
          <h1 className="text-[40px] font-bold text-[#FFA41B]">Your Listings</h1>
          {listings.map((listing, index) => {
            return <ProfileListing key={index} listing={listing} listings={listings} setListings={setListings} />
          })}
        </div>
      </div>

    </div>
  )
  }