import { useContext } from "react"
import { mainContext } from "../context/mainContext"

export default function Loading() {

    const {loading} = useContext(mainContext);

    return (
        <div style={{display: `${loading ? "flex" : "none"}`}}
        className="w-full h-full bg-[rgba(0,0,0,0.90)] absolute flex-center flex-col gap-3">
            <img src={require("../assets/icon.png")} alt="" width={200} className="animate-ping" />
        </div>
      )
}
