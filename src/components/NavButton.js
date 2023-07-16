import { useNavigate } from "react-router-dom";

export default function NavButton( {text, nav, Icon} ) {
    const navigate = useNavigate();
    
    return (
        <li className="list-item w-16 h-16 cursor-pointer rounded-lg hover:bg-gray-50" onClick={() => navigate(nav)}>
            {Icon}
            <h1>{text}</h1>
        </li>
    )
}
