import { useState, useEffect, useContext } from "react";
import { mainContext } from "../context/mainContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { addDoc, collection, serverTimestamp} from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {v4 as uuidv4} from "uuid";

export default function CreateListing() {

    const {setLoading} = useContext(mainContext);

    const [formData, setFormData] = useState({
        type: "room",
        name: "",
        bathroom: 1,
        bedroom: 1,
        address: "",
        parking: true,
        pet: false,
        wifi: true,
        maxGuest: 4,
        images: {},
        latitude: 0,
        langitude: 0,
        offer: false,
        regularPrice: 0,
        discountedPrice: 0
    })

    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setFormData({...formData, userRef: user.uid});
            } else {
                navigate("/");
            }
        })
        setLoading(false);
    }, [])

    const handleChange = (e) => {
        let boolean = null;

        if (e.target.value === "true") {
            boolean = true;
        } else if (e.target.value === "false") {
            boolean = false;
        }

        if(e.target.files) {
            setFormData((prev) => ({
                ...prev,
                images: e.target.files
            }))
        }

        if(!e.target.files) {
            setFormData((prev) => ({
                ...prev,
                [e.target.id]: boolean ?? e.target.value
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        if (formData.offer && parseInt(formData.discountedPrice) >= parseInt(formData.regularPrice)) {
            setLoading(false);
            toast.error("Discounted price needs to be less than regular price");
            return;
        }

        if (formData.images.length > 6) {
            setLoading(false);
            toast.error("Max 6 images");
            return;
        }


        let geolocation = {}

        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${formData.address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`)
        const data = await response.json();

        geolocation.lat = data.results[0]?.geometry.location.lat ?? 0; 
        geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

        geolocation.location = data.status === "ZERO_RESULTS" ? undefined : data.results[0]?.formatted_address;


        if (geolocation.location === undefined || geolocation.location.includes("undefined")) {
            setLoading(false)
            toast.error("Pless enter a correct address");
            return
        }

        const storeImage = async (image) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage();
                const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

                const storageRef = ref(storage, "image/" + fileName);

                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on('state_changed', 
                () => {}, 
                (error) => {
                    reject(error);
                }, 
                () => {
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                  });
                }
              );
            })
        }

        const imgUrls = await Promise.all(
            [...formData.images].map((image) => storeImage(image))
        ).catch(() => {
            setLoading(false);
            toast.error("Images not uploaded");
            return;
        })


        const formDataCopy = {
            ...formData,
            imgUrls,
            geolocation,
            timestamp: serverTimestamp()
        }

        delete formDataCopy.address;
        delete formDataCopy.images;
        !formDataCopy.offer && delete formDataCopy.discountedPrice;

        const docRef = await addDoc(collection(db, "listings"), formDataCopy);

        setLoading(false);
        toast.success("Listing saved");
        navigate(`/category/${formDataCopy.type}/${docRef.id}`);
    }


    return (
        <div className="w-full h-[1500px] flex-center">
            <form className="w-[400px] min-h-[1000px] border-[1px] border-[#FFA41B] rounded-2xl p-3 flex justify-start items-center flex-col gap-3" onSubmit={handleSubmit}>

                <h1 className="font-bold text-3xl text-[#FFA41B] mb-5">Create Listing</h1>

                <div className="create-section">
                    <label className="font-bold">Type</label>
                    <div className="flex gap-3">
                        <button type="button" className={`create-button ${formData.type === "room" && "selected-create-button"}`} id="type" value={"room"} onClick={handleChange}>Room</button>
                        <button type="button" className={`create-button ${formData.type === "house" && "selected-create-button"}`} id="type" value={"house"} onClick={handleChange}>House</button>
                    </div>
                </div>

                <div className="create-section">
                    <label className="font-bold">Name</label>
                    <input className="create-input" id="name" onChange={handleChange} required />
                </div>

                <div className="create-section">
                    <label className="font-bold">Bathroom</label>
                    <input type="number" min={0} value={formData.bathroom} className="create-input create-number-input" id="bathroom" onChange={handleChange} />
                </div>

                <div className="create-section">
                    <label className="font-bold">Bedroom</label>
                    <input type="number" min={0} value={formData.bedroom} className="create-input create-number-input" id="bedroom" onChange={handleChange} />
                </div>

                <div className="create-section">
                    <label className="font-bold">Address</label>
                    <input className="create-input" id="address" onChange={handleChange} required />
                </div>

                <div className="create-section">
                    <label className="font-bold">Parking</label>
                    <div className="flex gap-3">
                        <button type="button" className={`create-button ${formData.parking ? "selected-create-button" : ""}`} id="parking" value={true} onClick={handleChange}>Avaible</button>
                        <button type="button" className={`create-button ${formData.parking ? "" : "selected-create-button"}`} id="parking" value={false} onClick={handleChange}>Not Avaible</button>
                    </div>
                </div>

                <div className="create-section">
                    <label className="font-bold">Pet</label>
                    <div className="flex gap-3">
                        <button type="button" className={`create-button ${formData.pet ? "selected-create-button" : ""}`} id="pet" value={true} onClick={handleChange}>Avaible</button>
                        <button type="button" className={`create-button ${formData.pet ? "" : "selected-create-button"}`} id="pet" value={false} onClick={handleChange}>Not Avaible</button>
                    </div>
                </div>

                <div className="create-section">
                    <label className="font-bold">Wi-Fi</label>
                    <div className="flex gap-3">
                        <button type="button" className={`create-button ${formData.wifi ? "selected-create-button" : ""}`} id="wifi" value={true} onClick={handleChange}>Avaible</button>
                        <button type="button" className={`create-button ${formData.wifi ? "" : "selected-create-button"}`} id="wifi" value={false} onClick={handleChange}>Not Avaible</button>
                    </div>
                </div>

                <div className="create-section">
                    <label className="font-bold">Max Guest</label>
                    <input type="number" min={0} value={formData.maxGuest} className="create-input create-number-input" id="maxGuest" onChange={handleChange} />
                </div>

                <div className="create-section input-file-section">
                    <label className="font-bold">Images</label>
                    <p className="text-[10px]">The first image will be cover (max6)</p>
                    <input type="file" className="file-input" id="images" max={6} accept=".jpg,.png,.jpeg" multiple required onChange={handleChange} />
                </div>

                <div className="create-section">
                    <label className="font-bold">Offer</label>
                    <div className="flex gap-3">
                        <button type="button" className={`create-button ${formData.offer ? "selected-create-button" : ""}`} id="offer" value={true} onClick={handleChange}>Yes</button>
                        <button type="button" className={`create-button ${formData.offer ? "" : "selected-create-button"}`} id="offer" value={false} onClick={handleChange}>No</button>
                    </div>
                </div>

                <div className="create-section">
                    <label className="font-bold">Regular Price</label>
                    <input type="number" value={formData.regularPrice} className="create-input create-number-input" id="regularPrice" onChange={handleChange} />
                </div>

                <div className={`create-section ${formData.offer ? "" : "hide"}`}>
                    <label className="font-bold">Discounted Price</label>
                    <input type="number" value={formData.discountedPrice} className="create-input create-number-input" id="discountedPrice" onChange={handleChange} />
                </div>

                <div className="create-section">
                    <button type="submit" className="w-full h-14 rounded-2xl border-[1px] border-[#FFA41B] bg-[#FFA41B] hover:bg-white transition-all text-[20px]">Create Listing</button>
                </div>

            </form>
        </div>
      )
}
