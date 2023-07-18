import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

export default function ProfileListing( {listing, listings, setListings} ) {

    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete?")) {
            await deleteDoc(doc(db, "listings", listing.id))
            const updatedListings = listings.filter((li) => {
                return li.id !== listing.id;
            })
            setListings(updatedListings);
            toast.success("Listing deleted");
        }
    }

    return (
        <div className="w-full h-40 flex border-[3px] border-[#FFA41B] cursor-pointer hover:shadow-lg relative"
        onClick={() => navigate(`/category/${listing.data.type}/${listing.id}`)}>
          <div className="w-2/4 h-full bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${listing.data.imgUrls[0]})`}} />
          <div className="w-2/4 h-full flex flex-col justify-center items-start pl-5">
            <h1 className="text-[20px] md:text-[25px] font-bold">{listing.data.name}</h1>
            {listing.data.offer 
            ? <h1 className="text-[20px] text-[#63B341] font-bold">{listing.data.discountedPrice}$</h1> 
            : <h1 className="text-[20px] text-[#63B341] font-bold">{listing.data.regularPrice}$</h1>}
            <div className="w-8 h-8 flex-center absolute top-2 right-2" onClick={handleDelete}>
                <AiFillDelete size={30} color="#FF491B" />
            </div>
          </div>
        </div>
    )
}
