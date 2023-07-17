import { useContext } from "react";
import { mainContext } from "../context/mainContext";
import { Navigate, Outlet } from "react-router-dom"

export default function PriviteRoute() {

    const {loggedIn} = useContext(mainContext);

    return loggedIn ? <Outlet /> : <Navigate to={"/sign-in"} />
    
}
