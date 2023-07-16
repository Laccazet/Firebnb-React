import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

export default function App() {
  return (
    <div id="App">
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Explore />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}