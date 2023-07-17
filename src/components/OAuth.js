import { useContext } from "react";
import { mainContext } from "../context/mainContext";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";


export default function OAuth() {

    const navigate = useNavigate();
    const location = useLocation();
    const { setLoading } = useContext(mainContext);

    const handleClick = async (e) => {

        try {
            setLoading(true);
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            //Check for user
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            //If user, doesn't exist, create user
            if (!docSnap.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }
            setLoading(false);
            navigate("/");

        } catch (error) {
            setLoading(false);
            toast.error("Could not authorize with Google")
        }
    }

    return (
        <div className="w-full h-20 flex-center flex-col gap-3">
            <h1>Sign {location.pathname === "/sign-up" ? "Up" : "In"} With</h1>
            <button className="w-11 h-11 flex-center rounded-full shadow-md border-[1px] border-[#FFA41B]" onClick={handleClick} type="button">
                <FcGoogle size={32} />
            </button>
        </div>
    )
}
