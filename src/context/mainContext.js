import { useState, createContext, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth";


export const mainContext = createContext();

export default function ContextProvider( {children} ) {

    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            user ? setLoggedIn(true) : setLoggedIn(false);
        })
    })

    return (
        <mainContext.Provider value={{
            loading,
            setLoading,
            loggedIn,
        }}>
        {children}
        </mainContext.Provider>
    )
}
