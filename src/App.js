import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContextProvider from "./context/mainContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "./components/Loading";
import PriviteRoute from "./components/PriviteRoute";
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

export default function App() {
  return (
    <ContextProvider>
    <div id="App">
      <Loading />
      <BrowserRouter>
          <Header />
          <Routes>
              <Route path="/" element={<Explore />} />
              <Route path="/category/:categoryName" element={<Category />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/profile" element={<PriviteRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/category/:categoryName/:listingId" element={<Listing />} />
              <Route path="/*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
      <ToastContainer theme="colored" />
    </div>
    </ContextProvider>
  )
}